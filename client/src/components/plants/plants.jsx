import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import './plants.css'

export const Plants = ()=>{

    const [ myPlants, setMyPlants ] = useState([]);

    const { plants,authUser } = useAuth();


    useEffect(()=>{
        plants && setMyPlants(plants.filter(plant => plant.user_id === authUser._id))
    }, [])

    return (
        <>
        <h1 id="title">My plants</h1>
        <div className="all_plants">
            {myPlants.map((plant)=>{
                return(
                    <div className="plant_card">
                        <div className="plant_attribute">
                            <h4>Genetic</h4>
                            <span>{plant.plant_name}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Family</h4>
                            <span>{plant.genetic}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Germinated</h4>
                            <span>{plant.germination_date}</span>
                        </div>
                        <div className="plant_attribute">
                            <h4>Grow mode</h4>
                            <span>{plant.grow_mode}</span>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
};