import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 2000,
})

export { axiosInstance }
