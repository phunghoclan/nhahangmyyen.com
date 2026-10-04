import fs from 'node:fs';
const { menus } = JSON.parse(fs.readFileSync('assets/banquet-menus.json', 'utf8'));
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const price = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
if (new Set(menus.map(menu => menu.code)).size !== menus.length) throw new Error('Duplicate menu codes');
for (const menu of menus) {
  if (!/^[1-6][A-H]$/.test(menu.code) || menu.tier !== Number(menu.code[0]) || !Number.isInteger(menu.price) || menu.price <= 0 || !menu.dishes.length) throw new Error('Invalid menu: ' + menu.code);
}
const cards = menus.map(menu => `<article class="banquet-card" data-tier="${menu.tier}" data-menu-code="${menu.code}" data-menu-price="${price(menu.price)}"><p class="eyebrow">10 khách / bàn · ${menu.dishes.length} phần</p><h3>Thực đơn ${menu.code}</h3><p class="banquet-price">${price(menu.price)}<small>Giá tham khảo / bàn</small></p><details><summary>Xem ${menu.dishes.length} phần trong thực đơn</summary><ol>${menu.dishes.map(dish => `<li>${escape(dish)}</li>`).join('')}</ol></details><button class="compare-toggle" type="button" aria-pressed="false">Thêm để so sánh</button><a class="button button-outline" href="events.html?menu=${menu.code}#group-helper">Chọn thực đơn ${menu.code}</a></article>`).join('\n');
const options = '<option value="">Nhờ Mỹ Yến gợi ý</option>' + menus.map(menu => `<option value="${menu.code}">Thực đơn ${menu.code} · ${price(menu.price)} / bàn (tham khảo)</option>`).join('');
const filters = '<button type="button" data-tier-filter="all" aria-pressed="true">Tất cả mức giá</button>' + [...new Map(menus.map(menu => [menu.tier,menu.price])).entries()].map(([tier,value]) => {
  const counts = [...new Set(menus.filter(menu => menu.tier === tier).map(menu => menu.dishes.length))];
  const courseLabel = counts.length === 1 ? `${counts[0]} phần` : `${Math.min(...counts)}–${Math.max(...counts)} phần`;
  return `<button type="button" data-tier-filter="${tier}" aria-pressed="false"><strong>${price(value)}</strong><small>${courseLabel} / bàn</small></button>`;
}).join('');
const page = fs.readFileSync('banquet-menu.html','utf8')
  .replace(/(?:<p class="banquet-selection-note">[\s\S]*?<\/p>)?<p id="banquet-results" role="status">[\s\S]*?<\/p>/, '<p class="banquet-selection-note">Chọn thực đơn để đưa vào yêu cầu tư vấn của bạn.</p><p id="banquet-results" role="status">34 thực đơn để bạn tham khảo.</p>')
  .replace(/(<div class="banquet-grid">)[\s\S]*?(<\/div><button class="button button-outline banquet-more")/,(_,start,end) => start + cards + end);
const filteredPage = page.replace(/(<div class="banquet-filters"[^>]*>)[\s\S]*?(<\/div>)/,(_,start,end) => start + filters + end);
const events = fs.readFileSync('events.html','utf8').replace(/(<select id="group-menu">)[\s\S]*?(<\/select>)/,(_,start,end) => start + options + end);
fs.writeFileSync('banquet-menu.html',filteredPage);
fs.writeFileSync('events.html',events);
console.log(`Rendered ${menus.length} banquet menus and matching helper options.`);
