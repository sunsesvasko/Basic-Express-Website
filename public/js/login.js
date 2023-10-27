import axios from 'axios';

export const login = async(email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email, 
                password
            }
        });

        if(res.data.status === 'success') {
            console.log('Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        };
    } catch(err) {
        console.log(err);
    }
}

export const logout = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/users/logout'
        });

        if(res.data.status === 'success') {
            console.log('Logged out successfully!');
            window.setTimeout(() => {
                location.reload();
            }, 1500);
        };
    } catch(err) {
        console.log(err);
    }
}