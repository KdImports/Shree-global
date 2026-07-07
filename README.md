# SHREE GLOBAL - Google Sheets Ready Website

This version includes:

- Preview 1 Modern Premium design
- Product popup with multiple images
- Specs, description, sizes, and MOQ
- Inquiry buttons from product popup
- Auto-selected product on inquiry page
- Google Sheets form submission support
- Email notification support through Google Apps Script

## Folder Structure

```txt
shree-global-google-sheets-ready/
│
├── index.html
├── about.html
├── products.html
├── collections.html
├── contact.html
├── inquiry.html
│
├── google-apps-script-code.gs
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
└── README.md
```

## How to Run Website

1. Extract the ZIP.
2. Open the folder in VS Code.
3. Right-click `index.html`.
4. Click **Open with Live Server**.

All HTML files are in the root folder to avoid `/pages/...` route errors.

---

# Google Sheets Setup

## Step 1: Create Google Sheet

1. Go to Google Sheets.
2. Create a blank sheet.
3. Name it something like:

```txt
SHREE GLOBAL Website Inquiries
```

## Step 2: Add Apps Script

1. In your Google Sheet, click:

```txt
Extensions > Apps Script
```

2. Delete the default code.
3. Open the file in this project:

```txt
google-apps-script-code.gs
```

4. Copy all code from that file.
5. Paste it into Apps Script.
6. Change this line if needed:

```js
const NOTIFICATION_EMAIL = "darshilshah7551@gmail.com";
```

## Step 3: Deploy Apps Script

1. Click **Deploy**
2. Click **New deployment**
3. Click the gear/settings icon
4. Choose **Web app**
5. Set:

```txt
Execute as: Me
Who has access: Anyone
```

6. Click **Deploy**
7. Approve permissions
8. Copy the **Web app URL**

It will look like:

```txt
https://script.google.com/macros/s/AKfycbxxxxxxx/exec
```

## Step 4: Connect Website

Open:

```txt
assets/js/main.js
```

Find:

```js
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

Replace it with your Web App URL:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ID/exec";
```

Save the file.

## Step 5: Test

1. Open website with Live Server.
2. Go to `inquiry.html`.
3. Submit the form.
4. Check your Google Sheet.
5. Check your email notification.

---

# Product Popup Behavior

Click **View Details** on any product.

Popup opens with:

- Multiple images on left
- Main image preview
- Specifications
- Description
- Sizes available
- Minimum order quantity
- Inquire Now button

When user clicks **Inquire Now**, it opens:

```txt
inquiry.html?product=Product Name
```

The product field auto-selects on the inquiry page.
