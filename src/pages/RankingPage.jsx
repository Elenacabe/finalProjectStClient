
import { Button } from "react-bootstrap"
import storyService from "../services/story.services"
import { useEffect, useState } from "react"
import RankCard from "../components/RankCard/RankCard"


const RankingPage = () => {
    const [storyList, setStoryList] = useState([])
    const [ranking, setRanking] = useState(false)
    useEffect(() => {
        list()
    }, [ranking])

    const list = () => {
        if (ranking == true) {
            getRatedStories()
        } else {
            getInteractiveStories()
        }
    }
    const getInteractiveStories = () => {
        storyService
            .getMostInteractedStories()
            .then(({ data }) => {
                setStoryList(data)

            })
            .catch((err) => console.log(err))
    }
    const getRatedStories = () => {
        storyService
            .getBetterRatedStories()
            .then(({ data }) => {
                setStoryList(data)
            })
    }

    const handleClick = () => {
        ranking ? setRanking(false) : setRanking(true)
    }

    return (
        <>
            <Button onClick={handleClick} className="buttonLike">{ranking ? 'Más interacciones' : 'Mejor Votadas'}</Button>
            <RankCard storyList={storyList} />
        </>
    )
}
export default RankingPage