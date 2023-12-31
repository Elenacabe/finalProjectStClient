import { Container } from "react-bootstrap"
import LogInForm from "../components/LogInForm/LogInForm"

const LogInPage = () => {
    return (
        <Container style={{ justifyContent: "center" }}>
            <h1 className="orangeT" style={{ textAlign: "center" }}>Accede:</h1>
            <LogInForm />
        </Container>

    )
}
export default LogInPage