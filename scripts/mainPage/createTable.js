let _dayOfWeek = { "0": "Воскресенье", "1": "Понедельник", "2": "Вторник", "3": "Среда", "4": "Четверг", "5": "Пятница", "6": "Суббота" };

export function createTable(table) {
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("div");
            cell.className = `cell day${i == 0 ? " firstRow" : ""}${j == 0 ? " firstCell" : ""}`;
            cell.dataset.serialNumber = i*7 + j + 1;
            cell.dataset.dayOfWeek = j + 1;
            row.appendChild(cell);
            let cellContainer = document.createElement("div");
            cellContainer.className = "cellContainer";
            cell.appendChild(cellContainer);
        }
        table.appendChild(row);
    }
}

export function fillTable(table, date) {
    let counter = 0
    table.querySelectorAll(".day").forEach(cell => {
        let cellContainer = cell.querySelector(".cellContainer");
        counter+=1;
        let cellDate = new Date();
        cellDate.setDate(date.getDate() + counter);
        if (cellDate.getMonth() != date.getMonth()){
            cell.classList.add("nextMonthCell");
        }
        if (cellDate.getDay() == 0 || cellDate.getDay() == 6){
            cell.classList.add("weekend");
        }
        if (cellDate.getTime() == new Date().getTime()){
            cell.classList.add("currDay");
        }
        //console.log(counter);
        cellContainer.innerHTML = `
            ${cellDate.getDate()}
        `;
        });
}

export function addSubjects(table, subjects){
    let dayOfWeek = {'1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '0'};
    document.querySelectorAll(".subject").forEach((sub)=>{
        sub.remove()
    })
    table.querySelectorAll(".day").forEach(cell => {
        if (subjects[dayOfWeek[cell.dataset.dayOfWeek]] != undefined){
            subjects[dayOfWeek[cell.dataset.dayOfWeek]].split(":").forEach(subject=>{
                let subDiv = document.createElement("div");
                subDiv.classList.add("subject");
                subDiv.textContent = subject;
                cell.appendChild(subDiv);
            });
        }
    });
    console.log(1);
}