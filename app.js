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
if (toggle && nav) {
  const closeNavigation = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!nav.classList.contains('open') || nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNavigation();
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
  document.addEventListener('focusin', event => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeNavigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigation();
  });
}

// Give the mobile contact action a useful destination on every page.
const mobileContact = document.querySelector('.mobile-actions a:last-child[href="#contact"]');
if (mobileContact) {
  const pageHelper = ['table-helper', 'corporate-helper', 'takeaway-helper']
    .find(id => document.querySelector('#' + id));
  mobileContact.href = pageHelper ? '#' + pageHelper : 'index.html#contact';
}
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
  document.querySelectorAll('a[href="index.html#contact"]').forEach(link => {
    link.href = '#group-helper';
    if (link.classList.contains('button-small')) link.textContent = 'Chuẩn bị yêu cầu';
    if (link.classList.contains('button') && !link.classList.contains('button-small')) link.textContent = 'Chuẩn bị yêu cầu tiệc';
  });
  const choices = { occasion: '', guests: '', space: '' };
  const summary = document.querySelector('#group-summary-text');
  const copyButton = document.querySelector('#copy-group-request');
  const status = document.querySelector('#group-copy-status');
  const dateInput = document.querySelector('#group-date');
  const timeInput = document.querySelector('#group-time');
  const menuInput = document.querySelector('#group-menu');
  const notesInput = document.querySelector('#group-notes');
  const services = [...groupHelper.querySelectorAll('[name="event-service"]')];
  const draftKey = 'myyen-event-draft-v1';
  // Keep unfinished planning in this tab only; it is never submitted automatically.
  try {
    const saved = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
    if (saved && typeof saved === 'object') {
      Object.keys(choices).forEach(key => {
        const allowed = [...groupHelper.querySelectorAll(`[data-group="${key}"] button`)].map(b => b.dataset.value);
        if (allowed.includes(saved[key])) choices[key] = saved[key];
      });
      dateInput.value = typeof saved.date === 'string' ? saved.date : '';
      timeInput.value = typeof saved.time === 'string' ? saved.time : '';
      menuInput.value = typeof saved.menu === 'string' ? saved.menu : '';
      notesInput.value = typeof saved.notes === 'string' ? saved.notes.slice(0, 1000) : '';
      services.forEach(input => { input.checked = Array.isArray(saved.services) && saved.services.includes(input.value); });
    }
  } catch { /* Planning also works when browser storage is unavailable. */ }
  const requestedMenu = new URLSearchParams(location.search).get('menu');
  if (requestedMenu && [...menuInput.options].some(option => option.value === requestedMenu)) menuInput.value = requestedMenu;
  const requestMessage = () => {
    const selectedServices = services.filter(input => input.checked).map(input => input.value);
    const lines = [
      choices.occasion && '- Dịp: ' + choices.occasion,
      choices.guests && '- Số khách dự kiến: ' + choices.guests,
      dateInput.value && '- Ngày dự kiến: ' + formatVietnamDate(dateInput.value),
      timeInput.value && '- Giờ dự kiến: ' + timeInput.value,
      choices.space && '- Không gian: ' + choices.space,
      menuInput.value && '- Thực đơn: Set ' + menuInput.value + ' (tài liệu tiệc 2026, 10 khách/bàn)',
      selectedServices.length && '- Cần tư vấn thêm: ' + selectedServices.join(', '),
      notesInput.value.trim() && '- Yêu cầu thêm: ' + notesInput.value.trim()
    ].filter(Boolean);
    return 'Chào Mỹ Yến, mình muốn được tư vấn tiệc.\n\n'
      + lines.join('\n')
      + '\n\nNhờ Mỹ Yến kiểm tra chỗ, tư vấn thực đơn và báo giá gồm thuế, thức uống, dịch vụ giúp mình. Cảm ơn!';
  };
  const previewSummary = () => {
    if (!choices.occasion && !choices.guests) return 'Hãy chọn dịp và số khách trước. Bạn có thể bổ sung ngày, không gian và thực đơn sau.';
    const parts = [];
    if (choices.occasion) parts.push(choices.occasion);
    if (choices.guests) parts.push(choices.guests);
    if (dateInput.value) parts.push(formatVietnamDate(dateInput.value));
    if (timeInput.value) parts.push(timeInput.value);
    if (choices.space) parts.push(choices.space);
    if (menuInput.value) parts.push('Thực đơn ' + menuInput.value);
    return parts.join(' · ') + '.';
  };
  const updateSummary = () => {
    copyButton.disabled = !(choices.occasion && choices.guests);
    summary.textContent = previewSummary();
    copyButton.textContent = 'Sao chép yêu cầu';
    status.textContent = copyButton.disabled ? 'Chọn dịp và số khách để sao chép. Những thông tin khác có thể bổ sung sau.' : 'Sao chép, mở Zalo và dán nội dung để gửi cho Mỹ Yến.';
    groupHelper.querySelectorAll('[data-group] button').forEach(button => {
      const selected = choices[button.closest('[data-group]').dataset.group] === button.dataset.value;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    try {
      sessionStorage.setItem(draftKey, JSON.stringify({ ...choices, date: dateInput.value, time: timeInput.value, menu: menuInput.value, notes: notesInput.value, services: services.filter(input => input.checked).map(input => input.value) }));
    } catch { /* Storage is optional. */ }
  };
  groupHelper.querySelectorAll('[data-group] button').forEach(button => button.addEventListener('click', () => {
    choices[button.closest('[data-group]').dataset.group] = button.dataset.value;
    updateSummary();
  }));
  [dateInput, timeInput, menuInput, notesInput, ...services].forEach(input => input.addEventListener('input', updateSummary));
  copyButton.addEventListener('click', async () => {
    let copied = false;
    try { await navigator.clipboard.writeText(requestMessage()); copied = true; }
    catch {
      const fallback = document.createElement('textarea');
      fallback.value = requestMessage();
      fallback.style.position = 'fixed'; fallback.style.opacity = '0';
      document.body.appendChild(fallback); fallback.select();
      try { copied = document.execCommand('copy'); } catch { copied = false; }
      fallback.remove(); copyButton.focus();
    }
    copyButton.textContent = copied ? 'Đã sao chép yêu cầu' : 'Thử sao chép lại';
    status.textContent = copied ? 'Đã sao chép. Mở Zalo và dán nội dung để gửi. Yêu cầu chỉ được gửi khi bạn gửi tin nhắn trong Zalo.' : 'Chưa sao chép được. Bạn có thể chọn và sao chép nội dung tóm tắt phía trên, rồi dán vào Zalo.';
  });
  groupHelper.querySelectorAll('a[href^="https://zalo.me/"]').forEach(link => {
    link.textContent = 'Sao chép rồi mở Zalo';
    link.addEventListener('click', async () => {
      if (copyButton.disabled) return;
      try {
        await navigator.clipboard.writeText(requestMessage());
        copyButton.textContent = 'Đã sao chép yêu cầu';
        status.textContent = 'Đã sao chép. Zalo đang mở; hãy dán nội dung và bấm gửi để Mỹ Yến nhận yêu cầu.';
      } catch {
        status.textContent = 'Zalo đang mở. Hãy sao chép phần tóm tắt trước, rồi dán nội dung để gửi cho Mỹ Yến.';
      }
    });
  });
  updateSummary();
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
  const takeawayDishes = helper.querySelector('#takeaway-dishes');
  const takeawayMenuInterest = helper.querySelector('#takeaway-menu-interest');
  const takeawayDishesStep = helper.querySelector('#takeaway-dishes-step');
  const takeawayTimeStep = helper.querySelector('#takeaway-time-step');

  const syncMenuShortlist = () => {
    if (!takeawayDishes) return;
    let names = [];
    try {
      const saved = JSON.parse(localStorage.getItem('myyen-menu-shortlist-names-v1') || '[]');
      if (Array.isArray(saved)) names = saved.filter(name => typeof name === 'string');
    } catch { names = []; }
    const previous = takeawayDishes.dataset.shortlistValue || '';
    if (takeawayDishes.value.trim() && takeawayDishes.value !== previous) return;
    const next = names.join(', ');
    takeawayDishes.value = next;
    takeawayDishes.dataset.shortlistValue = next;
    if (next) takeawayDishes.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const inputLines = subset => subset.filter(input => input.value || !input.hasAttribute('data-optional')).map(input => ({
    label: input.dataset.label,
    value: input.value ? (input.type === 'date' ? formatRequestDate(input.value) : input.value) : 'Chưa xác định'
  }));

  const selectedLines = () => {
    const priorityInputs = inputs.filter(input => input.hasAttribute('data-request-priority'));
    const regularInputs = inputs.filter(input => !input.hasAttribute('data-request-priority'));
    const groupLines = groups.filter(group => selections[group.dataset.requestGroup]).map(group => ({
      label: group.dataset.label,
      value: selections[group.dataset.requestGroup]
    }));
    return [...inputLines(priorityInputs), ...groupLines, ...inputLines(regularInputs)];
  };

  const update = () => {
    if (takeawayDishes && takeawayMenuInterest) {
      const hasNamedDishes = Boolean(takeawayDishes.value.trim());
      takeawayMenuInterest.hidden = hasNamedDishes;
      takeawayMenuInterest.dataset.required = String(!hasNamedDishes);
      if (hasNamedDishes) delete selections.menu;
      takeawayDishesStep.textContent = hasNamedDishes ? '03' : '04';
      takeawayTimeStep.textContent = hasNamedDishes ? '04' : '05';
    }
    const groupsReady = groups.filter(group => group.dataset.required === 'true').every(group => selections[group.dataset.requestGroup]);
    const inputsReady = inputs.filter(input => input.hasAttribute('data-required')).every(input => input.value.trim());
    const ready = groupsReady && inputsReady;
    copyButton.disabled = !ready;
    const lines = selectedLines();
    const summaryText = lines.map(line => line.value).join(' · ').replace(/[.。]+$/, '');
    summary.textContent = ready ? summaryText + '.' : defaultSummary;
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

  const updateFromInput = () => {
    copyButton.textContent = 'Sao chép yêu cầu';
    update();
  };
  inputs.forEach(input => {
    input.addEventListener('change', updateFromInput);
    input.addEventListener('input', updateFromInput);
  });

  if (takeawayDishes) {
    syncMenuShortlist();
    window.addEventListener('focus', syncMenuShortlist);
    window.addEventListener('storage', event => {
      if (event.key === 'myyen-menu-shortlist-names-v1') syncMenuShortlist();
    });
  }

  const requestMessage = () => 'Chào Nhà Hàng Mỹ Yến, tôi muốn ' + helper.dataset.requestType + '.\n\n'
      + selectedLines().map(line => '- ' + line.label + ': ' + line.value).join('\n')
      + '\n\nXin Mỹ Yến tư vấn giúp tôi. Cảm ơn.';
  copyButton.addEventListener('click', async () => {
    const message = requestMessage();
    await copyRequestText(message);
    copyButton.textContent = 'Đã sao chép yêu cầu';
    status.textContent = 'Đã sao chép. Mở Zalo và dán nội dung để gửi yêu cầu cho Mỹ Yến.';
  });
  helper.querySelectorAll('a[href^="https://zalo.me/"]').forEach(link => {
    link.textContent = 'Sao chép rồi mở Zalo';
    link.addEventListener('click', async () => {
      if (copyButton.disabled) return;
      try {
        await copyRequestText(requestMessage());
        copyButton.textContent = 'Đã sao chép yêu cầu';
        status.textContent = 'Đã sao chép. Zalo đang mở; hãy dán nội dung và bấm gửi để Mỹ Yến nhận yêu cầu.';
      } catch {
        status.textContent = 'Zalo đang mở. Hãy sao chép phần tóm tắt trước, rồi dán nội dung để gửi cho Mỹ Yến.';
      }
    });
  });
});
