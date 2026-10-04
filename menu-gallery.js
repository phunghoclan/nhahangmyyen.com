const menuImages = {
  regular: [
    ['Món quay & gia cầm', '9d9850135e3b2b2624b139549bb555ff'], ['Vịt quay & món đặt trước', 'e1b034e1ac01f3a0d64222a864feff74'],
    ['Phá lấu Triều Châu', '063c7ee5afd659ac388fd78b2fe17fe4'], ['Canh tiềm', '33fedf68d7bba50e3482f7e06a47a754'],
    ['Hải vị', 'cdf81c51e0ceb18f96dc6bf99c047c59'], ['Súp vi cá & yến sào', 'b0348da9fa555819b7f6dbf60800afc1'],
    ['Hải sản', '02a4399081f41c5b2ef3986a32b30e94'], ['Tôm', '3b97acd7acaffd0bdd77c4bd01688637'],
    ['Tôm hùm', 'fc9f6b8328704252a5d7b0a32411bd65'], ['Tôm càng', '6e8697f38237dbb812dd091cc5ec47cc'],
    ['Tôm tích & tôm mũ ni', '889a162ef6003668834bc34c769f431b'], ['Cua & cua lột', '1212b767200406a1cdffbb83a5384279'],
    ['Cua Alaska', '8a619827b0b41709939d10168e1e8f7a'], ['Cá theo mùa', '656816498a073a99af1077c179947847'],
    ['Cá tươi', '74e5243614a1c4b36d46888cc7873321'], ['Cá chình & ba ba', '4194cfdfa9e74a8069c8a446b1aae8bf'],
    ['Ốc vòi voi & ốc hương', '4fbe098432475f7f1b78e3be010e2e4d'], ['Mực', 'c9e8cb3ea867850bde685271c33fd5d8'],
    ['Thịt bò', 'afa64b6e484d9628eb58687ebb5d6c29'], ['Thịt heo', 'fe3b4ffd2721247688b440d8e5d61e1e'],
    ['Món hấp', 'c833b813f0e41f9883097844fec989d6'], ['Rau củ', '5da55847605497337a7620bb216ac7b6'],
    ['Rau cải', 'fd8c2c994113db560997bd233693c700'], ['Cơm chiên & mì xào', '8d0171ff0f5f659644079d0e6dd12778'],
    ['Mì xào & hủ tiếu', '742eaa67e966534d41d297bcc740203b'], ['Lẩu', 'd35833e1c5ee4be4a61f9699c298a00a'],
    ['Món tay cầm', '45cce39a28d70c8af1fd200a19da90aa'], ['Đậu hủ', '5dcbc0fe0a39efffe68f9215395c82fc'],
    ['Trà, cà phê & nước giải khát', 'd74a8b9bcea1db2a4e4621a0f0392a32'], ['Nước ép, sinh tố & bia', 'b3d4dab34d44c0da15a8cea2acf7a801']
  ],
  dimsum: [
    ['Dim Sum — há cảo, xíu mại & bánh xếp', '6e03c6d1e53a7286eee101bcec8d7aa4'],
    ['Dim Sum — bánh cuốn & món chiên', '274ec11cf2a10a526fd8e636d8f79d78'],
    ['Dim Sum — bánh bao & món điểm tâm', 'd09b06ccdb1e7a55c5c15dd36e4de49b'],
    ['Dim Sum — xôi, bánh cuốn & món chiên', '7355170fd21823fac0ea3064680c7ce3'],
    ['Dim Sum — món nóng', '120d99a85604979ad47a5a1a0296e535'],
    ['Dim Sum — món hấp', '68ba80cce2d36a6b25b4eeb7b318dbb8'],
    ['Mì & hủ tiếu', '3dfbf53181d25c356368402a1a06c40e'],
    ['Mì & hủ tiếu', 'cac4949d731678984c3ad01341505008'],
    ['Mì & hủ tiếu đặc biệt', '25ba8d4d840b084c21ef3cde9cdffeaf'],
    ['Mì đặc biệt', 'f9a381c5675923104be85a856bf13a71'],
    ['Trà & cà phê', 'c4b30c403bac146f82f654ea86930ed1'],
    ['Nước giải khát & bia', 'c6b46d4cc0307772c8c30c00c824ed56'],
    ['Nước ép & sinh tố', 'e91a367e918d53235a2088fe30a7d1bc']
  ]
};

const digitalMenuItems = [
  ['Bánh xếp Triều Châu', 53000, 'dimsum'],
  ['Bó xôi cảo sò điệp', 58000, 'dimsum'],
  ['Mỹ Yến há cảo', 58000, 'dimsum'],
  ['Xíu mại thịt cua', 58000, 'dimsum'],
  ['Chân gà hấp tàu xì', 48000, 'dimsum'],
  ['Sườn non tàu xì', 58000, 'dimsum'],
  ['Bánh củ cải chiên', 53000, 'dimsum'],
  ['Bánh cuốn chay La Hán', 53000, 'dimsum'],
  ['Bánh cuốn tôm', 58000, 'dimsum'],
  ['Bánh cuốn xá xíu', 53000, 'dimsum'],
  ['Xôi gà lá sen', 53000, 'dimsum'],
  ['Bánh cuốn sườn X.O', 65000, 'dimsum'],
  ['Xôi gà chiên trứng', 63000, 'dimsum'],
  ['Bánh cuốn chiên X.O', 48000, 'dimsum'],
  ['Bánh hẹ chiên Triều Châu', 53000, 'dimsum'],
  ['Bánh củ cải chiên X.O', 53000, 'dimsum'],
  ['Bánh bao nấm', 48000, 'dimsum'],
  ['Bánh bao xá xíu', 48000, 'dimsum'],
  ['Bánh bao kim sa', 53000, 'dimsum'],
  ['Bánh bao Thượng Hải', 53000, 'dimsum'],
  ['Cảo giấm cay Tứ Xuyên', 60000, 'dimsum'],
  ['Đậu hũ ky dầu hào', 53000, 'dimsum'],
  ['Đậu hũ ky tôm chiên', 58000, 'dimsum'],
  ['Tôm chiên cuộn phô mai', 58000, 'dimsum'],
  ['Hoành thánh tôm chiên', 58000, 'dimsum'],
  ['Khoai môn chiên xù', 53000, 'dimsum'],
  ['Mayonnaise hải sản', 58000, 'dimsum'],
  ['Bánh trứng nướng Hồng Kông', 58000, 'dimsum'],
  ['Hủ tiếu / mì bò kho', 70000, 'noodles'],
  ['Hủ tiếu / mì sườn kho', 70000, 'noodles'],
  ['Hủ tiếu / mì hải sản', 70000, 'noodles'],
  ['Hủ tiếu / mì tôm cật', 70000, 'noodles'],
  ['Mì xá xíu trộn dầu hào', 70000, 'noodles'],
  ['Hủ tiếu / mì cá viên đậu hũ', 70000, 'noodles'],
  ['Hủ tiếu / mì sủi cảo', 70000, 'noodles'],
  ['Mì trộn đặc sắc Mỹ Yến', 75000, 'noodles'],
  ['Hủ tiếu / mì hoành thánh', 70000, 'noodles'],
  ['Hủ tiếu / mì thập cẩm', 70000, 'noodles'],
  ['Mì vịt tiềm', 108000, 'noodles'],
  ['Hủ tiếu / mì tôm', 70000, 'noodles'],
  ['Mì bào ngư vi cá hải sâm', 380000, 'noodles'],
  ['Cà phê đá', 25000, 'drinks'],
  ['Cà phê sữa đá', 30000, 'drinks'],
  ['Trà Lipton chanh', 20000, 'drinks'],
  ['Trà Lipton sữa', 25000, 'drinks'],
  ['Cacao sữa đá', 30000, 'drinks'],
  ['Đá chanh', 20000, 'drinks'],
  ['Sữa tươi', 20000, 'drinks'],
  ['Dừa tươi', 20000, 'drinks'],
  ['Nước ép trái cây', 35000, 'drinks'],
  ['Sinh tố', 35000, 'drinks'],
  ['Pepsi / 7Up / Soda', 18000, 'drinks'],
  ['Nước suối', 12000, 'drinks']
].map(([name, price, category], index) => ({ id: `dish-${index + 1}`, name, price, category }));

const shortlistKey = 'myyen-menu-shortlist-v1';
const quantityKey = 'myyen-menu-quantities-v1';
const categoryNames = { dimsum: 'Dim Sum', noodles: 'Mì & hủ tiếu', drinks: 'Thức uống' };
const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const normalizeText = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();

const dishGrid = document.querySelector('#dish-grid');
if (dishGrid) {
  const searchInput = document.querySelector('#dish-search');
  const filterButtons = [...document.querySelectorAll('[data-dish-filter]')];
  const results = document.querySelector('#dish-results');
  const count = document.querySelector('#dish-count');
  const shortlistItems = document.querySelector('#dish-shortlist-items');
  const shortlistEmpty = document.querySelector('.dish-shortlist-empty');
  const clearButton = document.querySelector('#dish-clear');
  const moreButton = document.querySelector('#dish-more');
  const dock = document.querySelector('#dish-selection-dock');
  const dockCount = document.querySelector('#dish-dock-count');
  const pageSize = 6;
  let visibleLimit = pageSize;
  let activeFilter = 'dimsum';
  let selected = [];
  let quantities = {};
  try {
    const saved = JSON.parse(localStorage.getItem(shortlistKey) || '[]');
    if (Array.isArray(saved)) selected = saved.filter(id => digitalMenuItems.some(item => item.id === id));
  } catch { selected = []; }
  try {
    const saved = JSON.parse(localStorage.getItem(quantityKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) quantities = saved;
  } catch { quantities = {}; }
  selected.forEach(id => { quantities[id] = Math.max(1, Number(quantities[id]) || 1); });

  const saveShortlist = () => {
    localStorage.setItem(shortlistKey, JSON.stringify(selected));
    localStorage.setItem(quantityKey, JSON.stringify(quantities));
    const names = selected.map(id => {
      const item = digitalMenuItems.find(candidate => candidate.id === id);
      return item ? `${item.name} × ${quantities[id] || 1}` : null;
    }).filter(Boolean);
    localStorage.setItem('myyen-menu-shortlist-names-v1', JSON.stringify(names));
  };
  const renderShortlist = () => {
    const selectedItems = selected.map(id => digitalMenuItems.find(item => item.id === id)).filter(Boolean);
    count.textContent = selectedItems.length;
    dockCount.textContent = selectedItems.length;
    dock.hidden = selectedItems.length === 0;
    shortlistItems.innerHTML = selectedItems.map(item => `<li><span>${item.name}<small>${formatPrice(item.price)} / phần</small></span><span class="dish-quantity"><button type="button" data-decrease-dish="${item.id}" aria-label="Giảm ${item.name}">−</button><strong aria-label="${quantities[item.id]} phần">${quantities[item.id]}</strong><button type="button" data-increase-dish="${item.id}" aria-label="Tăng ${item.name}">+</button></span><button type="button" data-remove-dish="${item.id}" aria-label="Bỏ ${item.name}">Bỏ</button></li>`).join('');
    shortlistEmpty.hidden = selectedItems.length > 0;
    clearButton.hidden = selectedItems.length === 0;
    shortlistItems.querySelectorAll('[data-remove-dish]').forEach(button => button.addEventListener('click', () => {
      selected = selected.filter(id => id !== button.dataset.removeDish);
      delete quantities[button.dataset.removeDish];
      saveShortlist();
      renderDishes();
      renderShortlist();
    }));
    shortlistItems.querySelectorAll('[data-decrease-dish]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.decreaseDish;
      quantities[id] = Math.max(1, (quantities[id] || 1) - 1);
      saveShortlist();
      renderShortlist();
    }));
    shortlistItems.querySelectorAll('[data-increase-dish]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.increaseDish;
      quantities[id] = Math.min(99, (quantities[id] || 1) + 1);
      saveShortlist();
      renderShortlist();
    }));
  };
  const renderDishes = () => {
    const query = normalizeText(searchInput.value.trim());
    const matching = digitalMenuItems.filter(item => (activeFilter === 'all' || item.category === activeFilter) && (!query || normalizeText(item.name).includes(query)));
    const visible = matching.slice(0, visibleLimit);
    results.textContent = matching.length > visible.length ? `Đang hiện ${visible.length} / ${matching.length} món.` : `${matching.length} món phù hợp.`;
    moreButton.hidden = visible.length >= matching.length;
    dishGrid.innerHTML = visible.map(item => {
      const isSelected = selected.includes(item.id);
      return `<article class="dish-item"><p class="eyebrow">${categoryNames[item.category]}</p><h3>${item.name}</h3><p class="dish-item-price">${formatPrice(item.price)} <small>tham khảo</small></p><button type="button" data-add-dish="${item.id}" aria-pressed="${isSelected}">${isSelected ? 'Đã thêm' : 'Thêm vào yêu cầu'}</button></article>`;
    }).join('');
    dishGrid.querySelectorAll('[data-add-dish]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.addDish;
      if (selected.includes(id)) {
        selected = selected.filter(value => value !== id);
        delete quantities[id];
      } else {
        selected = [...selected, id];
        quantities[id] = 1;
      }
      saveShortlist();
      renderDishes();
      renderShortlist();
    }));
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.dishFilter;
    visibleLimit = pageSize;
    searchInput.value = '';
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderDishes();
  }));
  searchInput.addEventListener('input', () => {
    visibleLimit = searchInput.value.trim() ? digitalMenuItems.length : pageSize;
    renderDishes();
  });
  moreButton.addEventListener('click', () => {
    visibleLimit += pageSize;
    renderDishes();
  });
  clearButton.addEventListener('click', () => {
    selected = [];
    quantities = {};
    saveShortlist();
    renderDishes();
    renderShortlist();
  });
  saveShortlist();
  renderDishes();
  renderShortlist();
}

const gallery = document.querySelector('#menu-gallery');
const galleryDetails = document.querySelector('#menu-catalogue-details');
const tabs = [...document.querySelectorAll('[data-menu-tab]')];
const tabCopy = document.querySelector('#menu-gallery-copy');
const imagePath = (type, image) => `assets/menu/${type}/${image}.JPEG`;
let activeMenuType = 'regular';
let activeMenuIndex = 0;
const viewer = document.createElement('dialog');
viewer.className = 'menu-viewer';
viewer.innerHTML = '<div class="menu-viewer-bar"><p class="menu-viewer-title"></p><div><button class="menu-viewer-previous" type="button" aria-label="Trang trước">‹</button><button class="menu-viewer-next" type="button" aria-label="Trang sau">›</button><button class="menu-viewer-close" type="button">Đóng</button></div></div><img class="menu-viewer-image" alt="">';
document.body.appendChild(viewer);
const categoryTargets = {
  seafood: 'Hải sản',
  roast: 'Vịt quay',
  poultry: 'Món quay & gia cầm',
  soup: 'Canh tiềm',
  noodles: 'Cơm chiên & mì xào'
};

const updateViewer = () => {
  const [title, image] = menuImages[activeMenuType][activeMenuIndex];
  const imageElement = viewer.querySelector('.menu-viewer-image');
  imageElement.src = imagePath(activeMenuType, image);
  imageElement.alt = `Trang thực đơn ${title} của Nhà Hàng Mỹ Yến`;
  viewer.querySelector('.menu-viewer-title').textContent = title;
  viewer.querySelector('.menu-viewer-previous').disabled = activeMenuIndex === 0;
  viewer.querySelector('.menu-viewer-next').disabled = activeMenuIndex === menuImages[activeMenuType].length - 1;
};

const openViewer = (type, index) => {
  activeMenuType = type;
  activeMenuIndex = Number(index);
  updateViewer();
  viewer.showModal();
};

const renderGallery = type => {
  if (!gallery) return;
  gallery.innerHTML = menuImages[type].map(([title, image], index) => `<figure class="menu-page-card"><button class="menu-page-open" type="button" data-menu-index="${index}" aria-label="Phóng to trang thực đơn ${title}"><img loading="lazy" src="${imagePath(type, image)}" alt="Trang thực đơn ${title} của Nhà Hàng Mỹ Yến"><figcaption>${title}<span>Phóng to</span></figcaption></button></figure>`).join('');
  gallery.querySelectorAll('.menu-page-open').forEach(button => button.addEventListener('click', () => openViewer(type, button.dataset.menuIndex)));
  tabs.forEach(tab => { const selected = tab.dataset.menuTab === type; tab.classList.toggle('is-selected', selected); tab.setAttribute('aria-pressed', String(selected)); });
  if (tabCopy) tabCopy.textContent = type === 'regular' ? 'Thực đơn gọi món gồm các món dùng chung, hải sản theo mùa và món đặt trước. Giá hải sản thời giá sẽ được Mỹ Yến xác nhận trực tiếp.' : 'Khám phá Dim Sum, mì & hủ tiếu, trà, cà phê, nước ép và thức uống. Hình ảnh chỉ mang tính minh họa; Mỹ Yến sẽ kiểm tra tình trạng món trước khi xác nhận.';
};

tabs.forEach(tab => tab.addEventListener('click', () => renderGallery(tab.dataset.menuTab)));
viewer.querySelector('.menu-viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.menu-viewer-previous').addEventListener('click', () => { activeMenuIndex -= 1; updateViewer(); });
viewer.querySelector('.menu-viewer-next').addEventListener('click', () => { activeMenuIndex += 1; updateViewer(); });
if (gallery) {
  let galleryRendered = false;
  const ensureGallery = () => {
    if (galleryRendered) return;
    renderGallery('regular');
    galleryRendered = true;
  };
  galleryDetails?.addEventListener('toggle', () => {
    if (galleryDetails.open) ensureGallery();
  });
  document.querySelector('.dish-filters a[href="#menu-catalogue"]')?.addEventListener('click', () => {
    galleryDetails.open = true;
    ensureGallery();
  });
  const category = new URLSearchParams(window.location.search).get('category');
  const target = categoryTargets[category];
  if (target) {
    galleryDetails.open = true;
    ensureGallery();
    const card = [...gallery.querySelectorAll('.menu-page-card')].find(item => item.querySelector('figcaption').textContent.includes(target));
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card?.classList.add('menu-page-card-highlight');
  }
}
