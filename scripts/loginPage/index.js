import { getRandom } from '../someStuff.js';
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
                    //do some stuff
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
            //do some stuff
            window.location.replace("/index.html");
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