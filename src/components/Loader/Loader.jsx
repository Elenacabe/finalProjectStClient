import { Spinner } from 'react-bootstrap'

const Loader = () => {

    return (
        <Spinner animation="border" role="status">
            <span className="sr-only"></span>
        </Spinner>
    )
}

export default Loader