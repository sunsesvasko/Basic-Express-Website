import { showAlert } from './alerts';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';

const loginForm = document.querySelector('.form--login');
const logOutBttn = document.querySelector('#logout--btn');
const signUpForm = document.querySelector('.form--signup');
const updateMeForm = document.querySelector('.settings--form');

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

if(updateMeForm) {
    updateMeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // const dataObj = {
        //     name: document.querySelector('#username').value,
        //     email: document.querySelector('#email').value,
        //     photo: document.querySelector('#photo').files[0]
        // };
        // console.log(`index.js photo: ${document.querySelector('#photo').value}`);
        const form = new FormData();
        form.append('name', document.querySelector('#username').value);
        form.append('email', document.querySelector('#email').value);
        form.append('photo', document.querySelector('#photo').files[0]);

        document.querySelector('#save--settings').textContent = 'Updating...';
        updateSettings(form, 'data');
    })
}