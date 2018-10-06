
import API from './../api'

export function getUsers() {

    API.get(`api/users`)
                .then(res => {
                    console.log('GET Users: ', res);
                })
                .catch(err => {
                    console.log(err);
                })
}


export function addUser(user) {

    API.post(`api/users`, { user })
                .then(res => {
                    console.log('POST User: ', res);
                })
                .catch(err => {
                    console.log(err);
                })
}