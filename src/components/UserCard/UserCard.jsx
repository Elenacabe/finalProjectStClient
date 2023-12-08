import { Card, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useEffect } from "react"
import profileService from "../../services/profile.services"
import { useNavigate } from "react-router-dom"
import './UserCard.css'


const UserCard = ({ username, avatar, about, _id }) => {

    const { loggedUser, isAdmin } = useContext(AuthContext)
    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)

    const handleDelete = () => {

        profileService
            .deleteUser(_id)
            .then(() => {
                if (isAdmin && loggedUser._id !== _id) {
                    navigate('/')
                } else {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }




    return (
        <>
            <div style={{ width: '18rem', margin: '20px' }} className=" eachElemento">
                <Col>
                    <Card.Img variant="top" src={avatar} />
                    <Card.Body className="userCard">
                        <h1 className="textColor">{username}</h1>
                        <Card.Text>
                            {about}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Link to={`/usuarios/detalles/${_id}`} className="btn btn-outline-success mr-2">Detalles</Link>
                            {
                                isAdmin && { _id } != loggedUser._id
                                && <Link onClick={handleDelete} className="btn btn-outline-danger mr-2" style={{ margin: '20px' }} >Borrar</Link>

                            }
                        </Card.Subtitle>
                    </Card.Body>
                </Col>
            </div >
        </>)
}
export default UserCard