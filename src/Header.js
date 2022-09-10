import {useEffect, useState} from "react";
import {auth} from "./Firebase.js";
import "./Header.css"

function Header(props){

  function criarConta(e){
    e.preventDefault();
    let email = document.getElementById("emailCadastro").value;
    let username = document.getElementById("usernameCadastro").value;
    let password = document.getElementById("passwordCadastro").value;

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({displayName:username})
      alert("Conta criada com sucesso!")
      let modal =document.querySelector(".modalCriarConta");
      modal.style.display = "none";
    }).catch((error)=>{
      alert(error.message);
    });
  }

  function logar(e){
    e.preventDefault();
    let email = document.getElementById("emailLogin").value;
    let password = document.getElementById("passwordLogin").value;

    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
      props.setUser(auth.user.displayName);
      alert("Logado com sucesso!")
    }).catch((error)=>{
      alert(error.message);
    })
  }

  function abrirModalCriarConta(e){
    e.preventDefault();
    let modal = document.querySelector(".modalCriarConta");
    modal.style.display ="block";
  }

  function fecharModalCriar(){
    let modal = document.querySelector(".modalCriarConta");
    modal.style.display ="none";
  }

    return(

        <div className='header'>

        <div className="modalCriarConta">
          <div className="formCriarConta">
          <div onClick={()=>fecharModalCriar()} className="closeModalCriar"><p>X</p></div>
          <h2>Criar Conta</h2>
            <form onSubmit={(e)=>criarConta(e)}>
              <input id="emailCadastro" type="email" placeholder="Seu Email"  />
              <input id="usernameCadastro" type="text" placeholder="Seu username"  />
              <input id="passwordCadastro" type="password" placeholder="Sua senha"  />
              <input type="submit" name="acao" value="Criar"/>
            </form>
          </div>
        </div>

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
            <form onSubmit={(e)=>logar(e)}>
              <input id="emailLogin" type="text" placeholder="Login"/>
              <input id="passwordLogin" type="password" placeholder="Senha"/>
              <input type="submit" name="acao" value="Entrar"/>
            </form>
            <div className='btnCriarConta'>
              <a onClick={(e)=>abrirModalCriarConta(e)} href=''>Criar conta!</a> 
            </div> 
          </div>
        }
        
       </div>
       </div>
    );
}


export default Header;