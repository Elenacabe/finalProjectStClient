import { useContext, useState } from "react"
import { Form, Button, Col, Container } from "react-bootstrap"
import "./EditProfileForm.css"
import uploadService from "../../services/upload.services"
import profileService from "../../services/profile.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"


const EditProfileForm = () => {
    const [errors, setErrors] = useState([])

    const { loggedUser, authenticateUser } = useContext(AuthContext)
    const [editProfileData, setEditProfileData] = useState({
        avatar: loggedUser.avatar,
        about: loggedUser.about
    })


    const handleInputChange = e => {
        const { value, name } = e.target
        setEditProfileData({ ...editProfileData, [name]: value })
    }
    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault();

        profileService
            .editUser(loggedUser._id, editProfileData)
            .then(({ data }) => {
                console.log(data)

                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                navigate('/usuarios')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadService
            .uploadimage(formData)
            .then(response => {
                setEditProfileData({ ...editProfileData, avatar: response.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <Col>
                <Form className="custom-form" onSubmit={handleFormSubmit}>
                    <h1 className="orangeT"> Edita tu perfil:</h1>
                    <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }}>
                        <Form.Label>Avatar</Form.Label>
                        <input type="file" onChange={handleFileUpload} name="avatar" className="custom-input" />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="about">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" value={editProfileData.about} onChange={handleInputChange} name="about" className="custom-input" />
                    </Form.Group>
                    <div className="d-grid" style={{ textAlign: 'center', color: 'orange' }}>
                        {errors.length > 0 && (
                            <div>
                                {errors.map((e, index) => (
                                    <p key={index}>{e}</p>
                                ))}
                            </div>
                        )}
                        <Col md={{ offset: 3, span: 6 }}>
                            <button md={{ offset: 3, span: 3 }} className="buttonLike" type="submit">Editar</button>
                        </Col>
                    </div>
                </Form>
            </Col>
        </Container>
    )
}

export default EditProfileForm