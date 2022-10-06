import './adduser.css'

export const AddUser = ()=> {
    return (
        <div className="all">
            <div className="title">
                <h2>Crear un nuevo usario</h2>
            </div>
            <div className="form">
                <form action="">
                    <label htmlFor="">First Name</label>
                    <input type="text" />
                    <label htmlFor="">Last Name</label>
                    <input type="text" />
                    <label htmlFor="">Email</label>
                    <input type="mail" />
                    <label htmlFor="">Password</label>
                    <input type="password" />
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}