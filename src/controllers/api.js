import axios from 'axios';

const baseUrl = process.env.baseURL || "http://localhost:8080"

export default axios.create({ baseURL: `${baseUrl}/api/` })