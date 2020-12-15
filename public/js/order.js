'use strict'
const orderContent = document.querySelector('.order__content');

if (Object.keys(cart).length === 0) {
  orderContent.innerHTML = `<div class="order__empty">В корзине нет товаров</div>`;
}

function showCartInner(data) {
  let orderItemWrap = `<div class="order__item-wrap">`;
  let total = 0;
  //Эта проверка нужна, чтобы законтрить ошибку при полном удалении всех айтемов из корзины;
  if (document.querySelector('.order__item-body')) {
    for (let key in cart) {
      orderItemWrap += `<div class="order__item">`;
      orderItemWrap += `<div class="order__img"><img src="${data[key]['img']}"></div>`;
      orderItemWrap += `<div class="order__name"><a class="order__name-link" href="/game/${data[key]['title']}">${data[key]['title']}</a></div>`;

      orderItemWrap += `<div class="order__digit-fields">`;
      orderItemWrap += `<div class="order__button decrease" data-id="${key}">−</div>`;
      orderItemWrap += `<div class="order__current">${cart[key]}</div>`;
      orderItemWrap += `<div class="order__button increase" data-id="${key}">+</div>`;
      orderItemWrap += `</div>`;

      orderItemWrap += `<div class="order__total-item">${data[key]['price'] * cart[key]} ₽</div>`;
      orderItemWrap += `<div class="header__cart-delete" data-id="${key}"></div>`;
      orderItemWrap += `</div>`;

      total += cart[key] * data[key]['price'];
    }
    orderItemWrap += `<div class="order__total">Итого: ${total} ₽</div>`;
    orderItemWrap += `</div>`;

    document.querySelector('.order__item-body').innerHTML = orderItemWrap;

    document.querySelectorAll('.decrease').forEach(elem => elem.addEventListener('click', cartMinus));
    document.querySelectorAll('.increase').forEach(elem => elem.addEventListener('click', cartPlus));
    document.querySelectorAll('.header__cart-delete').forEach(elem => elem.addEventListener('click', removeToCartInner));
  }
}

function cartMinus() {
  if (cart[this.dataset.id] === 1) return;
  cart[this.dataset.id]--;
  ajaxGetGameInfo();
}

function cartPlus() {
  if (cart[this.dataset.id] === 5) return;
  cart[this.dataset.id]++;
  ajaxGetGameInfo();
}

function removeToCartInner() {
  if (Object.keys(cart).length === 1) {
    orderContent.innerHTML = `<div class="order__empty">В корзине нет товаров</div>`;
  }
  delete cart[this.dataset.id];
  ajaxGetGameInfo();
}

document.querySelector('#game-shop-form').addEventListener('submit', e => {
  e.preventDefault();

  const userName = document.querySelector('#user-name');
  const email = document.querySelector('#email');
  const checkBox = document.querySelector('#checkbox');

  if (userName.value.trim() === '') {
    Swal.fire(
      {
        title: 'Предупреждение!',
        text: 'Заполните все поля',
        confirmButtonText: 'Ok'
      }
    );
    return false;
  }

  fetch('/order-registration', {
    method: 'POST',
    body: JSON.stringify(
      {
        userName: userName.value.trim(),
        email: email.value.trim(),
        key: JSON.parse(localStorage.getItem('cart'))
      }
    ),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.text())
  .then(body => {
    if (body) {
      Swal.fire(
        {
          title: 'Заказ отправлен на почту',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      );
    }
  });

  userName.value = '';
  email.value = '';
  checkBox.checked = false;
});

// konstantin88178@gmail.com

