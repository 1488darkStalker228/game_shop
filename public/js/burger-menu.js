function toggleClasses() {
  document.querySelector('.header__burger').addEventListener('click', e => {
    document.querySelector('.header__burger').classList.toggle('active');
    document.querySelector('.header__menu').classList.toggle('active');
    document.body.classList.toggle('lock');
  });
}
toggleClasses();