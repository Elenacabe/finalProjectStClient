import { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"
import "./LoginForm.css"

const LogInForm = () => {
    const [errors, setErrors] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)

    const handleFormSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then((response) => {
                localStorage.setItem('authToken', response.data.authToken)
                authenticateUser()
                navigate('/')

            })
            .catch((err) => setErrors(err.response.data.errorMessages))
    }


    return (
        <Form className="custom-form" style={{ marginLeft: '500px' }} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md={{ offset: 3, span: 6 }} controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" className="custom-input" />
            </Form.Group>

            <div className="d-grid" >
                {errors.length > 0 && (
                    <div>
                        {errors.map((e, index) => (
                            <p key={index} style={{ textAlign: 'center' }}>{e}</p>
                        ))}
                    </div>
                )}
                <Col md={{ offset: 3, span: 6 }}>
                    <Button md={{ offset: 3, span: 6 }} className="buttonLike" type="submit">Acceder</Button>
                </Col>
            </div>
        </Form>


    )

}

export default LogInForm