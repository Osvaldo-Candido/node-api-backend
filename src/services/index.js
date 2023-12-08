import axios from "axios";

export const app = axios.create({
    baseURL: 'http:\\localhsot:3000'
})