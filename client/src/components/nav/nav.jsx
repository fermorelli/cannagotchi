import './nav.css'
import { Link } from 'react-router-dom'
// import { useAuth } from '../../context/authContext'

export const Nav = ()=>{

    // const { user } = useAuth();

    return (
        <nav>
            <div className="links">
                <Link to={'/'}><span>Crud MERN Stack</span></Link>
                <Link to={'/login'}>Log in</Link>
                <Link to={'/signup'}>Sign up</Link>
                {/* {user ?
                    <> */}
                        <Link to={'/users'}>Users</Link>
                        <Link to={'/add-user'}>Add User</Link>
                    {/* </>
                : null} */}
            </div>
        </nav>
    )
}