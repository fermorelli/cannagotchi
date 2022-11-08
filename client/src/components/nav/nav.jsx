import './nav.css'
import { Link } from 'react-router-dom'

export const Nav = ()=>{
    return (
        <nav>
            <div className="links">
                <Link to={'/'}><span>Crud MERN Stack</span></Link>
                <Link to={'/login'}>Log in</Link>
                <Link to={'/signup'}>Sign up</Link>
                <Link to={'/users'}>Users</Link>
                <Link to={'/add-user'}>Add User</Link>
            </div>
        </nav>
    )
}