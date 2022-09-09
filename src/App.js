import {db} from "./Firebase.js";
import { useEffect, useState } from 'react';
import './App.css';
import Header from "./Header";


function App() {

  const [user, setUser] = useState("Rafael");

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
     <Header user={user}></Header>
    </div>
  );
}

export default App;
