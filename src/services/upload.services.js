import axios from 'axios'

class UploadService {

    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/upload`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

const uploadService = new UploadService()

export default uploadService