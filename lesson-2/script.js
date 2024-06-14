'use strict';

const imgBox = document.querySelector('.img-box');
const backBtn = document.querySelector('.back-btn');
const forwardBtn = document.querySelector('.forward-btn');
const downNav = document.querySelector('.down-nav');

const arrayImgElements = [...imgBox.children]; // переводим в массив, чтобы получить доступ к его методам

forwardBtn.addEventListener('click', () => {
    const element = imgBox.querySelector('.img.checked'); //находим "выбранный элемент"
    element.classList.remove('checked'); // скрываем элемент
    element.classList?.remove('slide-left');
    element.classList?.remove('slide-right');
    const indexElement = arrayImgElements.indexOf(element); // находим индекс элемента, чтобы могли переключиться на следующий
    if (indexElement + 1 < arrayImgElements.length) {
        arrayImgElements[indexElement + 1].classList.add('checked', 'slide-left');
    } else {
        arrayImgElements[0].classList.add('checked', 'slide-left');
    }
});

backBtn.addEventListener('click', () => {
    const element = imgBox.querySelector('.img.checked');
    element.classList.remove('checked');
    element.classList?.remove('slide-left');
    element.classList?.remove('slide-right');
    const indexElement = arrayImgElements.indexOf(element);
    if (indexElement - 1 >= 0) {
        arrayImgElements[indexElement - 1].classList.add('checked', 'slide-right');
    } else {
        arrayImgElements[arrayImgElements.length - 1].classList.add('checked', 'slide-right');
    }
});

downNav.addEventListener('click', event => {

    if (event.target.classList.contains('down-nav-button')) {
        imgBox.querySelector('.img.checked').classList?.remove('slide-left');
        imgBox.querySelector('.img.checked').classList?.remove('slide-right');
        imgBox.querySelector('.img.checked').classList.remove('checked');
        arrayImgElements[[...downNav.children]
            .indexOf(event.target)].classList.add('checked');
    }
});