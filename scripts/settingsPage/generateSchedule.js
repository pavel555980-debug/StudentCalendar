export function generate(document, location) {
    let _dayOfWeek = { "0": "Воскресенье", "1": "Понедельник", "2": "Вторник", "3": "Среда", "4": "Четверг", "5": "Пятница", "6": "Суббота" };
    for (let i = 0; i < 7; i++) {
        let dayOfWeek = document.createElement("div");
        let btn = document.createElement("div");
        dayOfWeek.classList.add("dayOfWeek");
        dayOfWeek.textContent = `${_dayOfWeek[i]}`;
        btn.textContent = `+`;
        location.appendChild(dayOfWeek);
    }
}