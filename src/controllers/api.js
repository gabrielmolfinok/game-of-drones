import axios from 'axios';

const URI = process.env.URI || 'http://localhost:8080'

console.log(URI)

export default axios.create({ baseURL: `${URI}/api/` })