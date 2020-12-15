'use strict'
//Переменные с html - элементами, а также некоторые применяемые здесь функции, находятся в файле popup-genres.js;
//let unlock - в popup-genres.js;
cartButton.addEventListener('click', function(e) {
  cartOpen(headerPopup);
});

buttonClose.addEventListener('click', function (e) {
  genresClose(headerPopup);
  cartClose(headerPopup);
});

if (buyButton) {
  buyButton.addEventListener('click', addToCart);
}

if (Object.keys(cart).length > 0) {
  cartButton.style.cursor = 'pointer';
}

if (buyButton) {
  Object.keys(cart).forEach(elem => {
    if (elem === buyButton.dataset.id) {
      styleBuyButtonActive(buyButton);
    }
  });
}

function cartOpen(popup) {
  if (unlock && !headerMenu.classList.contains('active') && Object.keys(cart).length > 0) {
    popup.classList.add('open');
    buttonClose.classList.add('show-cart')
    popupContentCart.classList.add('active');
    header.classList.add('active');
    popupContentGenres.style.display = 'none';
    bodyLock();

    popup.addEventListener('click', e => {
      if (!e.target.closest('.header__popup-content-cart')) {
        cartClose(e.target.closest('.header__popup'));
      }
    });
  }
}

function cartClose(popup) {
  if (unlock && !popupContentGenres.classList.contains('active')) {
    popup.classList.remove('open');
    buttonClose.classList.remove('show-cart');
    popupContentCart.classList.remove('active');
    header.classList.remove('active');
    popupContentGenres.style.display = 'block';
    bodyUnLock();
  }
}

function addToCart(e) {
  const gamesId = this.dataset.id;
  cartButton.style.cursor = 'pointer';

  if (!cart[gamesId]) {
    e.preventDefault();
    cart[gamesId] = 1;
    ajaxGetGameInfo();
    styleBuyButtonActive(this);
  }
}

function styleBuyButtonActive(buyButton) {
  buyButton.style.backgroundImage = 'linear-gradient(90deg, #ff4248 0, #ff783a)';
  buyButton.firstElementChild.textContent = 'в корзине';
  buyButton.href = '/order';
}

function styleBuyButtonDefault(buyButton) {
  if (buyButton) {
    buyButton.style.backgroundImage = '';
    buyButton.firstElementChild.textContent = 'в корзину';
    buyButton.removeAttribute('href');
  }
}

function removeToCart(e) {
  if (Object.keys(cart).length === 1) {
    cartClose(e.target.closest('.header__popup'));
    cartButton.style.cursor = 'default';
  }

  const id = this.dataset.id;
  delete cart[id];

  if (buyButton) {
    if (id === buyButton.dataset.id) {
      styleBuyButtonDefault(buyButton);
    }
  }
  ajaxGetGameInfo();
}

function showCart(data) {
  // let sum = 0;
  let headerItemWrap = '<div class="header__item-wrap">';

  for (let key in cart) {
    headerItemWrap += `<div class="header__cart-item">`;
    headerItemWrap += `<div class="header__cart-name"><a class="header__game-link" href="/game/${data[key]['title']}">${data[key]['title']}</a></div>`;
    headerItemWrap += `<div class="header__cart-price">${data[key]['price']} ₽</div>`;
    headerItemWrap += `<div class="header__cart-delete" data-id="${key}"></div>`;
    headerItemWrap += `</div>`;
    // sum += data[key]['price'];
  }
  headerItemWrap += `</div>`;

  document.querySelector('.header__item-body').innerHTML = headerItemWrap;
  // document.querySelector('.header__sum').textContent = `${sum} ₽`;
  showBadge();

  document.querySelectorAll('.header__cart-delete').forEach(elem => elem.addEventListener('click', removeToCart));
}

function showBadge() {
  if (Object.keys(cart).length === 0) {
    document.querySelector('.header__badge').textContent = '';
  } else {
    document.querySelector('.header__badge').textContent = Object.keys(cart).length;
  }
}










