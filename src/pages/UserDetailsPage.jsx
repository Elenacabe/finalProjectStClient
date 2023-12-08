import { useEffect, useState, useContext } from "react"
import { Link, useParams } from 'react-router-dom'
import profileService from "../services/profile.services"
import { Card, Row, Col, Container } from 'react-bootstrap'
import Loader from "../components/Loader/Loader"
import StoriesWritten from "../components/StoriesWritten/StoriesWritten"
import EditProfileForm from "../components/EditProfileForm/EditProfileForm"
import { AuthContext } from "../contexts/auth.context"


function UserDetailsPage() {
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState()
    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadProfileDetails()
    }, [])

    const loadProfileDetails = () => {
        profileService
            .getDetails(userId)
            .then(({ data }) => {
                setUserDetails(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                userDetails
                    ?
                    <Container>
                        <Row >
                            <Col md={{ span: 2, offset: 1 }} >
                                <Card style={{ width: '18rem', marginTop: '30px' }}>
                                    <Card.Img variant="top" src={userDetails.avatar} />
                                    <Card.Body>
                                        <Card><h1 style={{ color: 'orange', textAlign: 'center' }}>{userDetails.username}</h1></Card>
                                        <Card.Text>
                                            {userDetails.about}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Link className='orangeT' to="/usuarios">Volver</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {loggedUser._id != userDetails._id && <Col md={{ span: 4, offset: 2 }}><StoriesWritten _id={userDetails._id} /></Col>}
                            <Col md={{ span: 1 }} >
                                {loggedUser._id == userDetails._id && <EditProfileForm />}
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Loader />
            }

        </>
    )
}
export default UserDetailsPage