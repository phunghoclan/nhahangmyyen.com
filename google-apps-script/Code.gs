/**
 * Tiếp nhận yêu cầu từ website Nhà Hàng Mỹ Yến.
 * Dự án thuộc tài khoản nhahangmyyen88@gmail.com.
 */
const SETTINGS = {
  businessName: 'Nhà Hàng Mỹ Yến',
  notificationEmail: 'nhahangmyyen88@gmail.com',
  calendarName: 'Mỹ Yến — Đặt bàn & Sự kiện',
  requestSheetName: 'Yêu cầu',
  confirmedStatus: 'Đã xác nhận',
  responsePromise: '30–60 phút trong giờ hoạt động',
  timeZone: 'Asia/Ho_Chi_Minh',
  eventDurationMinutes: 120
};

function doPost(e) {
  let requestId = '';
  try {
    const data = e.parameter && Object.keys(e.parameter).length
      ? e.parameter
      : JSON.parse(e.postData.contents || '{}');
    requestId = requestId_(data.requestId);
    if (data.website) return confirmationPage_({ source: 'myyen-request', ok: true, requestId: requestId });

    const type = safe_(data.type);
    const required = ['name', 'phone', 'guests'];
    if (type !== 'Suất ăn doanh nghiệp') required.push('date');
    if (type === 'Đặt bàn dùng bữa') required.push('time');
    if (type === 'Suất ăn doanh nghiệp') required.push('company');
    const missing = required.filter(key => !safe_(data[key]));
    if (!type || missing.length) throw new Error('Thiếu thông tin bắt buộc.');

    const request = {
      id: requestId, createdAt: new Date(), type: type,
      name: safe_(data.name), company: safe_(data.company), phone: safe_(data.phone),
      email: safe_(data.email), date: safe_(data.date), time: safe_(data.time),
      guests: safe_(data.guests), note: safe_(data.note), status: 'Mới — cần kiểm tra chỗ'
    };
    const created = appendRequest_(request);
    if (created) {
      sendStaffAlert_(request);
      if (request.email) sendGuestAcknowledgement_(request);
    }
    return confirmationPage_({ source: 'myyen-request', ok: true, requestId: request.id });
  } catch (error) {
    console.error(error);
    return confirmationPage_({ source: 'myyen-request', ok: false, requestId: requestId, error: 'Không thể tiếp nhận yêu cầu.' });
  }
}

function appendRequest_(r) {
  const sheet = getOrCreateRequestSheet_();
  if (findRequestRow_(sheet, r.id)) return false;
  sheet.appendRow([r.id,r.createdAt,r.type,r.name,r.phone,r.email,r.date,r.time,r.guests,notesFor_(r),r.status,'']);
  return true;
}

function getOrCreateRequestSheet_() {
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
  return sheet;
}

function sendStaffAlert_(r) {
  const subject = `[Mỹ Yến] Yêu cầu mới ${r.id}: ${r.type}`;
  const body = `Yêu cầu mới từ website\n\nMã: ${r.id}\nLoại: ${r.type}\nNgười liên hệ: ${r.name}\nCông ty / đơn vị: ${r.company || 'Không áp dụng'}\nĐiện thoại: ${r.phone}\nEmail: ${r.email || 'Không cung cấp'}\nNgày dự kiến: ${r.date || 'Chưa chốt'}\nGiờ dự kiến: ${r.time || 'Chưa chốt'}\nSố khách / suất: ${r.guests}\nGhi chú: ${r.note || 'Không có'}\n\nViệc cần làm: kiểm tra khả năng phục vụ, liên hệ khách, rồi tạo sự kiện Calendar sau khi xác nhận.`;
  MailApp.sendEmail(SETTINGS.notificationEmail, subject, body);
}

function sendGuestAcknowledgement_(r) {
  const subject = `${SETTINGS.businessName} đã nhận yêu cầu của bạn`;
  const body = `Chào ${r.name},\n\nMỹ Yến đã nhận yêu cầu ${r.id} của bạn. Đội ngũ sẽ kiểm tra chỗ trống và liên hệ xác nhận trong ${SETTINGS.responsePromise}.\n\nLưu ý: yêu cầu này chưa phải là xác nhận đặt chỗ.\n\nCần hỗ trợ gấp: 0948 900 488 hoặc Zalo 0948 900 488.\n\nTrân trọng,\n${SETTINGS.businessName}`;
  MailApp.sendEmail(r.email, subject, body);
}

/**
 * Chạy một lần trong Apps Script sau khi triển khai.
 * Hàm này tạo lịch riêng và cài trình kích hoạt để theo dõi cột Trạng thái.
 */
function setupWorkflow() {
  const sheetId = getOrCreateRequestSheet_().getParent().getId();
  const calendar = getOrCreateCalendar_();
  const handler = 'handleRequestStatusChange_';
  const hasTrigger = ScriptApp.getProjectTriggers().some(trigger =>
    trigger.getHandlerFunction() === handler && trigger.getEventType() === ScriptApp.EventType.ON_EDIT
  );
  if (!hasTrigger) {
    ScriptApp.newTrigger(handler).forSpreadsheet(sheetId).onEdit().create();
  }
  return `Đã sẵn sàng. Calendar: ${calendar.getName()}. Trigger: ${hasTrigger ? 'đã có' : 'vừa tạo'}.`;
}

/**
 * One-time staff cleanup: removes known internal test records and standardizes
 * the Vietnamese dropdowns used by the inquiry team.
 */
function normalizeInquirySheet() {
  const sheet = getOrCreateRequestSheet_();
  const testIds = new Set(['TEST-001', 'B7AE6044', 'B47C3DBF', 'FF13BC7A']);
  let removed = 0;
  for (let row = sheet.getLastRow(); row >= 2; row -= 1) {
    if (testIds.has(String(sheet.getRange(row, 1).getDisplayValue()).trim())) {
      sheet.deleteRow(row);
      removed += 1;
    }
  }

  const rows = Math.max(sheet.getMaxRows() - 1, 1);
  const serviceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Đặt bàn dùng bữa', 'Tiệc / sự kiện', 'Suất ăn doanh nghiệp'], true)
    .setAllowInvalid(false)
    .build();
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Mới — cần kiểm tra chỗ', 'Đã liên hệ', 'Đang tư vấn', 'Chờ khách', 'Đã xác nhận', 'Không phù hợp'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 3, rows, 1).setDataValidation(serviceRule);
  sheet.getRange(2, 11, rows, 1).setDataValidation(statusRule);
  return `Đã xóa ${removed} dòng kiểm tra và chuẩn hóa danh sách chọn tiếng Việt.`;
}

/**
 * Tự động chạy khi nhân viên đổi Trạng thái thành “Đã xác nhận”.
 */
function handleRequestStatusChange_(e) {
  if (!e || !e.range) return;
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== SETTINGS.requestSheetName || range.getRow() < 2 || range.getColumn() !== 11) return;
  if (String(range.getValue()).trim() !== SETTINGS.confirmedStatus) return;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  try {
    const row = range.getRow();
    const values = sheet.getRange(row, 1, 1, 12).getValues()[0];
    if (String(values[10]).trim() !== SETTINGS.confirmedStatus || values[11]) return;
    const request = {
      id: safe_(values[0]), createdAt: values[1], type: safe_(values[2]), name: safe_(values[3]),
      phone: safe_(values[4]), email: safe_(values[5]), date: values[6], time: values[7],
      guests: safe_(values[8]), note: safe_(values[9])
    };
    if (!request.date || !request.time) {
      sheet.getRange(row, 12).setValue('Chưa tạo — cần ngày/giờ');
      if (request.email) sendGuestConfirmationWithoutSchedule_(request);
      return;
    }
    const start = requestDateTime_(request.date, request.time);
    const end = new Date(start.getTime() + SETTINGS.eventDurationMinutes * 60 * 1000);
    const title = `${request.type} — ${request.name} — ${request.guests} khách/suất`;
    const description = `Mã yêu cầu: ${request.id}\nKhách / công ty: ${request.name}\nĐiện thoại: ${request.phone}\nEmail: ${request.email || 'Không cung cấp'}\nSố khách / suất: ${request.guests}\nGhi chú: ${request.note || 'Không có'}\n\nĐã được nhân viên chuyển sang trạng thái Đã xác nhận.`;
    const event = findConfirmedEvent_(request.id, start, end) || createConfirmedEvent_(title, start, end, description);
    sheet.getRange(row, 12).setValue(event.getId());
    if (request.email) sendGuestConfirmation_(request);
  } finally {
    lock.releaseLock();
  }
}

function sendGuestConfirmation_(r) {
  const dateText = Utilities.formatDate(requestDateTime_(r.date, r.time), SETTINGS.timeZone, 'dd/MM/yyyy');
  const timeText = Utilities.formatDate(requestDateTime_(r.date, r.time), SETTINGS.timeZone, 'HH:mm');
  const subject = `${SETTINGS.businessName} xác nhận yêu cầu ${r.id}`;
  const body = `Chào ${r.name},\n\nMỹ Yến xác nhận yêu cầu ${r.id} của bạn.\n\nLoại yêu cầu: ${r.type}\nNgày: ${dateText}\nGiờ: ${timeText}\nSố khách / suất: ${r.guests}\n\nNếu cần thay đổi, vui lòng gọi hoặc nhắn Zalo 0948 900 488.\n\nTrân trọng,\n${SETTINGS.businessName}`;
  MailApp.sendEmail(r.email, subject, body);
}

function sendGuestConfirmationWithoutSchedule_(r) {
  const subject = `${SETTINGS.businessName} xác nhận yêu cầu ${r.id}`;
  const body = `Chào ${r.name},\n\nMỹ Yến xác nhận yêu cầu ${r.id} của bạn. Đội ngũ sẽ liên hệ để chốt ngày và giờ phục vụ.\n\nLoại yêu cầu: ${r.type}\nSố khách / suất: ${r.guests}\n\nNếu cần thay đổi, vui lòng gọi hoặc nhắn Zalo 0948 900 488.\n\nTrân trọng,\n${SETTINGS.businessName}`;
  MailApp.sendEmail(r.email, subject, body);
}

function requestDateTime_(dateValue, timeValue) {
  const date = dateValue instanceof Date
    ? new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate())
    : parseDate_(String(dateValue || ''));
  let hours;
  let minutes;
  if (timeValue instanceof Date) {
    hours = timeValue.getHours();
    minutes = timeValue.getMinutes();
  } else {
    const match = String(timeValue || '').match(/^(\d{1,2}):(\d{2})/);
    if (!match) throw new Error('Giờ dự kiến không hợp lệ.');
    hours = Number(match[1]);
    minutes = Number(match[2]);
  }
  date.setHours(hours, minutes, 0, 0);
  if (Number.isNaN(date.getTime())) throw new Error('Ngày hoặc giờ dự kiến không hợp lệ.');
  return date;
}

function parseDate_(value) {
  let match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  throw new Error('Ngày dự kiến không hợp lệ.');
}

// Chỉ được gọi sau khi nhân viên đã xác nhận với khách.
function createConfirmedEvent_(title, start, end, description, guestEmail) {
  const calendar = getOrCreateCalendar_();
  const options = { description: description };
  if (guestEmail) options.guests = guestEmail;
  return calendar.createEvent(title, new Date(start), new Date(end), options);
}

function findConfirmedEvent_(requestId, start, end) {
  const margin = 60 * 1000;
  const events = getOrCreateCalendar_().getEvents(
    new Date(start.getTime() - margin),
    new Date(end.getTime() + margin),
    { search: requestId }
  );
  return events.length ? events[0] : null;
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
function confirmationPage_(payload) {
  const message = JSON.stringify(payload).replace(/</g, '\\u003c');
  const html = `<!doctype html><html><body><script>window.top.postMessage(${message}, '*');</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function requestId_(value) {
  const supplied = safe_(value).replace(/[^A-Za-z0-9-]/g, '').slice(0, 32);
  return supplied || `MYY-${Utilities.getUuid().slice(0, 8).toUpperCase()}`;
}
function findRequestRow_(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  const index = ids.findIndex(row => row[0] === requestId);
  return index < 0 ? 0 : index + 2;
}
function notesFor_(r) {
  return [r.company ? `Đơn vị: ${r.company}` : '', r.note].filter(Boolean).join('\n');
}
function safe_(value) { return String(value || '').trim().slice(0, 2000); }
