'use strict'
const body = document.querySelector('body');
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__menu');
const main = document.querySelector('.main');
const genresButton = document.querySelector('.header__genres-button');
const headerPopup = document.querySelector('.header__popup');
const popupContentGenres = document.querySelector('.header__popup-content-genres');
const popupContentCart = document.querySelector('.header__popup-content-cart');
const cartButton = document.querySelector('.header__cart-button');
const buyButton = document.querySelector('.card__buy-button');
const buttonClose = document.querySelector('.header__button-close');

let unlock = true;

genresButton.addEventListener('click', function(e) {
  genresOpen(headerPopup);
  genresAccordeon(this.nextElementSibling);
});

function genresOpen(popup) {
  if (unlock && !headerMenu.classList.contains('active')) {
    popup.classList.add('open');
    buttonClose.classList.add('show-genres');
    popupContentGenres.classList.add('active');
    header.classList.add('active');
    popupContentCart.style.display = 'none';
    bodyLock();

    popup.addEventListener('click', e => {
      if (!e.target.closest('.header__popup-content-genres')) {
        genresClose(e.target.closest('.header__popup'));
      }
    });
  }
}

function genresClose(popup) {
  if (unlock && !popupContentCart.classList.contains('active')) {
    popup.classList.remove('open');
    buttonClose.classList.remove('show-genres');
    popupContentGenres.classList.remove('active');
    header.classList.remove('active');
    popupContentCart.style.display = 'block';
    bodyUnLock();
  }
}

function genresAccordeon(list) {
  if (headerMenu.classList.contains('active')) {
    genresButton.classList.toggle('active');

    if (list.classList.contains('show')) {
      list.classList.remove('show');
      list.style.maxHeight = 0;
    } else {
      list.classList.add('show');
      list.style.maxHeight = list.scrollHeight + 'px';
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
  body.style.paddingRight = lockPaddingValue;
  header.style.position = 'fixed';
  header.style.paddingRight = lockPaddingValue;
  main.style.marginTop = header.offsetHeight + 'px';
  body.classList.add('lock');
  //Нужно чтобы контрить частые нажатия;
  unlock = false;
  setTimeout(() => unlock = true, 500);
}

function bodyUnLock() {
  //Нужно, чтобы попап не дёргался;
  setTimeout(()=> {
    body.style.paddingRight = 0;
    header.style.position = 'relative';
    header.style.paddingRight = 0;
    main.style.marginTop = 0;
    body.classList.remove('lock');
  }, 500);

  unlock = false;
  setTimeout(() => unlock = true, 500);
}

function fixPositionPopup() {
  if (document.querySelector('.header__body').offsetWidth !== document.querySelector('.header__popup-body').offsetWidth) {
    popupContentGenres.style.right = 76 + 'px';
    popupContentCart.style.right = 10 + 'px';
  }
}
fixPositionPopup();

function getGenresList() {
  fetch('/get-genres-list', {
    method: 'POST'
  })
  .then(res => res.json())
  .then(body => {
    showGenresList(body);
  });
}
getGenresList();

function showGenresList(data) {
  for (let i = 0; i < data.length; i++) {
    const itmDrop = document.createElement('li');
    const itmAdapt = document.createElement('li');

    itmDrop.className = 'header__dropdown-item';
    itmDrop.innerHTML = `<a class="header__dropdown-link" href="/${data[i]['title_en']}/1">${data[i]['title']}</a>`;

    itmAdapt.className = 'header__item-adaptive';
    itmAdapt.innerHTML = `<a class="header__link-adaptive" href="/${data[i]['title_en']}/1">${data[i]['title']}</a>`;

    document.querySelector('.header__dropdown-list').append(itmDrop);
    document.querySelector('.header__list-adaptive').append(itmAdapt);
  }
}





// 'use strict'
// const body = document.querySelector('body');
// const header = document.querySelector('.header');
// const headerMenu = document.querySelector('.header__menu');
// const main = document.querySelector('.main');
// //Возможно, на удаление;
// const genresItem = document.querySelector('.genres');
//
// const genresButton = document.querySelector('.header__genres-button');
// const headerPopup = document.querySelector('.header__popup');
// const popupContentGenres = document.querySelector('.header__popup-content-genres');
// const popupContentCart = document.querySelector('.header__popup-content-cart');
// const cartButton = document.querySelector('.header__cart-button');
// const buyButton = document.querySelector('.card__buy-button');
// const buttonClose = document.querySelector('.header__button-close');
//
// let unlock = true;
//
// genresButton.addEventListener('click', function(e) {
//   genresOpen(headerPopup);
//   genresAccordeon(this.nextElementSibling);
// });
//
// function genresOpen(popup) {
//   if (unlock && !headerMenu.classList.contains('active')) {
//     popup.classList.add('open');
//     buttonClose.classList.add('show-genres');
//     popupContentGenres.classList.add('active');
//     header.classList.add('active');
//     popupContentCart.style.display = 'none';
//     bodyLock();
//
//     popup.addEventListener('click', e => {
//       if (!e.target.closest('.header__popup-content-genres')) {
//         genresClose(e.target.closest('.header__popup'));
//       }
//     });
//   }
// }
//
// function genresClose(popup) {
//   if (unlock && !popupContentCart.classList.contains('active')) {
//     popup.classList.remove('open');
//     buttonClose.classList.remove('show-genres');
//     popupContentGenres.classList.remove('active');
//     header.classList.remove('active');
//     popupContentCart.style.display = 'block';
//     bodyUnLock();
//   }
// }
//
// function genresAccordeon(list) {
//   if (headerMenu.classList.contains('active')) {
//     genresItem.classList.toggle('active');
//
//     if (list.classList.contains('show')) {
//       list.classList.remove('show');
//       list.style.maxHeight = 0;
//     } else {
//       list.classList.add('show');
//       list.style.maxHeight = list.scrollHeight + 'px';
//     }
//   }
// }
//
// function bodyLock() {
//   const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
//   body.style.paddingRight = lockPaddingValue;
//   header.style.position = 'fixed';
//   header.style.paddingRight = lockPaddingValue;
//   main.style.marginTop = header.offsetHeight + 'px';
//   body.classList.add('lock');
//   //Нужно чтобы контрить частые нажатия;
//   unlock = false;
//   setTimeout(() => unlock = true, 500);
// }
//
// function bodyUnLock() {
//   //Нужно, чтобы попап не дёргался;
//   setTimeout(()=> {
//     body.style.paddingRight = 0;
//     header.style.position = 'relative';
//     header.style.paddingRight = 0;
//     main.style.marginTop = 0;
//     body.classList.remove('lock');
//   }, 500);
//
//   unlock = false;
//   setTimeout(() => unlock = true, 500);
// }
//
// function fixPositionPopup() {
//   if (document.querySelector('.header__body').offsetWidth !== document.querySelector('.header__popup-body').offsetWidth) {
//     popupContentGenres.style.right = 76 + 'px';
//     popupContentCart.style.right = 10 + 'px';
//   }
// }
// fixPositionPopup();
//
// function getGenresList() {
//   fetch('/get-genres-list', {
//     method: 'POST'
//   })
//     .then(res => res.json())
//     .then(body => {
//       showGenresList(body);
//     });
// }
// getGenresList();
//
// function showGenresList(data) {
//   for (let i = 0; i < data.length; i++) {
//     const itmDrop = document.createElement('li');
//     const itmAdapt = document.createElement('li');
//
//     itmDrop.className = 'header__dropdown-item';
//     itmDrop.innerHTML = `<a class="header__dropdown-link" href="/${data[i]['title_en']}/1">${data[i]['title']}</a>`;
//
//     itmAdapt.className = 'header__item-adaptive';
//     itmAdapt.innerHTML = `<a class="header__link-adaptive" href="/${data[i]['title_en']}/1">${data[i]['title']}</a>`;
//
//     document.querySelector('.header__dropdown-list').append(itmDrop);
//     document.querySelector('.header__list-adaptive').append(itmAdapt);
//   }
// }





