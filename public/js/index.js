import { showAlert } from './alerts';
import { login, logout } from './login';

const loginForm = document.querySelector('.form--login');
const logOutBttn = document.querySelector('#logout--btn');

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