import {useState,useEffect} from "react"
import Category from "./Category"
import AvailableClasses from "./AvailableClasses"
export default function Body(props){

    const {selectedClasses} = props.formData
    return(
        <>
            <Category
            formData={props.formData}
            socket={props.socket}
            handleClickCheckboxes={props.handleClickCheckboxes}
            />


            {selectedClasses.length !== 0 ? 
                <AvailableClasses
                formData={props.formData}
                socket={props.socket}
                handleClickCheckboxes={props.handleClickCheckboxes}
                />
                :
                <h2>No boxes clicked</h2>
            }

 
        </>



    )
}