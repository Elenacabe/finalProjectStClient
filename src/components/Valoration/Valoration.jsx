import storyService from "../../services/story.services"
import { useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useContext } from "react"
import "./Valoration.css"
import { Card, Row, Col } from "react-bootstrap"

function Valorations({ storyId, valorations }) {
    const [errors, setErrors] = useState([])
    const [average, setAverage] = useState(null)
    const [valoration, setValoration] = useState(valorations)
    const [newValoration, setNewValoration] = useState(valorations)
    const { loggedUser } = useContext(AuthContext)
    const [length, setLength] = useState(valorations.length)

    useEffect(() => {
        getValoration()
    }, [newValoration])

    const getValoration = () => {
        storyService
            .showValoration(storyId)
            .then(({ data }) => {
                if (!isNaN(data)) {
                    setAverage(data)
                }
            })
            .catch((err) => setErrors(err.response.data.errorMessages))
    }

    const newValorationHandler = (e) => {

        e.preventDefault()
        const selectedVal = e.target.value

        storyService
            .createValoration(storyId, selectedVal, loggedUser._id)
            .then((response) => {
                setNewValoration(response.data)
                setLength(length + 1)
                setValoration('')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (

        <Card className="valorationGroup">
            {!length && <p>Ningún voto</p>}
            {length == 1 && <p>{length} voto</p>}
            {length > 1 && <p>{length} votos</p>}
            <div className="d-grid" style={{ textAlign: 'center', color: 'orange' }}>
                {errors.length > 0 && (
                    <div>
                        {errors.map((e, index) => (
                            <p key={index}>{e}</p>
                        ))}
                    </div>
                )}
            </div>

            {average >= 1 && <p> {average} puntos </p>}

            <div className="btn-group" role="group" aria-label="Basic example">

                <button className="buttonVal" value={1} onClick={newValorationHandler}>⭐</button>
                <button className="buttonVal" value={2} onClick={newValorationHandler}>⭐</button>
                <button className="buttonVal" value={3} onClick={newValorationHandler}>⭐</button>
                <button className="buttonVal" value={4} onClick={newValorationHandler}>⭐</button>
                <button className="buttonVal" value={5} onClick={newValorationHandler}>⭐</button>

            </div>

        </Card >

    )
}
export default Valorations