import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom'
import storyService from "../services/story.services"
import { Card, ListGroup, Col, Row, Container } from 'react-bootstrap'
import Comments from "../components/Comments/Comments"
import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"
import Valorations from "../components/Valoration/Valoration"


function StoryDetailsPage() {
    const { storyId } = useParams()
    const [storyDetails, setStoryDetails] = useState()
    const { loggedUser, isAdmin } = useContext(AuthContext)

    useEffect(() => {
        loadStoryDetails()
    }, [])

    const loadStoryDetails = () => {
        storyService
            .getDetails(storyId)
            .then(({ data }) => {
                setStoryDetails(data)
            })
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()

    const handleDelete = () => {
        storyService
            .deleteStory(storyDetails._id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }


    return (
        <>
            {
                storyDetails
                    ?
                    <Container>
                        <Row>
                            <Col md={{ span: 6 }}>
                                <Card className="detailsFlash">
                                    <Card.Img variant="top" style={{ maxHeight: '600px', maxWidth: '400px', margin: '0 auto' }} src={storyDetails.cover} />
                                    <Card.Body>
                                        <h1 className="orangeT">{storyDetails.title}</h1>
                                        <Card.Text>
                                            {storyDetails.story}

                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">

                                        <Valorations valorations={storyDetails.valoration} storyId={storyId} />

                                    </ListGroup>

                                    <Card.Body>
                                        {isAdmin || loggedUser._id == storyDetails.writer._id && <Link onClick={handleDelete} className="btn btn-outline-danger mr-2" style={{ margin: '20px' }} >Borrar</Link>}
                                        <Link className="orangeFlash" to={`/usuarios/detalles/${storyDetails.writer._id}`}>Conoce a {storyDetails.writer.username}</Link>
                                    </Card.Body>


                                </Card>
                            </Col>
                            <Col md={{ span: 4 }}>
                                <Comments comments={storyDetails.comments} storyId={storyId} />
                            </Col>

                        </ Row >
                    </Container> :
                    <Loader />
            }

        </>
    )
}
export default StoryDetailsPage