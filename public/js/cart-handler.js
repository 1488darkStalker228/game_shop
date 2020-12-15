'use strict'
let cart = {};

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
  ajaxGetGameInfo();
}

function ajaxGetGameInfo() {
  localStorageCart();
  fetch('/get-game-info', {
    method: 'POST',
    body: JSON.stringify({
      key: Object.keys(cart)
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(body => {
    if (document.querySelector('.header')) {
      showCart(body);
    } else {
      showCartInner(body);
    }
  });
}

function localStorageCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

