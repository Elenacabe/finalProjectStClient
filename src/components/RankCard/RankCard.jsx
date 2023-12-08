import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './RankCard.css'

const RankCard = ({ storyList }) => {
    return (

        <Container>
            <Row className='justify-content-center text-center'>
                {
                    storyList.map((storySort) => {
                        return (
                            <Col md={6} key={storySort._id}>
                                <div className='rank'>
                                    <p className='title'>Título:</p>
                                    <Link className='linkedTitle' to={`/microrrelatos/detalles/${storySort._id}`}>{storySort.title}</Link>
                                    <p >{storySort.story}</p>
                                    <hr />
                                    <span>Escrita por <Link to={`/usuarios/detalles/${storySort.writer._id}`}> {storySort.writer.username}</Link></span>
                                </div>
                            </Col>)
                    })
                }
            </Row>
        </Container>
    )
}
export default RankCard