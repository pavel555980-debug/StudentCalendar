export function generate(document, location) {
    location.innerHTML = "";
    let _dayOfWeek = { "0": "Воскресенье", "1": "Понедельник", "2": "Вторник", "3": "Среда", "4": "Четверг", "5": "Пятница", "6": "Суббота" };
    let localData = JSON.parse(localStorage.getItem("data"));
    let req = new XMLHttpRequest();
    let params = `username=${encodeURIComponent(localData["username"])}&password=${encodeURIComponent(localData["password"])}`;
    req.open("GET", `http://127.0.0.1:8000/user/weekSchedule/daySchedules?${params}`);
    req.send();
    let response;
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            response = JSON.parse(req.responseText);
        }
        else {
            response = {};
        }
    }
    setTimeout(() => {
        for (let i = 0; i < 7; i++) {
            let day = document.createElement("div");
            day.classList.add("day");
            let dayInfo = document.createElement("div");
            dayInfo.classList.add("dayInfo");
            day.appendChild(dayInfo);
            let dayOfWeek = document.createElement("div");
            let btn = document.createElement("div");
            dayOfWeek.classList.add("dayOfWeek");
            dayOfWeek.textContent = `${_dayOfWeek[i]}`;
            day.dataset.dayOfWeek = i;
            btn.classList.add("addToScheduleBtn");
            btn.innerHTML = `+`;
            dayInfo.appendChild(dayOfWeek);
            dayInfo.appendChild(btn);
            location.appendChild(day);
            btn.dataset.day = i;
            btn.addEventListener("click", (e) => {
                let newSubject = prompt("Введите новый предмет");
                if (newSubject != "" && newSubject != null) {
                    let req = new XMLHttpRequest();
                    let params = `username=${encodeURIComponent(localData["username"])}&password=${encodeURIComponent(localData["password"])}`;
                    req.open("GET", `http://127.0.0.1:8000/user/weekSchedule/daySchedules?${params}`);
                    req.send();
                    req.onreadystatechange = function () {
                        let localData = JSON.parse(localStorage.getItem("data"));
                        if (req.readyState == 4 && req.status == 200) {
                            console.log(e.target, e.target.dataset);
                            let lastSchedule = JSON.parse(req.responseText)[e.target.dataset.day];
                            if (lastSchedule != undefined) {
                                let params = `username=${localData["username"]}&password=${localData["password"]}&dayofWeek=${e.target.dataset.day}&schedule=${encodeURIComponent(lastSchedule += `:${newSubject}`)}`;
                                let editReq = new XMLHttpRequest();
                                editReq.open("POST", `http://127.0.0.1:8000/user/weekSchedule/editDaySchedule?${params}`);
                                editReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                editReq.send();
                                setTimeout(() => generate(e.view.document, e.view.document.querySelector(".setting_frame")), 300);
                            }
                            else {
                                let editReq = new XMLHttpRequest();
                                console.log(e.target, e.target.dataset, newSubject, encodeURIComponent(newSubject));
                                let params = `username=${localData["username"]}&password=${localData["password"]}&dayofWeek=${e.target.dataset.day}&schedule=${encodeURIComponent(newSubject)}`;
                                editReq.open("POST", `http://127.0.0.1:8000/user/weekSchedule/editDaySchedule?${params}`);
                                editReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                editReq.send();
                                setTimeout(() => generate(e.view.document, e.view.document.querySelector(".setting_frame")), 300);
                            }
                        }
                        else if (req.readyState == 4 && req.status == 418) {
                            let editReq = new XMLHttpRequest();
                            console.log(e.target, e.target.dataset, newSubject, encodeURIComponent(newSubject));
                            let params = `username=${localData["username"]}&password=${localData["password"]}&dayofWeek=${e.target.dataset.day}&schedule=${encodeURIComponent(newSubject)}`;
                            editReq.open("POST", `http://127.0.0.1:8000/user/weekSchedule/editDaySchedule?${params}`);
                            editReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            editReq.send();
                            setTimeout(() => generate(e.view.document, e.view.document.querySelector(".setting_frame")), 300);
                        }

                    }
                }
            });
            if (response != undefined && response[i] != undefined && response[i] != "") {
                let data = response[i].split(":");
                let counter = 0;
                data.forEach(sSubject => {
                    let subject = document.createElement("div");
                    subject.dataset.number = counter;
                    subject.classList.add("subject");
                    subject.textContent = `• ${sSubject}`;
                    day.appendChild(subject);
                    counter += 1;
                    subject.addEventListener("click", (e) => {
                        let localData = JSON.parse(localStorage.getItem("data"));
                        let params = `username=${encodeURIComponent(localData["username"])}&password=${encodeURIComponent(localData["password"])}`;
                        req.open("GET", `http://127.0.0.1:8000/user/weekSchedule/daySchedules?${params}`);
                        req.send();
                        req.onreadystatechange = function () {
                            if (req.readyState == 4 && req.status == 200) {
                                let subs = JSON.parse(req.responseText)[e.target.parentElement.dataset.dayOfWeek].split(':');
                                let newSubs = "";
                                let counter = 0;
                                subs.forEach(sub => {
                                    if(counter!=e.target.dataset.number){
                                        newSubs+=`:${sub}`;
                                    }
                                    counter+=1;
                                });
                                let editReq = new XMLHttpRequest();
                                let params = `username=${localData["username"]}&password=${localData["password"]}&dayofWeek=${e.target.parentElement.dataset.dayOfWeek}&schedule=${encodeURIComponent(newSubs)}`;
                                editReq.open("POST", `http://127.0.0.1:8000/user/weekSchedule/editDaySchedule?${params}`);
                                editReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                editReq.send();
                                setTimeout(() => generate(e.view.document, e.view.document.querySelector(".setting_frame")), 300);
                            }
                        }
                    });
                });
            }
        }
    }, 300);
}