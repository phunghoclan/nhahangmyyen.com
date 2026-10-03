const dishes = {
  seafood: { title: 'Hải sản tươi sống', copy: 'Chọn hải sản theo mùa và cách chế biến: hấp kiểu Hồng Kông, hấp tàu xì, xào tương XO, rang muối hoặc nướng.' },
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
const paths = {
  dine: { kicker: 'Dùng bữa tại Mỹ Yến', heading: 'Một bữa ăn để ngồi lại lâu hơn.', copy: 'Chọn chòi sân vườn cho cuộc gặp thân mật, hoặc khám phá những món ăn phù hợp để cả bàn cùng thưởng thức.', primary: 'Chuẩn bị yêu cầu đặt bàn', primaryHref: 'spaces.html#table-helper', secondary: 'Xem thực đơn', secondaryHref: 'menu.html' },
  event: { kicker: 'Tiệc & sự kiện', heading: 'Một kế hoạch rõ ràng cho ngày quan trọng.', copy: 'Từ sinh nhật, mừng thọ đến liên hoan công ty và lễ cưới, Mỹ Yến hỗ trợ bạn bắt đầu từ số khách, không gian và thực đơn.', primary: 'Chuẩn bị yêu cầu tiệc', primaryHref: 'events.html#group-helper', secondary: 'Xem cách chuẩn bị tiệc', secondaryHref: 'events.html' },
  corporate: { kicker: 'Suất ăn doanh nghiệp', heading: 'Suất ăn hằng ngày, phù hợp với nhịp làm việc của đội ngũ.', copy: 'Tư vấn trực tiếp cho văn phòng, công ty, nhà máy và cơ sở sản xuất theo số lượng, ca làm và nhu cầu thực tế.', primary: 'Chuẩn bị yêu cầu', primaryHref: 'corporate-catering.html#corporate-helper', secondary: 'Tìm hiểu dịch vụ', secondaryHref: 'corporate-catering.html' },
  takeaway: { kicker: 'Đặt món mang về', heading: 'Một bàn ăn ngon, ở nơi bạn muốn.', copy: 'Đặt trước cho bữa cơm gia đình, buổi họp mặt hoặc dịp có nhiều người cùng dùng bữa. Mỹ Yến xác nhận trực tiếp về món và thời gian chuẩn bị.', primary: 'Chuẩn bị yêu cầu đặt món', primaryHref: 'takeaway.html#takeaway-helper', secondary: 'Xem món phù hợp', secondaryHref: 'takeaway.html' }
};
const pathPanel = document.querySelector('#path-panel');
if (pathPanel) document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => {
  const item = paths[button.dataset.path];
  document.querySelectorAll('[data-path]').forEach(control => { control.classList.remove('is-active'); control.setAttribute('aria-selected', 'false'); });
  button.classList.add('is-active'); button.setAttribute('aria-selected', 'true');
  document.querySelector('#path-kicker').textContent = item.kicker;
  document.querySelector('#path-heading').textContent = item.heading;
  document.querySelector('#path-copy').textContent = item.copy;
  const primary = document.querySelector('#path-primary'); primary.textContent = item.primary; primary.href = item.primaryHref;
  if (item.primaryHref.startsWith('http')) { primary.target = '_blank'; primary.rel = 'noopener'; } else { primary.removeAttribute('target'); primary.removeAttribute('rel'); }
  const secondary = document.querySelector('#path-secondary'); secondary.textContent = item.secondary; secondary.href = item.secondaryHref;
}));

const formatVietnamDate = value => {
  if (!value) return 'Chưa xác định';
  const [yearText, monthText, dayText] = value.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (!year || !month || !day) return value;
  const formatted = String(day).padStart(2, '0') + '/' + String(month).padStart(2, '0') + '/' + year;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const today = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
  const offset = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(today.year, today.month - 1, today.day)) / 86400000);
  if (offset === 0) return 'Hôm nay (' + formatted + ')';
  if (offset === 1) return 'Ngày mai (' + formatted + ')';
  if (offset === 2) return 'Ngày mốt (' + formatted + ')';
  return formatted;
};

const groupHelper = document.querySelector('#group-helper');
if (groupHelper) {
  const choices = { occasion: '', guests: '', space: '' };
  const summary = document.querySelector('#group-summary-text');
  const copyButton = document.querySelector('#copy-group-request');
  const status = document.querySelector('#group-copy-status');
  const dateInput = document.querySelector('#group-date');
  const timeInput = document.querySelector('#group-time');

  const formatDate = value => formatVietnamDate(value);

  const requestMessage = () => 'Chào Nhà Hàng Mỹ Yến, tôi muốn tư vấn tiệc.\n\n'
    + '- Dịp: ' + (choices.occasion || 'Chưa xác định') + '\n'
    + '- Số khách: ' + (choices.guests || 'Chưa xác định') + '\n'
    + '- Ngày dự kiến: ' + formatDate(dateInput.value) + '\n'
    + '- Giờ dự kiến: ' + (timeInput.value || 'Chưa xác định') + '\n'
    + '- Không gian: ' + (choices.space || 'Chưa xác định') + '\n\n'
    + 'Xin Mỹ Yến tư vấn giúp tôi. Cảm ơn.';

  const updateSummary = () => {
    const ready = choices.occasion && choices.guests && choices.space;
    copyButton.disabled = !ready;
    if (!ready) {
      summary.textContent = 'Chọn dịp, số khách và không gian để tạo bản tóm tắt.';
      return;
    }
    summary.textContent = choices.occasion + ' · ' + choices.guests + ' · ' + formatDate(dateInput.value) + ' · ' + (timeInput.value || 'Chưa xác định') + ' · ' + choices.space + '.';
  };

  groupHelper.querySelectorAll('[data-group] button').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('[data-group]');
    choices[group.dataset.group] = button.dataset.value;
    group.querySelectorAll('button').forEach(choice => {
      const selected = choice === button;
      choice.classList.toggle('is-selected', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
    status.textContent = 'Sau khi sao chép, mở Zalo và dán nội dung vào cuộc trò chuyện với Mỹ Yến.';
    updateSummary();
  }));

  [dateInput, timeInput].forEach(input => input.addEventListener('change', updateSummary));

  copyButton.addEventListener('click', async () => {
    const text = requestMessage();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = text;
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
    copyButton.textContent = 'Đã sao chép yêu cầu';
    status.textContent = 'Đã sao chép. Bây giờ mở Zalo và dán nội dung để Mỹ Yến tư vấn.';
  });
}

const formatRequestDate = value => formatVietnamDate(value);

const copyRequestText = async text => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const fallback = document.createElement('textarea');
    fallback.value = text;
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand('copy');
    fallback.remove();
  }
};

document.querySelectorAll('[data-request-helper]').forEach(helper => {
  const selections = {};
  const groups = [...helper.querySelectorAll('[data-request-group]')];
  const inputs = [...helper.querySelectorAll('[data-request-input]')];
  const summary = helper.querySelector('.request-summary-text');
  const copyButton = helper.querySelector('.copy-request');
  const status = helper.querySelector('.request-copy-status');
  const defaultSummary = summary.textContent;

  const selectedLines = () => {
    const lines = groups.filter(group => selections[group.dataset.requestGroup]).map(group => ({
      label: group.dataset.label,
      value: selections[group.dataset.requestGroup]
    }));
    inputs.forEach(input => lines.push({
      label: input.dataset.label,
      value: input.value ? (input.type === 'date' ? formatRequestDate(input.value) : input.value) : 'Chưa xác định'
    }));
    return lines;
  };

  const update = () => {
    const ready = groups.filter(group => group.dataset.required === 'true').every(group => selections[group.dataset.requestGroup]);
    copyButton.disabled = !ready;
    const lines = selectedLines();
    summary.textContent = ready ? lines.map(line => line.value).join(' · ') + '.' : defaultSummary;
  };

  groups.forEach(group => group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    selections[group.dataset.requestGroup] = button.dataset.value;
    group.querySelectorAll('button').forEach(choice => {
      const selected = choice === button;
      choice.classList.toggle('is-selected', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
    copyButton.textContent = 'Sao chép yêu cầu';
    status.textContent = 'Sau khi sao chép, mở Zalo và dán nội dung vào cuộc trò chuyện với Mỹ Yến.';
    update();
  })));

  inputs.forEach(input => input.addEventListener('change', () => {
    copyButton.textContent = 'Sao chép yêu cầu';
    update();
  }));

  copyButton.addEventListener('click', async () => {
    const message = 'Chào Nhà Hàng Mỹ Yến, tôi muốn ' + helper.dataset.requestType + '.\n\n'
      + selectedLines().map(line => '- ' + line.label + ': ' + line.value).join('\n')
      + '\n\nXin Mỹ Yến tư vấn giúp tôi. Cảm ơn.';
    await copyRequestText(message);
    copyButton.textContent = 'Đã sao chép yêu cầu';
    status.textContent = 'Đã sao chép. Bây giờ mở Zalo và dán nội dung để Mỹ Yến tư vấn.';
  });
});
