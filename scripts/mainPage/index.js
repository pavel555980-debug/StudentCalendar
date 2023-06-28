import { createTable, fillTable } from "./createTable.js";

let _currDateObj = document.querySelector(".currDateContainer");
let _days = document.querySelectorAll(".day");
let _calendar = document.querySelector(".calendar");


createTable(_calendar);


let _weekStart = new Date();
let _currMonthAdd = 0;
let _lastDate;
let _currDate = new Date();
let _dayOfWeek = { "0": "Воскресенье", "1": "Понедельник", "2": "Вторник", "3": "Среда", "4": "Четверг", "5": "Пятница", "6": "Суббота" };
let _month = { "0": "Январь", "1": "Февраль", "2": "Март", "3": "Апрель", "4": "Май", "5": "Июнь", "6": "Июль", "7": "Август", "8": "Сентябрь", "9": "Октябрь", "10": "Ноябрь", "11": "Декабрь" };
let _dayOfWeekNums = { "0": "6", "1": "0", "2": "1", "3": "2", "4": "3", "5": "4", "6": "5" }

function updateTable() {
    _weekStart.setDate(_currDate.getDate() - _dayOfWeekNums[_currDate.getDay()] - 1);
    let drawStart;
    if(_currMonthAdd == 0){
        drawStart = _weekStart;
    }
    else{
        drawStart = new Date();
        drawStart.setMonth(_weekStart.getMonth() + 1);
        drawStart.setDate(1);
    }
    //console.log(drawStart);
    document.querySelector(".month").textContent = _month[drawStart.getMonth()];
    fillTable(_calendar, drawStart);
}

_weekStart.setDate(_currDate.getDate() - _dayOfWeekNums[_currDate.getDay()] - 1);
fillTable(_calendar, _weekStart);
document.querySelector(".month").textContent = _month[_weekStart.getMonth()];

setInterval(() => {
    _lastDate = _currDate;
    _currDate = new Date();
    _currDateObj.innerHTML = 
    `${_dayOfWeek[_currDate.getDay()]}, ${(parseInt(_currDate.getDate() / 10) == 0) ? `0${_currDate.getDate()}` : _currDate.getDate()}
    <br>${_month[_currDate.getMonth()]} ${_currDate.getFullYear()}<br>
    ${(parseInt(_currDate.getHours() / 10) == 0) ? `0${_currDate.getHours()}` : _currDate.getHours()}:${(parseInt(_currDate.getMinutes() / 10) == 0) ? `0${_currDate.getMinutes()}` : _currDate.getMinutes()}:${(parseInt(_currDate.getSeconds() / 10) == 0) ? `0${_currDate.getSeconds()}` : _currDate.getSeconds()}`;
    if (_currDate.getDay() != _lastDate.getDay()){
        updateTable();
    }
}, 0.1);

//login button
document.querySelector(".loginBtn").addEventListener("click", ()=>window.location.replace("/login.html"))
document.querySelector(".settingBtn").addEventListener("click", ()=>window.location.replace("/settings.html"))

/*arrows
document.querySelector(".arrowUp").addEventListener("click", ()=>{

});
*/

if (localStorage.getItem("data") != null){
    document.querySelector(".profile").textContent = JSON.parse(localStorage.getItem("data"))["username"];
}

/*_days.forEach(element => {

});*/