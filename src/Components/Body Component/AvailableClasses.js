export default function AvailableClasses(props){
    const {selectedClasses} = props.formData
    const test = selectedClasses.map(x => <h2 key={x.valueName}>{x.valueName}</h2>)

    console.log(selectedClasses)

    return(
        test
    )
}