const dishes = {
  seafood: { title: 'Hải sản tươi sống', copy: 'Chọn hải sản theo mùa và cách chế biến: hấp kiểu Hong Kong, hấp tàu xì, xào tương XO, rang muối hoặc nướng.' },
  banquet: { title: 'Món tiệc đặc sắc', copy: 'Vịt quay Bắc Kinh, gà, tôm, sò điệp, món tiềm và các món chia sẻ cho những bàn tiệc nhiều thế hệ.' },
  family: { title: 'Gia đình & trẻ nhỏ', copy: 'Những món dễ chia sẻ cho cả bàn, cùng bánh bao tạo hình và các lựa chọn thân thiện với trẻ nhỏ.' }
};

document.querySelectorAll('[data-dish]').forEach(button => button.addEventListener('click', () => {
  const item = dishes[button.dataset.dish];
  document.querySelectorAll('[data-dish]').forEach(control => control.classList.remove('active'));
  button.classList.add('active');
  document.querySelector('#dish-title').textContent = item.title;
  document.querySelector('#dish-copy').textContent = item.copy;
}));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
if (toggle && nav) toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

const form = document.querySelector('#request-form');
const requestDate = form?.querySelector('[name="date"]');
if (requestDate) {
  const today = new Date();
  requestDate.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
}

const requestModes = {
  dining: {
    type: 'Đặt bàn dùng bữa', heading: 'Hãy để Mỹ Yến chuẩn bị cùng bạn.',
    copy: 'Gửi yêu cầu. Đội ngũ Mỹ Yến sẽ kiểm tra chỗ trống và liên hệ xác nhận trước khi giữ bàn. Chúng tôi phản hồi trong 30–60 phút trong giờ hoạt động.',
    dateLabel: 'Ngày dùng bữa', timeLabel: 'Giờ dự kiến', guestsLabel: 'Số khách', noteLabel: 'Nhu cầu của bạn',
    notePlaceholder: 'Ví dụ: cần chòi riêng, sinh nhật, có trẻ nhỏ hoặc yêu cầu món ăn...',
    requireDate: true, requireTime: true, requireCompany: false
  },
  event: {
    type: 'Tiệc / sự kiện', heading: 'Bắt đầu kế hoạch cho dịp quan trọng.',
    copy: 'Cho Mỹ Yến biết ngày dự kiến, số khách và dịp tổ chức. Đội ngũ sẽ cùng bạn chọn không gian, thực đơn và những phần cần phối hợp.',
    dateLabel: 'Ngày dự kiến', timeLabel: 'Giờ bắt đầu dự kiến', guestsLabel: 'Số khách dự kiến', noteLabel: 'Loại tiệc và nhu cầu',
    notePlaceholder: 'Ví dụ: tiệc cưới, sinh nhật, mừng thọ; cần trang trí, âm thanh, sân khấu hoặc chòi riêng...',
    requireDate: true, requireTime: false, requireCompany: false
  },
  catering: {
    type: 'Suất ăn doanh nghiệp', heading: 'Bắt đầu từ nhu cầu vận hành của đơn vị bạn.',
    copy: 'Cho Mỹ Yến biết quy mô, địa điểm và lịch phục vụ dự kiến. Chúng tôi sẽ liên hệ để trao đổi phương án phù hợp thay vì gửi một bảng giá chung.',
    dateLabel: 'Ngày dự kiến bắt đầu', timeLabel: 'Giờ phục vụ dự kiến', guestsLabel: 'Số suất mỗi ngày', noteLabel: 'Địa điểm và nhu cầu phục vụ',
    notePlaceholder: 'Ví dụ: địa điểm, số ca, số ngày phục vụ, cần giao tận nơi hay phục vụ tại chỗ...',
    requireDate: false, requireTime: false, requireCompany: true
  }
};

const modeForType = type => Object.values(requestModes).find(mode => mode.type === type) || requestModes.dining;
const modeForQuery = new URLSearchParams(window.location.search).get('request');
const pageRequestMode = {
  'events.html': 'event',
  'corporate-catering.html': 'catering'
}[window.location.pathname.split('/').pop()];

if (pageRequestMode) {
  document.querySelectorAll('a[href="index.html#reserve"]').forEach(link => {
    link.href = `/?request=${pageRequestMode}#reserve`;
  });
}

function setFieldRequirement(field, required) {
  if (!field) return;
  field.required = required;
  field.setAttribute('aria-required', String(required));
}

function applyRequestMode(mode) {
  if (!form) return;
  const select = form.querySelector('[name="type"]');
  const companyField = form.querySelector('[data-company-field]');
  const companyInput = form.querySelector('[name="company"]');
  const dateField = form.querySelector('[name="date"]');
  const timeField = form.querySelector('[name="time"]');
  select.value = mode.type;
  form.querySelector('[data-form-heading]').textContent = mode.heading;
  form.querySelector('[data-form-copy]').textContent = mode.copy;
  form.querySelector('[data-date-label]').textContent = mode.dateLabel;
  form.querySelector('[data-time-label]').textContent = mode.timeLabel;
  form.querySelector('[data-guests-label]').textContent = mode.guestsLabel;
  form.querySelector('[data-note-label]').textContent = mode.noteLabel;
  form.querySelector('[name="note"]').placeholder = mode.notePlaceholder;
  companyField.hidden = !mode.requireCompany;
  setFieldRequirement(companyInput, mode.requireCompany);
  setFieldRequirement(dateField, mode.requireDate);
  setFieldRequirement(timeField, mode.requireTime);
}

if (form) {
  const select = form.querySelector('[name="type"]');
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('[type="submit"]');
  let confirmationTimer;
  let requestFrame;

  applyRequestMode(requestModes[modeForQuery] || modeForType(select.value));
  select.addEventListener('change', () => applyRequestMode(modeForType(select.value)));
  document.querySelectorAll('[data-request-type]').forEach(link => link.addEventListener('click', () => applyRequestMode(modeForType(link.dataset.requestType))));

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle('form-status-error', isError);
    status.style.color = isError ? '#9a2e26' : '';
  };
  const createRequestId = () => {
    const date = new Date();
    const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('');
    const random = window.crypto?.getRandomValues
      ? window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-5).toUpperCase()
      : Math.random().toString(36).slice(-5).toUpperCase();
    return `MYY-${stamp}-${random}`;
  };
  const restoreSubmit = () => {
    clearTimeout(confirmationTimer);
    submitButton.disabled = false;
    submitButton.textContent = 'Gửi yêu cầu';
  };

  window.addEventListener('message', event => {
    if (!requestFrame || event.source !== requestFrame.contentWindow) return;
    const payload = event.data;
    if (!payload || payload.source !== 'myyen-request' || payload.requestId !== form.elements.requestId.value) return;
    restoreSubmit();
    if (!payload.ok) {
      setStatus('Mỹ Yến chưa thể xác nhận việc gửi yêu cầu. Vui lòng thử lại hoặc nhắn Zalo 0948 900 488 để được hỗ trợ ngay.', true);
      return;
    }
    setStatus(`Mỹ Yến đã nhận yêu cầu ${payload.requestId}. Đội ngũ sẽ liên hệ xác nhận trong 30–60 phút trong giờ hoạt động.`);
    form.reset();
    applyRequestMode(requestModes.dining);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (form.elements.website.value) return;
    const endpoint = window.MYYEN_REQUEST_ENDPOINT;
    if (!endpoint) {
      setStatus('Đặt chỗ trực tuyến đang được hoàn thiện. Vui lòng nhắn Zalo 0948 900 488 hoặc gọi 0948 900 488.', true);
      return;
    }
    if (!form.elements.requestId.value) form.elements.requestId.value = createRequestId();
    if (requestFrame) requestFrame.remove();
    requestFrame = document.createElement('iframe');
    requestFrame.name = 'myyen-request-target';
    requestFrame.hidden = true;
    document.body.appendChild(requestFrame);
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi…';
    setStatus('Đang gửi yêu cầu đến Mỹ Yến…');
    confirmationTimer = window.setTimeout(() => {
      restoreSubmit();
      setStatus('Chúng tôi chưa thể xác nhận việc gửi yêu cầu. Vui lòng giữ lại thông tin đã nhập và nhắn Zalo 0948 900 488 để được hỗ trợ ngay.', true);
    }, 15000);
    form.target = requestFrame.name;
    form.method = 'post';
    form.action = endpoint;
    form.submit();
  });
}
