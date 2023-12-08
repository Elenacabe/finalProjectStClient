import axios from "axios"

class StoryService {
    constructor() {

        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/stories`
        })
    }


    createStory(storyData) {
        return this.api.post('/newStory', storyData)
    }

    getStoryList() {
        return this.api.get('/getAllStories')
    }

    getMostInteractedStories() {
        return this.api.get('getInteractedStories')
    }

    getBetterRatedStories() {
        return this.api.get('getBetterRatedStories')
    }

    getAllMyStories(userId) {
        return this.api.get(`/allMyStories/${userId}`)
    }

    getDetails(_id) {
        return this.api.get(`/details/${_id}`)
    }

    deleteStory(_id) {
        return this.api.post(`/deleteStory/${_id}`)
    }

    createValoration(_id, vote, user_id) {
        return this.api.put(`/valorate/${_id}`, { vote, user_id })
    }

    showValoration(_id) {
        return this.api.get(`/showValoration/${_id}`)
    }

}


const storyService = new StoryService()

export default storyService