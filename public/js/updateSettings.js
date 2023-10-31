import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'data' or 'password
export const updateSettings = async(data, type) => {
    try {
        const endPoint = type === 'data' ? 'updateMe' : 'updateMyPassword';
        const res = await axios({
            method: 'PATCH',
            url: `/api/users/${endPoint}`,
            data,
        });
        console.log([...data])

        if(res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} Updated Successfully!`);
            window.setTimeout(() => {
                // location.reload(true);
            }, 1500)
        }
    } catch(err) {
        showAlert('err', err.response.data.message);
    }
}