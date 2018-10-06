
import axios from 'axios';

export function addUser(name) {
    return axios.post(`/users`, name);
}