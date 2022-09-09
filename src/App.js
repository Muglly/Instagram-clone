import { useEffect } from 'react';
import './App.css';
import {db} from "./Firebase.js";


function App() {

  useEffect(()=>{
    console.log(db)
  },[])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
