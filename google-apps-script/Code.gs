/**
 * Tiếp nhận yêu cầu từ website Nhà Hàng Mỹ Yến.
 * Dự án thuộc tài khoản nhahangmyyen88@gmail.com.
 */
const SETTINGS = {
  businessName: 'Nhà Hàng Mỹ Yến',
  notificationEmail: 'nhahangmyyen88@gmail.com',
  calendarName: 'Mỹ Yến — Đặt bàn & Sự kiện',
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
  if (missing.length) return json_({ ok: false, error: 'Thiếu thông tin bắt buộc.' });

  const request = {
    id: Utilities.getUuid().slice(0, 8).toUpperCase(),
    createdAt: new Date(),
    type: safe_(data.type), name: safe_(data.name), phone: safe_(data.phone),
    email: safe_(data.email), date: safe_(data.date), time: safe_(data.time), guests: safe_(data.guests),
    note: safe_(data.note), status: 'Mới — cần kiểm tra chỗ'
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
    const ss = SpreadsheetApp.create('Mỹ Yến — Yêu cầu từ website');
    sheet = ss.getActiveSheet();
    sheet.setName('Yêu cầu');
    sheet.appendRow(['Mã yêu cầu','Nhận lúc','Loại yêu cầu','Tên khách / công ty','Điện thoại','Email','Ngày dự kiến','Giờ dự kiến','Số khách / suất','Ghi chú','Trạng thái','Mã sự kiện Calendar']);
    props.setProperty('REQUEST_SHEET_ID', ss.getId());
  } else sheet = SpreadsheetApp.openById(id).getSheetByName('Yêu cầu');
  sheet.appendRow([r.id,r.createdAt,r.type,r.name,r.phone,r.email,r.date,r.time,r.guests,r.note,r.status,'']);
}

function sendStaffAlert_(r) {
  const subject = `[Mỹ Yến] Yêu cầu mới ${r.id}: ${r.type}`;
  const body = `Yêu cầu mới từ website\n\nMã: ${r.id}\nLoại: ${r.type}\nKhách / công ty: ${r.name}\nĐiện thoại: ${r.phone}\nEmail: ${r.email || 'Không cung cấp'}\nNgày dự kiến: ${r.date}\nGiờ dự kiến: ${r.time}\nSố khách / suất: ${r.guests}\nGhi chú: ${r.note || 'Không có'}\n\nViệc cần làm: kiểm tra khả năng phục vụ, liên hệ khách, rồi tạo sự kiện Calendar sau khi xác nhận.`;
  MailApp.sendEmail(SETTINGS.notificationEmail, subject, body);
}

function sendGuestAcknowledgement_(r) {
  const subject = `${SETTINGS.businessName} đã nhận yêu cầu của bạn`;
  const body = `Chào ${r.name},\n\nMỹ Yến đã nhận yêu cầu ${r.id} của bạn. Đội ngũ sẽ kiểm tra chỗ trống và liên hệ xác nhận trong ${SETTINGS.responsePromise}.\n\nLưu ý: yêu cầu này chưa phải là xác nhận đặt chỗ.\n\nCần hỗ trợ gấp: 0948 900 488 hoặc Zalo 0948 900 488.\n\nTrân trọng,\n${SETTINGS.businessName}`;
  MailApp.sendEmail(r.email, subject, body);
}

// Chỉ chạy sau khi nhân viên đã xác nhận với khách.
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
