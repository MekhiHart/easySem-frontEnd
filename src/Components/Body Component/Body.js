import {useState,useEffect} from "react"
export default function Body(props){
    const {majors,genEd} = props.formData
    const {checkBoxMajor,checkBoxGE} = createCheckboxes()

    // const {checkBoxArr, checkBoxGE} = getCheckBoxes()

 
    function createCheckboxes(){
        // console.log("Majors inside of child: ",majors)
        let returnObject = {checkBoxMajor:[], checkBoxGE:[]}

        if(props.formData){ // Only runs when the data is rendered

            returnObject.checkBoxMajor = majors.map(majorObj =>(
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

            returnObject.checkBoxGE = genEd.map(GE_Obj =>(
                <label key={GE_Obj.GE} htmlFor={GE_Obj.GE}>
                    <input
                    type="checkbox"
                    name="genEd"
                    value={GE_Obj.GE}
                    id={GE_Obj.GE}
                    onChange={props.handleClickCheckboxes}
                    />
                    {GE_Obj.GE}
                </label>))

        }
        return returnObject
    }

    // console.log(checkBoxGE)

    //   {!props.collegeMajors ? "Loading" : props.collegeMajors}
    

    return(
        <form>
            <div className="checkBox--div scroll">
                {!props.formData?  "Loading..." : checkBoxMajor }
            </div>

            <div className="checkBox--div scroll">
                {!props.formData?  "Loading..." : checkBoxGE }
            </div>


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