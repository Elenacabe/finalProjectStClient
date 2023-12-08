import { useContext, useState } from "react"
import commentService from '../../services/comment.services'
import { AuthContext } from "../../contexts/auth.context"
import './Comments.css'
import { Link } from "react-router-dom"


function Comments({ storyId, comments }) {

    const [comment, setComment] = useState('')
    const [newComments, setComments] = useState(comments)
    const { loggedUser, isAdmin } = useContext(AuthContext)

    const onClickHandler = () => {
        commentService
            .createComment({ comment, author: loggedUser._id, storyId })
            .then(({ data }) => {
                setComments((comments) => [data, ...comments])
                setComment('')
            })
    }
    const handleDelete = (_id) => {

        console.log('El id-----------', _id)

        commentService
            .deleteComment(_id, storyId)
            .then(() => {
                setComments(comments => (comments.filter((e) => e._id != _id)))
            })
    }

    const onChangeHandler = (e) => {
        const { value } = e.target
        setComment(value)
    }

    return (
        <div className="main-container">
            <div className="comments-section">
                {
                    newComments.map((eachComment, index) => (
                        index % 2 ?
                            <div className="comment-container" key={eachComment._id}>{eachComment.comment}
                                <Link className="profile-button" to={`/usuarios/detalles/${eachComment.author}`}>Ver perfil</Link>
                                {isAdmin && <button onClick={() => handleDelete(eachComment._id)} className="delete-button">
                                    Borrar
                                </button>}
                            </div>
                            :
                            <div className="commentContainer" key={eachComment._id}>{eachComment.comment}
                                <Link className="profile-button" to={`/usuarios/detalles/${eachComment.author}`}> Ver perfil </Link>
                                {isAdmin && <button onClick={() => handleDelete(eachComment._id)} className="delete-button">
                                    Borrar
                                </button>}
                            </div>
                    ))
                }
            </div>
            <div className="comment-flexbox">
                <h3 className="comment-text orangeFlash">Comentario</h3>
                <textarea
                    value={comment}
                    onChange={onChangeHandler}
                    className="input-box"
                />
                <button onClick={onClickHandler} className="comment-button">
                    Subir
                </button>
            </div>
        </div>
    )
}

export default Comments