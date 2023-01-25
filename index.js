const header = {
    headers: {
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT',
        'Access-Control-Allow-Origin': '*'
    }
}

window.onload = () => {
    const clickIcon = document.getElementsByClassName("content-showerIcon");
    const categoryItem = document.getElementsByClassName("category__hidden__inner__item");
    const colorLetter = document.getElementsByClassName("category-list_letter");
    const hiddenBlock = document.getElementsByClassName("category__hidden__content");
    const searchTitle = document.getElementsByClassName('search__title')[0];
    const itemImages = document.getElementsByClassName('item__image');
    const searchInput = document.getElementsByClassName ('search__input')[0];
    const hiddenDropdown = document.getElementsByClassName ('search__dropdown')[0];
    const dropdownTexts = document.getElementsByClassName ('search__dropdown__text');

    searchInput.addEventListener('focus', ()=>{
       if (hiddenDropdown.classList.contains('hidden')){
        hiddenDropdown.classList.remove ('hidden')
       }
    
    })
    
   for(const text of dropdownTexts){
    text.addEventListener('click', ()=>{
            searchTitle.innerText= `All items for category ${text.innerText}`
            hiddenDropdown.classList.add ('hidden')
        })
    }
 

    for (let i = 0; i < clickIcon.length; i++) {
        clickIcon[i].addEventListener("click", () => {
            for (let j = 0; j < clickIcon.length; j++) {
                clickIcon[j].classList.remove("rotateArrow");
                hiddenBlock[j].classList.remove("show");
                colorLetter[j].classList.remove("clickColor");  
            }
            clickIcon[i].classList.toggle("rotateArrow");
            hiddenBlock[i].classList.toggle("show");
            colorLetter[i].classList.toggle("clickColor");  
        })
    }

    for (let i = 0; i < categoryItem.length; i++) {
        categoryItem[i].addEventListener('click', () => {
            showItemsByCategory(categoryItem[i], itemImages)
            searchTitle.innerText = `All items for category ${categoryItem[i].innerText}`
        })
    }

    // CORS
    // Обменивание ресурсов между сайтами. Безопастное обменивание.
};

// где classList - это класс, который содержит все массивы  

// Asynchronous functions (async / await)

async function showItemsByCategory (categoryItem, itemImages) {

    // Promise -> then(функция при успешном запросе, при неуспешном), catch(функция), finally(функция)
    // NO -> fetch().then().catch()
    // YES -> fetch() async / await

    const res = await (await fetch('https://fakestoreapi.com/products')).json();
    // 200, 300, 400, 500
    // 200 -> успешный запрос
    // 300 -> сайт либо переместили куда-то или удален
    // 400 -> ошибка со стороны пользователя
    // 500 -> ошибка со стороны сервера
    
    // Pending Promise (Pending, Fulfilled, Rejected, Settled)
    const selectedCategory = categoryItem.innerText === 'For men' ? "men's clothing" : "women's clothing"
    const filteredItems = res.filter(item => item.category === selectedCategory)
    filteredItems.forEach((element, index) => {
        itemImages[index].setAttribute('src', element.image);
    })
}

// 2 function -> обработку (не асинхронные)
// 1 function -> отвечает за сохранение данных каждые 10 секунд (async)
// 1 function -> отвечает за обновление данных каждые 10 секунд (async)

// NO ASYNC
// 1 -> 0sec
// 2 -> 0sec

// ASYNC
// 1 -> 0sec
// 2 -> 0sec

// 10 секунд -> 20 sec
// 0 секунд -> 10 sec