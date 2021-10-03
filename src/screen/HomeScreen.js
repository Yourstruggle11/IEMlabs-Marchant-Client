import React,{useState} from 'react'
import "../style/HomeScreenStyle.css"
import { useHistory } from 'react-router-dom'
import ProductCard from '../components/HomeScreenComponents/ProductCard';
import dataBase from "../model/Database"
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


//Import Redux
import {userLogout } from "../redux/actions/UserAction"
import { useDispatch } from "react-redux";



export default function HomeScreen() {

    const [data, setData] = useState(dataBase);
    const [arrow, setArrow] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    // LOGOUT FUNCTION
    function LogOut (){
        dispatch(userLogout())
        history.push("/")
    }


    //Showing pwoduct useing map funtion
    function mapFun(curentElement){
        //Destructure Current element
        const {id,ProductName,Price,Image,Description} = curentElement
        return(
            <ProductCard key={id} ProductName={ProductName} Price={Price} Image={Image} Description={Description} />
        )
    }

    // Making filter function
    function filterItem(categoryToFilter){
        const updateDatabase = dataBase.filter((currentElement) => {
            return currentElement.category === categoryToFilter;
        })
        setData(updateDatabase)
    }   

    function menuDrop(){
        for(var i = 0; i<5; i++){
            document.querySelectorAll("#filter-box button")[i].classList.toggle("hidden")
        }
        if(arrow){
            setArrow(false)
        }
        else{
            setArrow(true)
        }
        // document.querySelector("#filter-box").innerHTML = "Filter"
    }
    return (
        <>
            <div className="HomeScreen">
                <div className="header">
                    <p>Order Your Favourite Marchant</p>
                    <button onClick={LogOut}>LOGOUT</button>
                </div>
                <div className="filter-bar" id="filter-box">
                    <p className="notShow" style={{fontSize:"2rem"}}>Filter</p>
                    <button onClick={() => filterItem("T-shirt")}>T-shirt</button>
                    <button onClick={() => filterItem("Coffee")}>Coffee Mug</button>
                    <button onClick={() => filterItem("Watch")}>Watch</button>
                    <button onClick={() => filterItem("Bag")}>Bag</button>
                    <button onClick={() => setData(dataBase)}>All</button>
                    <div className="span notShow">
                    {arrow  ? <ArrowDropUpIcon className="notShow" style={{fontSize:"4.6rem"}} onClick={menuDrop}/> : <ArrowDropDownIcon className="notShow" onClick={menuDrop} style={{fontSize:"4.6rem"}}/>}
                    </div>
                </div>  
                <div className="product-card-body">
                    {data.map(mapFun)}
                </div>
            </div>
        </>
    )
}
