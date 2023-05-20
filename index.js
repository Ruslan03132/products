// Создание переменных для поиска, фильтрации товаров и их отображения

let filter = document.querySelector(".filter");
let rows = document.querySelectorAll("tbody tr");
let tableBody = document.querySelector("tbody");
let searchNames = document.querySelector("#search");

//Переменные для кнопки скролла наверх и отображения подсказки

let notFound = document.querySelector(".notFound");
let upButton = document.querySelector(".upButton");

// Для отладки
// console.log(filter); 
// console.log(rows);
// console.log(tableBody);
// console.log(searchNames);
// console.log(upButton);

// Добавляем обработчик событий на каждое изменение поля ввода, для фильтрации товаров по названию 
searchNames.oninput = function(){
    let found = false;
    // Пробегаемся по строкам таблицы циклом
    for (let row of [...rows]){ // используем оператор sphread для приведения NodeList к array
        let name = row.querySelector(".name").textContent.toLowerCase();  // достаем из строки имя товара и приводим к нижнему регистру
        if (name.includes(searchNames.value.toLowerCase())){ //Проверяем наличие введеной подстроки поиска в строке имени товара
            row.classList.remove("hidden"); // Если нашли, удаляем класс, скрывающий строку из DOM дерева
            found = true; // Если хотя бы 1 строка найдена, то скрываем подсказку
        } else {
            row.classList.add("hidden"); // Если не нашли, добавляем
        }

    }
    // Скрываем/отображаем кнопку в зависимости от найденных товаров
    if (found){
        notFound.classList.add("hidden");
    } else {
        notFound.classList.remove("hidden");
    }

}

// Добавляем обработчик событий на изменение селекта, для сортировки товаров по цене
filter.onchange = function(){
    // сортируем строки товаров и записываем результат в переменную
    let rowsSort = [...rows].sort((a, b) => {
        // создаем переменные для сортировки и присваиваем им соответствующие значения из строк
        let a_price = a.querySelector(".price").innerHTML.split(" ")[0];// разбиваем строку цены на массив из 2 строк и достаем первый элемент (отбрасываем рубли)
        let b_price = b.querySelector(".price").innerHTML.split(" ")[0];
        let a_id = a.querySelector(".id").innerHTML;
        let b_id = b.querySelector(".id").innerHTML;
        // сравниваем значение селекта с значениями option и возвращаем корректное значение для сортировки
        if (filter.value === "по умолчанию"){
            return a_id - b_id;
        } else if (filter.value === "по возрастанию"){
            return a_price - b_price;
        } else if (filter.value === "по убыванию") {
            return  b_price - a_price;
        }

    });

    // обнуляем тело таблицы
    tableBody.innerHTML = "";
    // заполняем тело таблицы отсортированными строками товаров
    for (let row of rowsSort){
        tableBody.appendChild(row);
    }

}
// Добавляем обработчик событий на скролл окна браузера
window.onscroll = function () {
    if (window.pageYOffset > 200) {
        upButton.classList.remove('hidden');
    } else {
        upButton.classList.add('hidden');
    }
  
  };
  
// Добавляем обработчик событий на кнопку для прокрутки в начало страницы  
upButton.onclick = function () {
    window.scrollTo(0, 0);
};
  
