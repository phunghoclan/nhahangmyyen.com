// The complete menu stays available without JavaScript; filtering is an enhancement.
const banquetCards = [...document.querySelectorAll('.banquet-card')];
const banquetFilters = document.querySelector('.banquet-filters');
if (banquetFilters && banquetCards.length) {
  let tier = 'all';
  let visibleCount = 6;
  const more = document.querySelector('#banquet-more');
  const results = document.querySelector('#banquet-results');
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
  more.addEventListener('click', () => {
    const firstNew = visibleCount;
    visibleCount += 6;
    const matching = render();
    matching[firstNew]?.querySelector('summary').focus();
  });
  render();
}
