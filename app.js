const dishes={seafood:{title:"Hải sản tươi sống",copy:"Chọn hải sản theo mùa và cách chế biến: hấp kiểu Hong Kong, hấp tàu xì, xào tương XO, rang muối hoặc nướng."},banquet:{title:"Món tiệc đặc sắc",copy:"Vịt quay Bắc Kinh, gà, tôm, sò điệp, món tiềm và các món chia sẻ cho những bàn tiệc nhiều thế hệ."},family:{title:"Gia đình & trẻ nhỏ",copy:"Những món dễ chia sẻ cho cả bàn, cùng bánh bao tạo hình và các lựa chọn thân thiện với trẻ nhỏ."}};
document.querySelectorAll('[data-dish]').forEach(button=>button.addEventListener('click',()=>{const item=dishes[button.dataset.dish];document.querySelectorAll('[data-dish]').forEach(x=>x.classList.remove('active'));button.classList.add('active');document.querySelector('#dish-title').textContent=item.title;document.querySelector('#dish-copy').textContent=item.copy;}));
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');
if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});
const form=document.querySelector('#request-form');
const requestDate=form?.querySelector('[name="date"]');
if(requestDate){
  const today=new Date();
  const localDate=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  requestDate.min=localDate;
}
document.querySelectorAll('[data-request-type]').forEach(link=>link.addEventListener('click',()=>{
  if(!form)return;
  const select=form.querySelector('[name="type"]');
  if(select)select.value=link.dataset.requestType;
}));
if(form)form.addEventListener('submit',event=>{
  event.preventDefault();
  const status=document.querySelector('#form-status');
  if(form.elements.website&&form.elements.website.value)return;
  const endpoint=window.MYYEN_REQUEST_ENDPOINT;
  if(!endpoint){status.innerHTML='Đặt chỗ trực tuyến đang được hoàn thiện. Vui lòng <a href="https://zalo.me/0948900488" target="_blank" rel="noopener">nhắn Zalo</a>, gọi <a href="tel:+84948900488">0948 900 488</a>, hoặc email <a href="mailto:nhahangmyyen88@gmail.com">nhahangmyyen88@gmail.com</a>.';return;}
  const frame=document.createElement('iframe');frame.name='myyen-request-target';frame.hidden=true;document.body.appendChild(frame);
  form.target=frame.name;form.method='post';form.action=endpoint;form.submit();
  status.textContent='Mỹ Yến đã nhận yêu cầu của bạn. Đội ngũ sẽ kiểm tra chỗ trống và liên hệ xác nhận trong 30–60 phút trong giờ hoạt động.';
  form.reset();
});
