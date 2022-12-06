import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails, getDogImage} from "../redux/actions/actions";
import "./css/DogDetails.css"

export default function DogDetails({id}){

    let dispatch = useDispatch()
    let [loading, setLoading] = useState(true)

    async function loadDog(){
        await dispatch(getDogDetails(id))
        setLoading(false)
        console.log("load")
    }

    useEffect(() => {
        loadDog()
    }, [])
    
    let dog = useSelector(state => state.dogDetails)

    
    
    
    let apiDogs = useSelector(state => state.apiDogs)
    let image = getDogImage(dog, apiDogs);


    let weight
    let height
    let yearsOfLife
    let temperament

    if (dog.id > 999) {
        weight = dog.weight;
        height = dog.height;
        if (dog.yearsOfLife) {
        yearsOfLife = dog.yearsOfLife 
        }
        let tempArray = dog.temperament.map(t => t.name)
        temperament = tempArray.join(", ")
    }else{
        if (dog.weight) {
            weight = dog.weight.metric
        }
        if (dog.height) {
            height = dog.height.metric
        }
        if (dog.min_life) {
            yearsOfLife = dog.life_span.split(" ")
            yearsOfLife.pop()
            yearsOfLife = yearsOfLife.join(" ")
        }
        temperament = dog.temperament
    }


    let [loadingComponent, setLoadingComponent] = useState("Loading")

    if (loading === true) {

        function hola(){
            if (loadingComponent === "Loading") {
                setTimeout(() => {setLoadingComponent("Loading.")}, 500)
            }else if (loadingComponent === "Loading.") {
                setTimeout(() => {setLoadingComponent("Loading..")}, 500)
            } else if (loadingComponent === "Loading..") {
                setTimeout(() => {setLoadingComponent("Loading...")}, 500)
            }else{
                setTimeout(() => {setLoadingComponent("Loading")}, 500)
            }
        }
        hola()
    }
    
    return(

        <div className="dogDetailsContainer">
            {loading === true ? 
                <div className="loadingContainer">
                    <img src="https://i.pinimg.com/originals/b4/b8/6e/b4b86e2f95381b402e71fd3089d370ab.gif" alt="" />
                    <p>{loadingComponent}</p>
                </div> :  
                <div className="dogDetails">
                    <img src={image} alt={dog.name} />
                    <hr />
                    <div>
                        <h2>{dog.name}</h2>
                        <h3>Temperament: {temperament}</h3>
                        <h3>Weight: {weight} Kg</h3>
                        <h3>Height: {height} Centimetros</h3>
                        { dog.min_life && <h3>Years of life: {yearsOfLife}</h3> }
                    </div>
                </div>}
            
        </div>
    )
}