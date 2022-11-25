import { useEffect, useState } from "react";
import './plants.css'

export const Plants = ()=>{

    const [ plants, setPlants ] = useState({});

    const getPlants = async () => {
        const response = await fetch(`http://localhost:8080/plants`);
        const data = await response.json()
        console.log(data.data);
        setPlants(data.data);
    }

    useEffect(()=>{
        getPlants()
    }, [])



    return (
        <>
        <h1 id="title">My plants</h1>
        <div className="all_plants">
            {plants?.map((plant)=>{
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
    // const harvest = ()=>{
                            // const date = plant.germination_date;
                            // const family = plant.plant_family;
                            // const miliDate = Date.parse(date);
                            // const fourMonths = 10368000000;
                            // const threeMonths = 7776000000;
                            // const operationS = miliDate + fourMonths;
                            // const finalDateS = new Date(operationS);
                            // const resultS = finalDateS.toLocaleString('en-GB')
                            // const operationI = miliDate + threeMonths;
                            // const finalDateI = new Date(operationI);
                            // const resultI = finalDateI.toLocaleString('en-GB')
                            // switch (family) {
                            //     case 'Indica' :
                            //         console.log(resultI);
                            //         break;
                            //     case 'Sativa':
                            //         console.log(resultS)
                            //         break;
                            //     default:
                            //         console.log('nada');
                            // }
    // }