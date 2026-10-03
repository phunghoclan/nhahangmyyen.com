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
