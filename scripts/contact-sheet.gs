// Google Apps Script that adds each Contact Us message to this spreadsheet.
// Setup (once): in the sheet, Extensions > Apps Script, paste this file, set SECRET, then
// Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
// Put the /exec URL in CONTACT_SHEET_URL and the same secret in CONTACT_SHEET_SECRET on the server.
// "Anyone" only means the website can call it without a Google login; the secret stops anyone else
// adding rows, and the spreadsheet itself stays private to the people you share it with.

const SECRET = 'paste-a-long-random-string-here'
const SHEET_NAME = 'Contact messages'
const HEADERS = ['Received', 'Name', 'Email', 'Phone', 'Topic', 'Message', 'Sent from page']

function doPost(e) {
  let data
  try {
    data = JSON.parse(e.postData.contents)
  } catch (err) {
    return reply({ ok: false, error: 'bad json' })
  }
  if (data.secret !== SECRET) return reply({ ok: false, error: 'wrong secret' })

  const book = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  // A leading ' stops Sheets treating text like "=..." or "+123..." as a formula or number.
  const text = (v) => "'" + String(v || '').slice(0, 2000)
  sheet.appendRow([new Date(data.sentAt || Date.now()), text(data.name), text(data.email), text(data.phone), text(data.topic), text(data.message), text(data.page)])
  return reply({ ok: true })
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
