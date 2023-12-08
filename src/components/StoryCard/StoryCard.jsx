import './StoryCard.css'
import storyService from '../../services/story.services'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import { Col, Row } from 'react-bootstrap'


const StoryCard = () => {

    const [storyList, setStoryList] = useState([])

    useEffect(() => {
        getAllStories()
    }, [])

    const getAllStories = () => {
        storyService
            .getStoryList()
            .then(({ data }) => {
                setStoryList(data)

            })
            .catch(err => console.log(err))
    }


    return (
        <Row>
            {!storyList ?
                <Loader />
                :

                storyList.map((stories) => {
                    return (
                        <Col md={{ span: 3, offset: 1 }} key={stories._id}>
                            <div className='storyCard'>
                                <h1 className="textColor">{stories.title}</h1>
                                <p>{stories.story.slice(0, 65)}...</p>
                                <Link className="textColor" to={`/microrrelatos/detalles/${stories._id}`}>Detalles</Link>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}
export default StoryCard