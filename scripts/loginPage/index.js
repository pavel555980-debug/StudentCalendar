import { getRandom, getCookie } from '../someStuff.js';
if (parseInt(getRandom(0, 20)) == 1) {
    document.title = "Вход - ЯКалендарь переверну и снова 3 сентября";
    console.log("Пасхалочка");
}

let _loginBtn = document.querySelector(".login");
let _registerBtn = document.querySelector(".register");


_registerBtn.addEventListener("click", (e) => {
    if (_registerBtn.dataset.active == '0') {
        _loginBtn.style.display = "none";
        document.querySelector(".loginBtns").style.justifyContent = "center";
        document.querySelector(".repeatPasswordForm").style.display = "block";
        _registerBtn.dataset.active = "1";
    }
    else {
        let loginInput = document.querySelector(".loginInput");
        if (!loginInput.value == '') {
            let passwordInput = document.querySelector(".passwordInput");
            if (!passwordInput.value == '') {
                let repeatPasswordInput = document.querySelector(".repeatPassword");
                if (repeatPasswordInput.value == passwordInput.value) {
                    let req = new XMLHttpRequest();
                    req.open("POST", "http://127.0.0.1:8000/createUser");
                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    req.send(`username=${loginInput.value}&password=${passwordInput.value}`, true);
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            let response = JSON.parse(req.responseText);
                            //document.cookie = "data={}; domain=127.0.0.1:5500; path=/; max-age=-1;";
                            localStorage.setItem("data", `{"username":"${loginInput.value}", "password":"${passwordInput.value}", "userId":"${response["userId"]}", "scheduleID":"${response["scheduleID"]}"}`);
                            window.location.replace("/index.html");

                        }
                        else if (req.readyState == 4 && req.status == 403) {
                            document.querySelector(".errors").style.display = "inline-block";
                            document.querySelector(".errors").textContent = "Такой пользователь уже существует"
                        }
                    }
                    document.querySelector(".errors").style.display = "none";
                    window.location.replace("/index.html");
                }
                else {
                    document.querySelector(".errors").style.display = "inline-block";
                    document.querySelector(".errors").textContent = "Пароли не совпадают"
                }
            }
            else {
                document.querySelector(".errors").style.display = "inline-block";
                document.querySelector(".errors").textContent = "Введите пароль"
            }
        }
        else {
            document.querySelector(".errors").style.display = "inline-block";
            document.querySelector(".errors").textContent = "Введите логин"
        }
    }
})

_loginBtn.addEventListener("click", () => {
    let loginInput = document.querySelector(".loginInput");
    if (!loginInput.value == '') {
        let passwordInput = document.querySelector(".passwordInput");
        if (!passwordInput.value == '') {
            document.querySelector(".errors").style.display = "none";
            let req = new XMLHttpRequest();
            req.open("POST", "http://127.0.0.1:8000/login");
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.send(`username=${loginInput.value}&password=${passwordInput.value}`, true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    let response = JSON.parse(req.responseText);
                    //document.cookie = "data={}; domain=127.0.0.1:5500; path=/; max-age=-1;";
                    localStorage.setItem("data", `{"username":"${loginInput.value}", "password":"${passwordInput.value}", "userId":"${response["userId"]}", "scheduleID":"${response["scheduleID"]}"}`);
                    window.location.replace("/index.html");

                }
                else if (req.readyState == 4 && req.status == 401) {
                    document.querySelector(".errors").style.display = "inline-block";
                    document.querySelector(".errors").textContent = "Неправильный логин или пароль"
                }
            }
        }
        else {
            document.querySelector(".errors").style.display = "inline-block";
            document.querySelector(".errors").textContent = "Введите пароль"
        }
    }
    else {
        document.querySelector(".errors").style.display = "inline-block";
        document.querySelector(".errors").textContent = "Введите логин"
    }
})