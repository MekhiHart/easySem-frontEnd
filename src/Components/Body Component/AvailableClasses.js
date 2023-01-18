export default function AvailableClasses(props){
    // classObj = {valueName:string, availableClasses:[]}
    //classObj.availableClasses = {className}
    const {selectedClasses} = props.formData
    const {socket} = props
    const divClasses = selectedClasses.map(classObj => {
        const category = classObj.valueName
        const classesCheckbox = classObj.availableClasses.map(availableClass => (
            <label key={availableClass.valueName} htmlFor={availableClass.valueName}>
                <input 
                type="checkbox"
                name="selectedClasses"
                value={[category,availableClass.valueName]}
                id={availableClass.valueName}
                onChange={props.handleClickCheckboxes}
                key={availableClass.valueName}
                >
                </input>
                {availableClass.valueName}
            </label>
        ))
        
        // console.log("Obj; ",classesCheckbox)


        return(
            <div key={category}>
                <h3>{category}</h3>
                <div className="checkBox--div scroll">
                    {classesCheckbox}
                </div>
            </div>

        )
    })

    return(
        <form onSubmit={generateSchedule}>
            <h2>Available Classes</h2>
            {divClasses}
            <button>Generate Best Schedules!</button>
        </form>
    )

    // selectedClasses -> [{valueName, availableClasses}]
    // availableClasses -> {valueName,isSelected}
    function generateSchedule(event){
        event.preventDefault()
        socket.emit("generateSchedule",selectedClasses)
        

    }


    
}