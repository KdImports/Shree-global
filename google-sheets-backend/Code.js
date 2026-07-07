/**
 * SHREE GLOBAL - GOOGLE SHEETS CMS & INQUIRY BACKEND
 */

const SHEET_INQUIRIES = "Inquiries";
const SHEET_PRODUCTS = "Products";
const SHEET_PARTNERS = "Partners";
const NOTIFICATION_EMAIL = "darshilshah7551@gmail.com";
const ADMIN_PASSCODE = "shree_global_admin_123"; // Simple admin access password

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "getData") {
      const products = getRows_(SHEET_PRODUCTS);
      const partners = getRows_(SHEET_PARTNERS);
      
      // Parse JSON columns back into objects
      const parsedProducts = products.map(p => {
        try { p.specs = JSON.parse(p.specs || "{}"); } catch (e) { p.specs = {}; }
        try { p.sizes = JSON.parse(p.sizes || "{}"); } catch (e) { p.sizes = {}; }
        p.images = p.images ? p.images.toString().split(",") : [];
        return p;
      });
      
      return jsonResponse_({
        status: "success",
        products: parsedProducts,
        partners: partners
      });
    }
    
    return jsonResponse_({
      status: "success",
      message: "SHREE GLOBAL backend is running"
    });
  } catch (error) {
    return jsonResponse_({ status: "error", message: error.toString() });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const action = data.action;

    // Check actions requiring authentication
    if (action === "addProduct" || action === "editProduct" || action === "deleteProduct" || action === "addPartner" || action === "editPartner" || action === "deletePartner") {
      if (data.passcode !== ADMIN_PASSCODE) {
        return jsonResponse_({ status: "error", message: "Unauthorized: Invalid passcode" });
      }
      
      if (action === "addProduct") {
        return addProduct_(data.product);
      } else if (action === "editProduct") {
        return editProduct_(data.id, data.product);
      } else if (action === "deleteProduct") {
        return deleteRow_(SHEET_PRODUCTS, data.id);
      } else if (action === "addPartner") {
        return addPartner_(data.partner);
      } else if (action === "editPartner") {
        return editPartner_(data.id, data.partner);
      } else if (action === "deletePartner") {
        return deleteRow_(SHEET_PARTNERS, data.id);
      }
    }

    // Default action: Save Inquiry
    return saveInquiry_(data);
    
  } catch (error) {
    return jsonResponse_({ status: "error", message: error.toString() });
  }
}

// --- CORE ACTIONS ---

function saveInquiry_(data) {
  const sheet = getOrCreateSheet_(SHEET_INQUIRIES);
  ensureInquiryHeaders_(sheet);

  const row = [
    new Date(),
    data.page || "",
    data.name || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.topic || "",
    data.product || "",
    data.intended_use || "",
    data.quantity || "",
    data.destination || "",
    data.timeline || "",
    data.message || "",
    data.product_notes || "",
    data.url || "",
    data.submittedAt || ""
  ];

  sheet.appendRow(row);
  sendNotification_(data);
  sendConfirmation_(data);

  return jsonResponse_({ status: "success", message: "Inquiry saved successfully" });
}

function addProduct_(product) {
  const sheet = getOrCreateSheet_(SHEET_PRODUCTS);
  ensureProductHeaders_(sheet);
  
  const id = "prod_" + new Date().getTime();
  const row = [
    id,
    product.title || "",
    product.category || "",
    product.description || "",
    product.images ? product.images.join(",") : "",
    JSON.stringify(product.specs || {}),
    JSON.stringify(product.sizes || {}),
    product.moq || ""
  ];
  
  sheet.appendRow(row);
  return jsonResponse_({ status: "success", message: "Product added successfully", id: id });
}

function editProduct_(id, product) {
  const sheet = getOrCreateSheet_(SHEET_PRODUCTS);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return jsonResponse_({ status: "error", message: "No data found to edit" });
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(r => r[0].toString());
  const index = ids.indexOf(id.toString());
  
  if (index !== -1) {
    const rowNum = index + 2;
    const row = [
      id,
      product.title || "",
      product.category || "",
      product.description || "",
      product.images ? product.images.join(",") : "",
      JSON.stringify(product.specs || {}),
      JSON.stringify(product.sizes || {}),
      product.moq || ""
    ];
    sheet.getRange(rowNum, 1, 1, row.length).setValues([row]);
    return jsonResponse_({ status: "success", message: "Product updated successfully" });
  }
  return jsonResponse_({ status: "error", message: "Product not found" });
}

function addPartner_(partner) {
  const sheet = getOrCreateSheet_(SHEET_PARTNERS);
  ensurePartnerHeaders_(sheet);
  
  const id = "part_" + new Date().getTime();
  const row = [
    id,
    partner.name || "",
    partner.logoUrl || ""
  ];
  
  sheet.appendRow(row);
  return jsonResponse_({ status: "success", message: "Partner added successfully", id: id });
}

function editPartner_(id, partner) {
  const sheet = getOrCreateSheet_(SHEET_PARTNERS);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return jsonResponse_({ status: "error", message: "No data found to edit" });
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(r => r[0].toString());
  const index = ids.indexOf(id.toString());
  
  if (index !== -1) {
    const rowNum = index + 2;
    const row = [
      id,
      partner.name || "",
      partner.logoUrl || ""
    ];
    sheet.getRange(rowNum, 1, 1, row.length).setValues([row]);
    return jsonResponse_({ status: "success", message: "Partner updated successfully" });
  }
  return jsonResponse_({ status: "error", message: "Partner not found" });
}

// --- DATABASE UTILS ---

function getRows_(sheetName) {
  const sheet = getOrCreateSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  if (lastRow <= 1) return [];
  
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  
  return values.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

function deleteRow_(sheetName, id) {
  const sheet = getOrCreateSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return jsonResponse_({ status: "error", message: "No data rows found to delete" });
  }
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(r => r[0].toString());
  const index = ids.indexOf(id.toString());
  
  if (index !== -1) {
    sheet.deleteRow(index + 2);
    return jsonResponse_({ status: "success", message: "Item deleted successfully" });
  }
  
  return jsonResponse_({ status: "error", message: "Item not found" });
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

// --- HEADERS SETUP ---

function ensureInquiryHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  const headers = [
    "Timestamp", "Page", "Name", "Email", "Phone", "Company", "Topic", "Product",
    "Intended Use", "Quantity", "Destination", "Timeline", "Message", "Product Notes",
    "Website URL", "Submitted At ISO"
  ];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function ensureProductHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  const headers = ["id", "title", "category", "description", "images", "specs", "sizes", "moq"];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function ensurePartnerHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  const headers = ["id", "name", "logoUrl"];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

// --- EMAILS ---

function sendNotification_(data) {
  const subject = `New SHREE GLOBAL Inquiry${data.product ? " - " + data.product : ""}`;
  const body = `
New inquiry received from SHREE GLOBAL website.

Name: ${data.name || "-"}
Email: ${data.email || "-"}
Phone: ${data.phone || "-"}
Company: ${data.company || "-"}

Topic: ${data.topic || "-"}
Product: ${data.product || "-"}
Intended Use: ${data.intended_use || "-"}
Quantity: ${data.quantity || "-"}
Destination: ${data.destination || "-"}
Timeline: ${data.timeline || "-"}

Message:
${data.message || "-"}

Product Notes:
${data.product_notes || "-"}

Page: ${data.page || "-"}
URL: ${data.url || "-"}
Submitted At: ${data.submittedAt || new Date().toISOString()}
`;
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function sendConfirmation_(data) {
  if (!data.email) return;
  const subject = "Inquiry Received - SHREE GLOBAL";
  const body = `Hi ${data.name || "there"},

Thank you for contacting SHREE GLOBAL. We have received your inquiry.

Here is a summary of your request:
- Product: ${data.product || data.topic || "-"}
- Quantity: ${data.quantity || "-"}
- Delivery Destination: ${data.destination || "-"}
- Required Timeline: ${data.timeline || "-"}

Our team will review your requirements and get back to you shortly with specifications and pricing.

Best regards,
SHREE GLOBAL Team
Canada × India • Sustainable Product Focus
darshilshah7551@gmail.com
`;
  MailApp.sendEmail(data.email, subject, body);
}

function jsonResponse_(object) {
  return ContentService
    .createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}
