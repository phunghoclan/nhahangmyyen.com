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
  dine: { kicker: 'Dùng bữa tại Mỹ Yến', heading: 'Một bữa ăn để ngồi lại lâu hơn.', copy: 'Chọn chòi sân vườn cho cuộc gặp thân mật, hoặc khám phá những món ăn phù hợp để cả bàn cùng thưởng thức.', primary: 'Chọn không gian', primaryHref: 'spaces.html', secondary: 'Xem thực đơn', secondaryHref: 'menu.html' },
  event: { kicker: 'Tiệc & sự kiện', heading: 'Một kế hoạch rõ ràng cho ngày quan trọng.', copy: 'Từ sinh nhật, mừng thọ đến liên hoan công ty và lễ cưới, Mỹ Yến hỗ trợ bạn bắt đầu từ số khách, không gian và thực đơn.', primary: 'Tư vấn tiệc qua Zalo', primaryHref: 'https://zalo.me/0948900488', secondary: 'Xem cách chuẩn bị tiệc', secondaryHref: 'events.html' },
  corporate: { kicker: 'Suất ăn doanh nghiệp', heading: 'Suất ăn hằng ngày, phù hợp với nhịp làm việc của đội ngũ.', copy: 'Tư vấn trực tiếp cho văn phòng, công ty, nhà máy và cơ sở sản xuất theo số lượng, ca làm và nhu cầu thực tế.', primary: 'Nhận tư vấn qua Zalo', primaryHref: 'https://zalo.me/0948900488', secondary: 'Tìm hiểu dịch vụ', secondaryHref: 'corporate-catering.html' },
  takeaway: { kicker: 'Đặt món mang về', heading: 'Một bàn ăn ngon, ở nơi bạn muốn.', copy: 'Đặt trước cho bữa cơm gia đình, buổi họp mặt hoặc dịp có nhiều người cùng dùng bữa. Mỹ Yến xác nhận trực tiếp về món và thời gian chuẩn bị.', primary: 'Nhắn Zalo đặt món', primaryHref: 'https://zalo.me/0948900488', secondary: 'Xem món phù hợp', secondaryHref: 'takeaway.html' }
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

const groupHelper = document.querySelector('#group-helper');
if (groupHelper) {
  const choices = { occasion: '', guests: '', space: '' };
  const summary = document.querySelector('#group-summary-text');
  const copyButton = document.querySelector('#copy-group-request');
  const status = document.querySelector('#group-copy-status');
  const dateInput = document.querySelector('#group-date');
  const timeInput = document.querySelector('#group-time');

  const formatDate = value => {
    if (!value) return 'Chưa xác định';
    const [year, month, day] = value.split('-');
    return day && month && year ? day + '/' + month + '/' + year : value;
  };

  const requestMessage = () => 'Chào Nhà Hàng Mỹ Yến, tôi muốn tư vấn tiệc.\n\n'
    + '- Dịp: ' + (choices.occasion || 'Chưa xác định') + '\n'
    + '- Số khách: ' + (choices.guests || 'Chưa xác định') + '\n'
    + '- Ngày dự kiến: ' + formatDate(dateInput.value) + '\n'
    + '- Buổi: ' + (timeInput.value || 'Chưa xác định') + '\n'
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
