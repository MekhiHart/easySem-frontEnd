import {useState,useEffect} from "react"
export default function Body(props){
    const {selectedMajors,selectedGenEd} = props.formData
    const {checkBoxMajor,checkBoxGE} = createCheckboxes()

    const {socket} = props // socket.io


    // const {checkBoxArr, checkBoxGE} = getCheckBoxes()

 
    function createCheckboxes(){
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

    // console.log(checkBoxGE)

    //   {!props.collegeMajors ? "Loading" : props.collegeMajors}
    
    function handleSubmit(event){
        event.preventDefault()
        const requestedMajors = props.formData.selectedMajors.filter(obj => obj.isSelected)
        const requestedGE = props.formData.selectedGenEd.filter(obj => obj.isSelected)
        // console.log("Reqeust: ",requestMajors)
        // console.log("Request: ", requestGE)

        socket.emit("find_classes",{data:{
            selectedMajors:requestedMajors,
            selectedGenEd:requestedGE
        }})
        
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Major(s) & Minors</h2>
            <div className="checkBox--div scroll">
                {!selectedMajors?  "Loading..." : checkBoxMajor }
            </div>

            <h2>G.E Requirements</h2>
            <div className="checkBox--div scroll">
                {!selectedGenEd?  "Loading..." : checkBoxGE }
            </div>

            <button>See available classes</button>

        </form>

        // <form>
        //     <input
        //     type="checkbox"
        //     name="majors"
        //     value="Accountancy (ACCT)"
        //     id="Accountancy (ACCT)"
        //     onChange={props.handleSelect}
        //     />
        //     <label htmlFor="Accountancy (ACCT)">Accountancy (ACCT)</label>

        //     <input
        //     type="checkbox"
        //     name="majors"
        //     value="Business Law (BLAW)"
        //     id="Business Law (BLAW)"
        //     onChange={props.handleSelect}
        //     />
        //     <label htmlFor="Business Law (BLAW)">Business Law (BLAW)</label>
        // </form>
    )
}