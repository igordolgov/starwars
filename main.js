// 'use strict';

let searchPerson = document.querySelector("#person_search_input");
let search_results = document.querySelector(".search_result");
let searchBtn = document.querySelector("#search_request_btn");

findPerson();

function findPerson() {
  searchBtn.addEventListener("click", function() {
    // Сохраняем адрес API в переменную
    let api = "https://swapi.dev/api/";
    // Формируем полный адрес запроса:
    let url = api + "people/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation
    url += searchPerson.value; // значение переменной запроса search
    searchPerson.value = "";
    // Таким образом формируется строка вида:
    // https://swapi.dev/api/people/?search=obi
    // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
    let request = new XMLHttpRequest();
    // Назначаем обработчик события load для запроса
    request.addEventListener("load", function() {
    // отображаем в консоли текст ответа сервера
    console.log(request.response);
    // парсим его из JSON-строки в JavaScript-объект
    let response = JSON.parse(request.response);
    console.log(response);
    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или не подходят
    if (request.status !== 200) {
        alert("Произошла ошибка при получении ответа от сервера:\n\n" +
            response.message);
        return;
    }
    // Проверяем, если поле имя в ответе на запрос
    if (response.count == 0) {
        alert("К сожалению, данные не получены по запросу: " + url);
        return;
    }
    // Если все в порядке, то отображаем количество результатов поиска
    // alert("Найдено персонажей:" + response.count);
    results(response);
    });
    // Обработчик готов, можно отправлять запрос
    // Открываем соединение и отправляем
    request.open("get", url);
    request.send();
  });
}
//добавляем результаты
function results(response) {
  // Очищаем предыдущие результаты
  search_results.innerHTML = "";
  let nameResults = response.results;
  // Добавляем персонажей
  for (i = 0; i < nameResults.length; i++) {
    let li = document.createElement("li");
    //Создаем элемент списка
    li.innerHTML = nameResults[i].name;
    search_results.appendChild(li);
    // Создаем массив для данных персонажей
    let result = [];
    result.push(nameResults[i]);
    // Показ данных персонажа
    li.addEventListener("click", function(ev) {
      let target = ev.target;
      if (target.tagName === "LI") {
        for (i = 0; i < result.length; i++) {
          document.getElementById("name").innerHTML = result[i].name;
          document.getElementById("height").innerHTML = result[i].height;
          document.getElementById("mass").innerHTML = result[i].mass;
          document.getElementById("birth_year").innerHTML = result[i].birth_year;
          document.getElementById("films_count").innerHTML = +result[i].films.length;
        }
      }
    });
  };
};
