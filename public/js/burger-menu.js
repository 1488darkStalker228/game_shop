'use strict'
document.querySelector('.header__burger').addEventListener('click', () => {
  if (cartButton.getAttribute('href')) {
    cartButton.removeAttribute('href');
  } else if (Object.keys(cart).length > 0) {
    cartButton.href = '/order';
  }
  burgerMenu();
});

function burgerMenu() {
  document.querySelector('.header__burger').classList.toggle('active');
  headerMenu.classList.toggle('active');
  document.body.classList.toggle('lock');
}

