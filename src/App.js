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




  function handleClickCheckboxes(event){ // Changes the isSelected value of checkboxes
    console.log("Clicked")
    const {name,value} = event.target
    const propertyName = "valueName" // * Property Name of the objects fetched from api: {valueName:...,isSelected:...}
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: prevFormData[name].map(obj => value === obj[propertyName] ? 
        {...obj, isSelected: !obj.isSelected} : obj)
    }))


  } //  handleSelect

  // console.log("formData: ",formData)

  console.log("Form Data: ",formData)

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
