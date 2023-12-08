import profileService from "../../services/profile.services"
import UserCard from "../UserCard/UserCard"
import { Row } from 'react-bootstrap'
import { useState, useEffect } from "react"
import Loader from "../Loader/Loader"

const UserList = () => {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        profileService
            .getList()
            .then(({ data }) => {
                setUserList(data)
            })
            .catch(err => console.log(err))
    }

    return (
        !userList ?
            <Loader />
            :
            <>
                <Row className="justify-content-md-center">
                    {
                        userList.map(u => <UserCard {...u} key={u._id}></UserCard>)
                    }
                </Row>
            </>
    )
}
export default UserList