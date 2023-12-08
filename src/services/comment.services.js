import axios from "axios";

class CommentService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/comments`
        })
    }
    createComment(comment) {
        return this.api.post('/newComment', comment)
    }

    deleteComment(_id, storyId) {
        console.log("-------------", storyId)
        return this.api.put(`/deleteComment/${_id}`, { storyId })
    }
}
const commentService = new CommentService()
export default commentService