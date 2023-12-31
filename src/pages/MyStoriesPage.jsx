import { Container } from "react-bootstrap"
import MyStoriesCard from "../components/MyStoriesCard/MyStoriesCard"
const MyStoriesPage = () => {
    return (

        <Container>
            <h1 className="orangeT" style={{ margin: '30px' }}>Estos son tus microrrelatos</h1>
            <MyStoriesCard />
        </Container>
    )
}
export default MyStoriesPage