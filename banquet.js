// The complete menu stays available without JavaScript; filters and comparison are enhancements.
const banquetCards = [...document.querySelectorAll('.banquet-card')];
const banquetFilters = document.querySelector('.banquet-filters');

if (banquetFilters && banquetCards.length) {
  let tier = 'all';
  let visibleCount = 6;
  const selectedCodes = new Set();
  const more = document.querySelector('#banquet-more');
  const results = document.querySelector('#banquet-results');
  const browser = document.querySelector('.banquet-browser');
  const comparison = document.createElement('section');
  comparison.className = 'banquet-comparison';
  comparison.setAttribute('aria-live', 'polite');
  browser.insertBefore(comparison, document.querySelector('.banquet-grid'));

  const selectedCards = () => banquetCards.filter(card => selectedCodes.has(card.dataset.menuCode));
  const renderComparison = () => {
    const cards = selectedCards();
    banquetCards.forEach(card => {
      const selected = selectedCodes.has(card.dataset.menuCode);
      const button = card.querySelector('.compare-toggle');
      button.setAttribute('aria-pressed', String(selected));
      button.textContent = selected ? 'Đã thêm để so sánh' : 'Thêm để so sánh';
    });
    if (!cards.length) {
      comparison.hidden = true;
      comparison.innerHTML = '';
      return;
    }
    comparison.hidden = false;
    comparison.innerHTML = `<div class="comparison-heading"><div><p class="eyebrow">So sánh thực đơn</p><h3>Đang chọn ${cards.length}/3 thực đơn</h3><p>So sánh từng phần bên dưới, rồi chọn thực đơn phù hợp để gửi yêu cầu tư vấn.</p></div><button type="button" class="comparison-clear">Xóa lựa chọn</button></div><div class="comparison-scroll"><div class="comparison-grid">${cards.map(card => `<article><p class="eyebrow">${card.dataset.menuPrice} / bàn</p><h4>Thực đơn ${card.dataset.menuCode}</h4><ol>${[...card.querySelectorAll('details li')].map(item => `<li>${item.textContent}</li>`).join('')}</ol><a class="button button-outline" href="events.html?menu=${card.dataset.menuCode}#group-helper">Chọn thực đơn ${card.dataset.menuCode}</a></article>`).join('')}</div></div>`;
    comparison.querySelector('.comparison-clear').addEventListener('click', () => {
      selectedCodes.clear();
      renderComparison();
    });
  };
  const render = () => {
    const matching = banquetCards.filter(card => tier === 'all' || card.dataset.tier === tier);
    banquetCards.forEach(card => { card.hidden = !matching.slice(0, visibleCount).includes(card); });
    more.hidden = visibleCount >= matching.length;
    results.textContent = `Đang hiện ${Math.min(visibleCount, matching.length)} / ${matching.length} thực đơn${tier === 'all' ? '' : ' trong mức giá đã chọn'}.`;
    return matching;
  };

  banquetFilters.hidden = false;
  banquetFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    tier = button.dataset.tierFilter;
    visibleCount = tier === 'all' ? 6 : 3;
    banquetFilters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    render();
  }));
  banquetCards.forEach(card => card.querySelector('.compare-toggle').addEventListener('click', () => {
    const code = card.dataset.menuCode;
    if (selectedCodes.has(code)) selectedCodes.delete(code);
    else if (selectedCodes.size < 3) selectedCodes.add(code);
    else {
      results.textContent = 'Bạn có thể so sánh tối đa 3 thực đơn cùng lúc.';
      return;
    }
    renderComparison();
  }));
  more.addEventListener('click', () => {
    const firstNew = visibleCount;
    visibleCount += 6;
    const matching = render();
    matching[firstNew]?.querySelector('summary').focus();
  });
  render();
  renderComparison();
}
