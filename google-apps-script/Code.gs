/**
 * Mỹ Yến request intake — install in an Apps Script project owned by
 * nhahangmyyen88@gmail.com. See SETUP.md before deployment.
 *
 * This intake records a request, emails the restaurant and guest, and leaves
 * calendar creation until a staff member confirms availability. That prevents
 * a website request from promising a table or event that has not been checked.
 */
const SETTINGS = {
  businessName: 'Nhà Hàng Mỹ Yến',
  notificationEmail: 'nhahangmyyen88@gmail.com',
  calendarName: 'Mỹ Yến Reservations & Events',
  responsePromise: '30–60 phút trong giờ hoạt động',
  timeZone: 'Asia/Ho_Chi_Minh'
};

function doPost(e) {
  const data = e.parameter && Object.keys(e.parameter).length
    ? e.parameter
    : JSON.parse(e.postData.contents || '{}');
  if (data.website) return json_({ ok: true });
  const required = ['type', 'name', 'phone', 'date', 'time', 'guests'];
  const missing = required.filter(key => !String(data[key] || '').trim());
  if (missing.length) return json_({ ok: false, error: 'Missing required fields.' });

  const request = {
    id: Utilities.getUuid().slice(0, 8).toUpperCase(),
    createdAt: new Date(),
    type: safe_(data.type), name: safe_(data.name), phone: safe_(data.phone),
    email: safe_(data.email), date: safe_(data.date), time: safe_(data.time), guests: safe_(data.guests),
    note: safe_(data.note), status: 'New — needs availability check'
  };
  appendRequest_(request);
  sendStaffAlert_(request);
  if (request.email) sendGuestAcknowledgement_(request);
  return json_({ ok: true, requestId: request.id });
}

function appendRequest_(r) {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('REQUEST_SHEET_ID');
  let sheet;
  if (!id) {
    const ss = SpreadsheetApp.create('Mỹ Yến — Website Requests');
    sheet = ss.getActiveSheet();
    sheet.setName('Requests');
    sheet.appendRow(['ID','Received','Type','Name','Phone','Email','Requested date','Requested time','Guests','Notes','Status','Confirmed event ID']);
    props.setProperty('REQUEST_SHEET_ID', ss.getId());
  } else sheet = SpreadsheetApp.openById(id).getSheetByName('Requests');
  sheet.appendRow([r.id,r.createdAt,r.type,r.name,r.phone,r.email,r.date,r.time,r.guests,r.note,r.status,'']);
}

function sendStaffAlert_(r) {
  const subject = `[Mỹ Yến] New request ${r.id}: ${r.type}`;
  const body = `New website request\n\nID: ${r.id}\nType: ${r.type}\nGuest: ${r.name}\nPhone: ${r.phone}\nEmail: ${r.email || 'Not provided'}\nRequested date: ${r.date}\nRequested time: ${r.time}\nGuests: ${r.guests}\nNotes: ${r.note || 'None'}\n\nAction: check availability, contact guest, then create a confirmed calendar event.`;
  MailApp.sendEmail(SETTINGS.notificationEmail, subject, body);
}

function sendGuestAcknowledgement_(r) {
  const subject = `${SETTINGS.businessName} đã nhận yêu cầu của bạn`;
  const body = `Chào ${r.name},\n\nMỹ Yến đã nhận yêu cầu ${r.id} của bạn. Đội ngũ sẽ kiểm tra chỗ trống và liên hệ xác nhận trong ${SETTINGS.responsePromise}.\n\nLưu ý: yêu cầu này chưa phải là xác nhận đặt chỗ.\n\nCần hỗ trợ gấp: 0948 900 488 hoặc Zalo 0948 900 488.\n\nTrân trọng,\n${SETTINGS.businessName}`;
  MailApp.sendEmail(r.email, subject, body);
}

// Run manually only after staff confirms. Add guests' email only with permission.
function createConfirmedEvent_(title, start, end, description, guestEmail) {
  const calendar = getOrCreateCalendar_();
  const options = { description: description };
  if (guestEmail) options.guests = guestEmail;
  return calendar.createEvent(title, new Date(start), new Date(end), options).getId();
}

function getOrCreateCalendar_() {
  const props = PropertiesService.getScriptProperties();
  const existing = props.getProperty('CALENDAR_ID');
  if (existing) return CalendarApp.getCalendarById(existing);
  const calendar = CalendarApp.createCalendar(SETTINGS.calendarName, { timeZone: SETTINGS.timeZone });
  props.setProperty('CALENDAR_ID', calendar.getId());
  return calendar;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
function safe_(value) { return String(value || '').trim().slice(0, 2000); }
