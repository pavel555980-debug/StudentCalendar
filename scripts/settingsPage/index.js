import { generate } from "./generateSchedule.js";

if (localStorage.getItem("data") != null){
    document.querySelector(".name").textContent = JSON.parse(localStorage.getItem("data"))["username"];
}

document.querySelector(".setting[data-setting=home]").addEventListener("click", ()=>{ window.location.replace("/index.html"); });

document.querySelector(".setting[data-setting=schedule]").addEventListener("click", ()=>{ generate(document, document.querySelector(".setting_frame")); });