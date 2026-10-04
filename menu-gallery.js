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

const gallery = document.querySelector('#menu-gallery');
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
  gallery.innerHTML = menuImages[type].map(([title, image], index) => `<figure class="menu-page-card"><button class="menu-page-open" type="button" data-menu-index="${index}" aria-label="Mở lớn trang thực đơn ${title}"><img loading="lazy" src="${imagePath(type, image)}" alt="Trang thực đơn ${title} của Nhà Hàng Mỹ Yến"><figcaption>${title}<span>Xem lớn</span></figcaption></button></figure>`).join('');
  gallery.querySelectorAll('.menu-page-open').forEach(button => button.addEventListener('click', () => openViewer(type, button.dataset.menuIndex)));
  tabs.forEach(tab => { const selected = tab.dataset.menuTab === type; tab.classList.toggle('is-selected', selected); tab.setAttribute('aria-pressed', String(selected)); });
  if (tabCopy) tabCopy.textContent = type === 'regular' ? 'Thực đơn gọi món gồm các món dùng chung, hải sản theo mùa và món đặt trước. Giá hải sản thời giá sẽ được Mỹ Yến xác nhận trực tiếp.' : 'Khám phá Dim Sum, mì & hủ tiếu, trà, cà phê, nước ép và thức uống. Hình ảnh chỉ mang tính minh họa; Mỹ Yến sẽ kiểm tra tình trạng món trước khi xác nhận.';
};

tabs.forEach(tab => tab.addEventListener('click', () => renderGallery(tab.dataset.menuTab)));
viewer.querySelector('.menu-viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.menu-viewer-previous').addEventListener('click', () => { activeMenuIndex -= 1; updateViewer(); });
viewer.querySelector('.menu-viewer-next').addEventListener('click', () => { activeMenuIndex += 1; updateViewer(); });
if (gallery) {
  renderGallery('regular');
  const category = new URLSearchParams(window.location.search).get('category');
  const target = categoryTargets[category];
  if (target) {
    const card = [...gallery.querySelectorAll('.menu-page-card')].find(item => item.querySelector('figcaption').textContent.includes(target));
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card?.classList.add('menu-page-card-highlight');
  }
}
