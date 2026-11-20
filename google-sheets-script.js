/**
 * Google Apps Script for FDP 2026 Registration
 * Al-Azhar College of Engineering and Technology
 * Department of Artificial Intelligence & Machine Learning
 * 
 * ==============================================================================
 * STEP-BY-STEP SETUP INSTRUCTIONS (Takes ~1 minute):
 * ==============================================================================
 * 1. Open your browser and go to: https://sheets.new (creates a new Google Sheet)
 * 2. Rename your spreadsheet (top left): "FDP 2026 Registrations"
 * 3. In the menu, click: Extensions > Apps Script
 * 4. In the code editor that opens, DELETE any existing code and PASTE this ENTIRE file.
 * 5. Click the "Save" icon (or press Ctrl+S).
 * 6. Click the blue "Deploy" button (top right) > "New deployment".
 * 7. Next to "Select type", click the Gear icon ⚙️ and select "Web app".
 * 8. Fill in:
 *    - Description: "FDP Registration Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (VERY IMPORTANT! Allows registrations from your website)
 * 9. Click "Deploy".
 *    - Google will ask to "Authorize access". Click "Authorize access", choose your Google account.
 *    - If you see "Google hasn't verified this app", click "Advanced" (at bottom) > "Go to Untitled project (unsafe)".
 *    - Click "Allow".
 * 10. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/AKfycb.../exec).
 * 11. Open index.html in your code editor:
 *     Find line:
 *       var ENDPOINT = "";
 *     Replace with:
 *       var ENDPOINT = "YOUR_COPIED_WEB_APP_URL";
 * 12. Save index.html and push to GitHub!
 * 
 * That's it! Every registration will now automatically append as a new row in your Google Sheet.
 * You can download all responses as a CSV anytime by clicking:
 * File > Download > Comma-separated values (.csv)
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var headers = [
      "Timestamp",
      "Registration ID",
      "Full Name",
      "Category",
      "Email",
      "Mobile",
      "Institution",
      "Department / Designation",
      "City & State",
      "Transaction / UTR ID",
      "Payment Date"
    ];
    
    // Auto-create and format header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#7a0c10");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming JSON data
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    // Append the row to Google Sheet
    sheet.appendRow([
      new Date(),
      data.regId || "",
      data.name || "",
      data.cat || "",
      data.email || "",
      "'" + (data.phone || ""), // prepended apostrophe preserves phone format and leading zeros
      data.inst || "",
      data.dept || "",
      data.place || "",
      "'" + (data.txn || ""),   // prepended apostrophe preserves long transaction IDs
      data.paidon || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Registration recorded successfully",
      regId: data.regId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("FDP 2026 Registration Webhook is active and listening!").setMimeType(ContentService.MimeType.TEXT);
}
