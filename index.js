import './styles/style.scss'
import './index.pug'
import './assets/fontawesome-free-5.15.1-web/css/all.min.css'
import data from './assets/data.json'


window.onload = () => {
    addItems();
}

function addItems(amount = 6) {
    let amountStart = 0;
    for (let i = amountStart; i < amount; i++) {
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
                            <b>${data[i].age}</b>
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
        amountStart++;
    }
}

sortByPrice.onclick = function() {
    data.sort( function (a, b) {
        if ( a.price < b.price) return 1;
        if ( a.price > b.price) return -1;
    })
    let item = document.querySelectorAll('.item');
    item.forEach(function(elem) {
        elem.parentNode.removeChild(elem);
    })
    addItems();
}

addMore.onclick = () => {
    addItems(20);
} 


