import { useAuth } from "../../context/authContext"


export const Home = ()=>{

    const {user} = useAuth();
    console.log(user);

    return (
        <h1>Home</h1>
    )
}