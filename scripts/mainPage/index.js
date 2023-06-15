import { createTable } from "./createTable.js";

let _currDateObj = document.querySelector(".currDateContainer");
let _days = document.querySelectorAll(".day");
let _calendar = document.querySelector(".calendar");

createTable(_calendar);

let _dayOfWeek = { "0": "Воскресенье", "1": "Понедельник", "2": "Вторник", "3": "Среда", "4": "Четверг", "5": "Пятница", "6": "Суббота" };
let _month = { "0": "Январь", "1": "Февраль", "2": "Март", "3": "Апрель", "4": "Май", "5": "Июнь", "6": "Июль", "7": "Август", "8": "Сентябрь", "9": "Октябрь", "10": "Ноябрь", "11": "Декабрь" };

setInterval(() => {
    let _currDate = new Date();
    _currDateObj.innerHTML = `${_dayOfWeek[_currDate.getDay()]}, ${_currDate.getDate()}<br>${_month[_currDate.getMonth()]} ${_currDate.getFullYear()}
    <br>${_currDate.getHours()}:${_currDate.getMinutes()}:${_currDate.getSeconds()}`;
}, 0.1);

/*_days.forEach(element => {

});*/