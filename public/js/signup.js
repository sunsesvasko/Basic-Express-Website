import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async(name, email, password, passwordConfirm) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });

        if(res.data.status === 'success') {
            showAlert('success', 'Registration is successful!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
    }
}