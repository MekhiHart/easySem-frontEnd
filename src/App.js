import {useState,useEffect} from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);



  return (
    <div className="App">
      {!data ? "Loading..." : data}
    </div>
  );
}

export default App;
