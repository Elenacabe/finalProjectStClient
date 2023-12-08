import axios from 'axios'



class ProfileService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/profile`
        })
    }

    getList() {
        return this.api.get('/getAll')
    }

    getDetails(_id) {
        return this.api.get(`/getDetailsProfile/${_id}`)
    }

    editUser(_id, editProfileData) {
        return this.api.put(`/edit/${_id}`, editProfileData)
    }
    deleteUser(_id) {
        return this.api.post(`/delete/${_id}`)
    }



}

const profileService = new ProfileService()

export default profileService