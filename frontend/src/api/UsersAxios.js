import axios from "axios"

const postAxiosUser = async (url, form) => {

    try {
        const res = await axios.post(`${url}`, form)
        return res
    } catch (error) {
        console.log(error)
    }

}

export {
    postAxiosUser
}