import { useContext, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap/'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context';



const Navigation = () => {
    const { loggedUser, logOut, isAdmin } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
        navigate("/")
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand >
                    <Link to="/" className="nav-item nav-link">LongStoryShort</Link>
                </Navbar.Brand>

                {
                    loggedUser && <NavItem>Hola {loggedUser.username}   </NavItem>
                }

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to="/microsRanking" className="nav-item nav-link">Rankings</NavLink>
                        {
                            loggedUser
                                ?
                                <>
                                    <NavLink to="/usuarios" className="nav-item nav-link">Comunidad</NavLink>
                                    <NavLink to="/crearMicrorrelato" className="nav-item nav-link" >Subir relato</NavLink>
                                    <NavDropdown title="Otras opciones" id="navbarScrollingDropdown">
                                        <NavDropdown.Item>
                                            <Link to={`/usuarios/detalles/${loggedUser._id}`}>Perfil</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to={`/misMicrorrelatos/${loggedUser._id}`}>Mis micros</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogOut}>
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </> :
                                <>
                                    <NavLink to="/signUp" className="nav-item nav-link">Registro</NavLink>
                                    <NavLink to="/logIn" className="nav-item nav-link">Acceso</NavLink>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {loggedUser && <NavItem> <Link to={`/usuarios/detalles/${loggedUser._id}`}><img src={loggedUser.avatar} alt="Avatar" className='userAvatar' ></img></Link></NavItem>}
        </Navbar >
    )

};

export default Navigation
