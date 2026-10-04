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
    ['Dim Sum & bánh bao', 'character-buns'], ['Mì & hủ tiếu', 'egg-tarts'], ['Đồ uống', 'character-buns']
  ]
};

const gallery = document.querySelector('#menu-gallery');
const tabs = [...document.querySelectorAll('[data-menu-tab]')];
const tabCopy = document.querySelector('#menu-gallery-copy');
const imagePath = (type, image) => type === 'dimsum' ? `assets/${image}.jpg` : `assets/menu/${type}/${image}.JPEG`;

const renderGallery = type => {
  if (!gallery) return;
  gallery.innerHTML = menuImages[type].map(([title, image]) => `<figure class="menu-page-card"><img loading="lazy" src="${imagePath(type, image)}" alt="Trang thực đơn ${title} của Nhà Hàng Mỹ Yến"><figcaption>${title}</figcaption></figure>`).join('');
  tabs.forEach(tab => { const selected = tab.dataset.menuTab === type; tab.classList.toggle('is-selected', selected); tab.setAttribute('aria-pressed', String(selected)); });
  if (tabCopy) tabCopy.textContent = type === 'regular' ? 'Thực đơn gọi món gồm các món dùng chung, hải sản theo mùa và món đặt trước. Giá hải sản thời giá sẽ được Mỹ Yến xác nhận trực tiếp.' : 'Chọn món Dim Sum, mì hoặc thức uống bạn quan tâm. Mỹ Yến sẽ kiểm tra tình trạng món trước khi xác nhận.';
};

tabs.forEach(tab => tab.addEventListener('click', () => renderGallery(tab.dataset.menuTab)));
if (gallery) renderGallery('regular');
