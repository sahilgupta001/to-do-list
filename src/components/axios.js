import axios from "axios";
import { BACKEND_URL } from "./constants";

const customInstance = axios.create({
    baseURL: BACKEND_URL,
})

if (localStorage.getItem('token'))
    customInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token')

export default customInstance;