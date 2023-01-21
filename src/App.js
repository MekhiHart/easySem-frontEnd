import io from "socket.io-client"
import {useState,useEffect} from "react"
import './App.css';
import {nanoid} from "nanoid"

import Header from "./Components/Header"
import Body from "./Components/Body Component/Body"

const socket = io.connect("http://localhost:3001") // ! How to implment dynamic connection when server goes to a hosting service

function App() {

  // const [availableMajors, setAvailableMajors] = useState(null)

  const [formData, setFormData] = useState({
    selectedMajors:[],
    selectedGenEd:[],
    selectedClasses:[],
})

  const [generatedSchedules,setGeneratedSchedules] = useState([])

  console.log("Selected Majors: ",formData.selectedMajors[0])
  console.log("Selected Classes: ",formData.selectedClasses[0])


  useEffect(() => {
    fetch("/get_collegeMajors") //  fetches on the specific api you want it too
      .then((res) => res.json())
      .then((data) => setFormData(prevFormData => ({
        ...prevFormData,
        selectedMajors: data
      })))
  }, []);

  useEffect(() => {
    fetch("/get_collegeGE") //  fetches on the specific api you want it too
      .then((res) => res.json())
      .then((data) => setFormData(prevFormData => ({
        ...prevFormData,
        selectedGenEd: data
      })))
  }, []);

  useEffect( () =>{ // fetches data when selecting classes from majors and GE reqs
    socket.on("getSelectedClasses", (data) => setFormData(prevFormData =>({
      ...prevFormData,
      selectedClasses: data
    })))
  },[])

  useEffect( () =>{
    socket.on("recieve_GeneratedSchedule", data => console.log("Datas recieved: ",data))
  },[])

  // selectedClasses = [{valueName:string, availableClasses:[{valueName:string,isSelected:false}]}]
  // console.log("Generated Schedule: ",generatedSchedules)

  function handleClickCheckboxes(event){ // Changes the isSelected value of checkboxes
    const {name,value} = event.target
    const propertyName = "valueName" // * Property Name of the objects fetched from api: {valueName:...,isSelected:...}
    if (name !== "selectedClasses"){ // if the checkbox is not selectedClasses
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: prevFormData[name].map(obj => value === obj[propertyName] ? 
          {...obj, isSelected: !obj.isSelected} : obj)
      }))
    }

    else{ // selectedClasses data
      setFormData(prevFormData =>({
        // prevFormData -> {selectedMajors: [], selectedGenEd:[], selectedClasses: []}
        // selectedClasses array element -> {valueName:string,availableClasses:[]}
        // selectedClasses.availableClasses array element -> {valueName:string, isSelected:bool}
        ...prevFormData,
        [name]: prevFormData[name].map(obj => { // name = selectedClasses
          const valueArray = value.split(",") // * for some reason, the props does not take in an array
          const category = valueArray[0] // ! this props is undefined, fix it
          const valueName = valueArray[1]

         if (category === obj[propertyName]){ // if it's the same category obj
          const targetCategory = {...obj}
          targetCategory.availableClasses = targetCategory.availableClasses.map(classObj => valueName === classObj[propertyName] ? // if it's the same class that the user selected, then it changes the selected value
            {...classObj, isSelected:!classObj.isSelected} : classObj)

          return targetCategory
         }

         return obj 
        }  )
      }))
    }


  } //  handleSelect

  // console.log("formData: ",formData)

  // console.log("Form Data: ",formData)

  return (
    <div className="App">
      <Header/>
      <Body 
      handleClickCheckboxes={handleClickCheckboxes}
      formData={formData}
      socket={socket}
      />
      {/* {!collegeMajors ? "Loading..." : collegeMajors} */}
    </div>
  )
}

export default App;
