import { useContext, useState } from "react"
import { Form, Col, Container } from "react-bootstrap"
import storyService from "../../services/story.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import uploadService from "../../services/upload.services"



const StoryForm = () => {
    const { loggedUser } = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    const [storyData, setStoryData] = useState({
        writer: loggedUser._id,
        title: '',
        story: '',
        cover: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setStoryData({ ...storyData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {

        e.preventDefault()

        storyService
            .createStory(storyData)
            .then(() => navigate('/'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadService
            .uploadimage(formData)
            .then(response => {
                setStoryData({ ...storyData, cover: response.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <Form className="customForm" onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="writer">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control disabled={true} type="text" value={loggedUser.username} name="writer" readOnly={true} />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" value={storyData.title} onChange={handleInputChange} name="title" className="custom-input" />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="cover">
                    <Form.Label>Portada</Form.Label>
                    <input type="file" onChange={handleFileUpload} name="cover" className="custom-input" />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="story">
                    <Form.Label>Relato</Form.Label>
                    <br />
                    <textarea name="story" id="" cols="73" rows="5" onChange={handleInputChange} value={storyData.story}></textarea>
                </Form.Group>
                <div className="d-grid" style={{ textAlign: 'center', color: 'orange' }}>
                    {errors.length > 0 && (
                        <div>
                            {errors.map((e, index) => (
                                <p key={index}>{e}</p>
                            ))}
                        </div>
                    )}
                </div>
                <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }}>
                    <button className="buttonLike" md={{ offset: 2 }} type="submit">Registrar historia</button>
                </Form.Group>
            </Form>
        </Container >
    )

}

export default StoryForm