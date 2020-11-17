import './styles/style.scss'
import './index.pug'
import './assets/fontawesome-free-5.15.1-web/css/all.min.css'
import data from './assets/data.json'

let amountStart = 0;
let topBtn = document.querySelector('.scrollTop');
window.addEventListener('scroll', trackScroll);
topBtn.addEventListener('click', scrollTop);

function trackScroll() {
    let scrolled = window.pageYOffset;
    let currentView = document.documentElement.clientHeight;
    if (scrolled > currentView) {
      topBtn.classList.add('scrollTop_show');
    }
    if (scrolled < currentView) {
      topBtn.classList.remove('scrollTop_show');
    }
}

function scrollTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -20);
      setTimeout(scrollTop, 0);
    }
}

window.onload = () => {
    loadAllCats();
    addItems();
}







function loadAllCats() {
    mainTitle.insertAdjacentHTML('beforeend', `<h1>Найдено ${data.length} котов</h1>`)
}


function addItems(amount = 6, sort = false) {

    if (sort) {
        amountStart = 0;
    };

    if (amountStart + amount > data.length) {
        createError('Товары закончились');
        return
    }
    
    for (let i = amountStart; i < (amountStart + amount); i++) {
        catalog.insertAdjacentHTML('beforeend', `
        <div class="item">
            <div class="item__content">
                <div class="item__photo">
                    <img src="/assets/images/cats/${data[i].imgSrc}.png">
                    <div class="item__photo__sale">
                        <span>-${data[i].sale}%</span>
                    </div>
                    <div class="item__photo__like"></div>
                </div>
                <div class="item__content__wrapper">
                    <span class="item__content__title">${data[i].title}</span>
                    <div class="item__content__description">
                        <span class="color">${data[i].color}<br>окрас</span>
                        <span class="age">
                            <b>${data[i].age} мес.</b>
                            <br>
                            Возраст
                        </span> 
                        <span class="paw">
                            <b>${data[i].paw}</b>
                            <br>
                            Кол-во лап
                        </span>
                    </div>
                    <span class="item__content__price">${data[i].price} руб.</span>
                </div
            </div>
            
            <div class="item__button">
                <span>Купить</span>
            </div>
        </div>
        `)
        if (data[i].sale) {
            catalog.lastElementChild.classList.add('sale')
        }
        if (data[i].like) {
            catalog.lastElementChild.classList.add('like')
        }
        if (data[i].soldOut)  {
            catalog.lastElementChild.querySelector('.item__button > span').innerHTML = 'Продано';
            catalog.lastElementChild.querySelector('.item__button').classList.add('item__button_soldOut');
        }
        catalog.lastElementChild.querySelector('.item__photo__like').addEventListener('click', addBucked);
        
    }
    amountStart += amount;
    
}

sortByPrice.onclick = function() {
    data.sort( function (a, b) {
        if ( a.price > b.price) return 1;
        if ( a.price < b.price) return -1;
    })    
    
    let item = document.querySelectorAll('.item');
    item.forEach(function(elem) {
        elem.parentNode.removeChild(elem);
    })
    addItems(6, true);
}

sortByAge.onclick = function() {
    data.sort( function (a, b) {
        if ( a.price > b.price) return 1;
        if ( a.price < b.price) return -1;
    })    
    
    let item = document.querySelectorAll('.item');
    item.forEach(function(elem) {
        elem.parentNode.removeChild(elem);
    })
    addItems(6, true);
}

addMore.onclick = () => {
    addItems(20);
}

function addBucked() {
    let notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerHTML = 'Товар добавлен в корзину';
    document.body.append(notif);
    setTimeout(() => {
        document.body.removeChild(notif);
    }, 1500);
}


let form = document.querySelector('#form');
let submit = form.querySelector('#submit');
let email = form.querySelector('#email');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!email.value) {
        createError('Поле не может быть пустым')
    }
})

function createError(message) {
    let error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = message;
    document.body.append(error);
    setTimeout( () => {
        document.body.removeChild(error);
    }, 2000)
}


