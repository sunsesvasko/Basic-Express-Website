import { showAlert } from './alerts';
import { login, logout } from './login';
import { signup } from './signup';

const loginForm = document.querySelector('.form--login');
const logOutBttn = document.querySelector('#logout--btn');
const signUpForm = document.querySelector('.form--signup');

if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
    });
}

if(logOutBttn) {
    logOutBttn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

if(signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#pass').value;
        const passwordConfirm = document.querySelector('#passConfirm').value;
        signup(username, email, password, passwordConfirm);
    })
}