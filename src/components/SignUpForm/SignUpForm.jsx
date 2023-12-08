import { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
// import "./SignUpForm.css"
import uploadService from "../../services/upload.services"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"


const SignUpForm = () => {
    const [errors, setErrors] = useState([])
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        birthDate: '',
        avatar: '',
        about: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }
    const handleFileUpload = e => {

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadService
            .uploadimage(formData)
            .then(response => {
                setSignupData({ ...signupData, avatar: response.data.cloudinary_url })
            })
            .catch((err) => console.log(err))
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/'))
            .catch((err) => setErrors(err.response.data.errorMessages))
    }


    return (
        <Form style={{ marginLeft: '120px' }} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" className="custom-input" />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <input type="file" onChange={handleFileUpload} name="avatar" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="birthDate">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" value={signupData.birthDate} onChange={handleInputChange} name="birthDate" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="about">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={signupData.about} onChange={handleInputChange} name="about" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" className="custom-input" />
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
                    <Button md={{ offset: 3, span: 3 }} className="buttonLike" type="submit">Registrarme</Button>
                </Col>
            </div>

        </Form >

    )

}

export default SignUpForm