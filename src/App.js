import {useState,useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import {nanoid} from "nanoid"

import Header from "./Components/Header"
import Body from "./Components/Body Component/Body"

function App() {

  // const [availableMajors, setAvailableMajors] = useState(null)

  const [formData, setFormData] = useState({
    majors:[],
    genEd:[],
})

  useEffect(() => {
    fetch("/collegeMajors") //  fetches on the specific api you want it too
      .then((res) => res.json())
      .then((data) => setFormData(prevFormData => ({
        ...prevFormData,
        majors: data
      })))
  }, []);

  useEffect(() => {
    fetch("/collegeGE") //  fetches on the specific api you want it too
      .then((res) => res.json())
      .then((data) => setFormData(prevFormData => ({
        ...prevFormData,
        genEd: data
      })))
  }, []);


  console.log("Form Data:",formData)



  function handleClickCheckboxes(event){ // Changes the isSelected value of checkboxes
    const {name,value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: prevFormData[name].map(obj => value === obj[name === "majors"  ? "major" : "GE"] ? 
        {...obj, isSelected: !obj.isSelected} : obj)
    }))


  } //  handleSelect



  return (
    <div className="App">
      <Header/>
      <Body 
      handleClickCheckboxes={handleClickCheckboxes}
      formData={formData}
      />
      {/* {!collegeMajors ? "Loading..." : collegeMajors} */}
    </div>
  )
}

export default App;
