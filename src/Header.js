import {useEffect, useState} from "react";
import "./Header.css"

function Header(props){

    return(
        <div className='header'>
        <div className='container'>
        <div className='headerLogo'>
          <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cFe0a4.png'/></a>
        </div>
       
        {
          (props.user)?
          <div className='headerLogadoInfo'>
            <span>Olá, <b>{props.user}</b></span>
            <a href=''>Postar</a>
          </div>
          :
          <div className='headerLoginForm'>
            <form>
              <input type="text" placeholder="Login"/>
              <input type="password" placeholder="Senha"/>
              <input type="submit" name="acao" value="Entrar"/>
            </form>
            <div className='btnCriarConta'>
              <a href=''>Criar conta!</a> 
            </div> 
          </div>
        }
        
       </div>
       </div>
    );
}


export default Header;