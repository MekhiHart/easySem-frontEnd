export default function AvailableClasses(props){
    // classObj = {valueName:string, availableClasses:[]}
    //classObj.availableClasses = {className}
    const {selectedClasses} = props.formData
    const divClasses = selectedClasses.map(classObj => {
        const divTitle = classObj.valueName
        const classesCheckbox = classObj.availableClasses.map(availableClass => (
            <label key={availableClass.className} htmlFor={availableClass.className}>
                <input 
                type="checkbox"
                name="availableClasses"
                value={availableClass.className}
                id={availableClass.className}
                >
                </input>
                {availableClass.className}
            </label>
        ))
        
        console.log("Obj; ",classesCheckbox)


        return(
            <div className="checkBox--div scroll">
                <h3>{divTitle}</h3>
                {classesCheckbox}
            </div>

        )
    })



    console.log(selectedClasses)

    return(
        <form>
            <h2>Available Classes</h2>
            {divClasses}
        </form>
    )
}