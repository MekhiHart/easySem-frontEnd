import {useState,useEffect} from "react"
export default function Body(props){
    const {majors} = props.formData
    const checkBoxArr = create_majorCheckboxes()

 
    function create_majorCheckboxes(){
        console.log("Majors inside of child: ",majors)

        if(majors){ // Only runs when the data is rendered
            return majors.map(majorObj =>(
            <label key={majorObj.major} htmlFor={majorObj.major}>
                <input
                type="checkbox"
                name="majors"
                value={majorObj.major}
                id={majorObj.major}
                onChange={props.handleClickCheckboxes}
                />
                {majorObj.major}
            </label>))
            
        }
    }


    //   {!props.collegeMajors ? "Loading" : props.collegeMajors}
    

    return(
        <form>
            {checkBoxArr ? checkBoxArr : "Loading"}
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