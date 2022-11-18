import './nav.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

export const Nav = ()=>{

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logout();
        navigate('/')
    }

    return (
        <nav>
            <div className="links">
                <Link to={'/'}><span>Crud MERN Stack</span></Link>
                <Link to={'/'}>Home</Link>
                {user ?
                    <>
                        <Link to={'/users'}>Users</Link>
                        <Link to={'/add-user'}>Add User</Link>
                        <span onClick={handleLogOut} id='logout'>Log out</span>
                    </>
                :
                    <>
                        <Link to={'/login'}>Log in</Link>
                        <Link to={'/signup'}>Sign up</Link>
                    </>}
            </div>
        </nav>
    )
}