'use strict'
const prev = document.querySelector('.main-slider__btn-prev');
const next = document.querySelector('.main-slider__btn-next');
const slides = document.querySelectorAll('.main-slider__slide');
const track = document.querySelector('.main-slider__track');
const wrapper = document.querySelector('.main-slider__wrapper');
const dots = document.querySelectorAll('.main-slider__dot');

let position = 0;
let click = true;

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

function prevSlide() {
  if (click) {
    if (position === 0) {
      position -= wrapper.clientWidth * (slides.length - 1);
      activeDot(calcIndex());
      setPosition();
    } else {
      position += wrapper.clientWidth;
      activeDot(calcIndex());
      setPosition();
    }
    click = false;
    setTimeout(() => click = true, 500);
  }
}

function nextSlide() {
  if (click) {
    if (position === -(wrapper.clientWidth * (slides.length - 1))) {
      position = 0;
      activeDot(calcIndex());
      setPosition();
    } else {
      position -= wrapper.clientWidth;
      activeDot(calcIndex());
      setPosition();
    }
    click = false;
    setTimeout(() => click = true, 500);
  }
}

function activeDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function setPosition () {
  track.style.transform = `translateX(${position}px)`;
}

function calcIndex() {
  return Math.abs(position / wrapper.clientWidth);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    position = -(wrapper.clientWidth * index);
    setPosition();
    activeDot(index);
  });
});

document.querySelector('.main-text__span').addEventListener('click', function(e) {
  const hiddenContent = this.nextElementSibling;
  this.classList.toggle('active');

  if (hiddenContent.classList.contains('show')) {
    hiddenContent.classList.remove('show');
    hiddenContent.style.maxHeight = 0;
    this.textContent = 'Читать далее';
  } else {
    hiddenContent.classList.add('show');
    hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
    this.textContent = 'Скрыть';
  }
});




