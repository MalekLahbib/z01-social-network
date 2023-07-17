import axios from "axios"

export const makeRequest = axios.create({
    baseURL: `http://${window.location.hostname}:8080`
    //withCredentials: true,
})

// axios.post = Create
// axios.get = Read
// axios.put = Update
// axios.delete = Delete