import { useEffect, useState } from 'react';
import './App.css';
import {db} from "./Firebase.js";


function App() {

  const [user, setUser] = useState("Rafael");

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
      <div className='header'>
          <div className='container'>
          <div className='headerLogo'>
            <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cFe0a4.png'/></a>
          </div>

          {
            (user)?
            <div>Olá Rafael</div>
            :
            <div className='headerLoginForm'>
              <form>
                <input type="text" placeholder="Login"/>
                <input type="password" placeholder="Senha"/>
                <input type="submit" name="acao" value="Entrar"/>
              </form>  
            </div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
