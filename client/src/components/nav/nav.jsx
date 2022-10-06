import './nav.css'
import { Link } from 'react-router-dom'

export const Nav = ()=>{
    return (
        <nav>
            <div className="links">
                <span>Crud MERN Stack</span>
                <Link to={'/'}>Home</Link>
                <Link to={'/add-user'}>Add User</Link>
            </div>
        </nav>
    )
}