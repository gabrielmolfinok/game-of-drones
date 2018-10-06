
import API from './../api'

export function addUser(user) {

    console.log(user);

    API.post(`api/users`, { user })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
}