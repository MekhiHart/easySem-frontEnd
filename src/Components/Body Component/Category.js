import {useState,useEffect} from "react"
export default function Category(props){
    const {selectedMajors,selectedGenEd, selectedClasses} = props.formData
    const {checkBoxMajor,checkBoxGE} = createCheckboxes_fromChoice() // Array of checkboxes
    const checkBoxClasses = createCheckboxes_fromClasses() // Array of checkboxes
    const {socket} = props // socket.io-client

    let isRendered = selectedMajors.length !== 0 && selectedGenEd.length !== 0


    // const {checkBoxArr, checkBoxGE} = getCheckBoxes()

 
    function createCheckboxes_fromChoice(){
        // console.log("Majors inside of child: ",majors)
        let returnObject = {checkBoxMajor:[], checkBoxGE:[]}

        if(props.formData){ // Only runs when the data is rendered

            returnObject.checkBoxMajor = selectedMajors.map(majorObj =>(
            <label key={majorObj.valueName} htmlFor={majorObj.valueName}>
                <input
                type="checkbox"
                name="selectedMajors"
                value={majorObj.valueName}
                id={majorObj.valueName}
                onChange={props.handleClickCheckboxes}
                />
                {majorObj.valueName}
            </label>))

            returnObject.checkBoxGE = selectedGenEd.map(GE_Obj =>(
                <label key={GE_Obj.valueName} htmlFor={GE_Obj.valueName}>
                    <input
                    type="checkbox"
                    name="selectedGenEd"
                    value={GE_Obj.valueName}
                    id={GE_Obj.valueName}
                    onChange={props.handleClickCheckboxes}
                    />
                    {GE_Obj.valueName}
                </label>))
        }
        return returnObject
    }

    function createCheckboxes_fromClasses(){
        // console.log("Classes available: ", selectedClasses)
        return(
            selectedClasses.map(classObj => (
            <div>
                <h3>{classObj.valueName}</h3>
            </div>
            ))
        )
    }

    // console.log(checkBoxGE)

    //   {!props.collegeMajors ? "Loading" : props.collegeMajors}
    
    function getClasses(event){
        event.preventDefault()
        const requestedMajors = selectedMajors.filter(obj => obj.isSelected)
        const requestedGE = selectedGenEd.filter(obj => obj.isSelected)

        // console.log("Reqeust: ",requestedMajors)
        // console.log("Request: ", requestedGE)

        socket.emit("find_classes",{data:{ // post request equivalent to server 
            selectedMajors:requestedMajors,
            selectedGenEd:requestedGE
        }})

    }

    // console.log("Classes: ", selectedClasses)

    return(
            <form onSubmit={getClasses}>
                <h2>Major(s) & Minors</h2>
                <div className="checkBox--div scroll">
                    {!isRendered?  "Loading..." : checkBoxMajor }
                </div>

                <h2>G.E Requirements</h2>
                <div className="checkBox--div scroll">
                    {!isRendered?  "Loading..." : checkBoxGE }
                </div>
                <button>See available classes</button>
            </form>
    )
}