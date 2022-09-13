import {useEffect, useState} from "react";
import firebase from 'firebase/compat/app';
import {auth, storage, db} from "./Firebase.js";
import "./Header.css"

function Header(props){

  const [progress, setPregress] = useState(0);
  const [file, setFile] = useState(null);

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

  function abrirModalUpload(e){
    e.preventDefault();
    let modal = document.querySelector(".modalUpload");
    modal.style.display ="block";
  }

  function fecharModalUpload(){
    let modal = document.querySelector(".modalUpload");
    modal.style.display ="none";
  }

  function uploadPost(e){
    e.preventDefault();
    let drescricaoUpload = document.getElementById("descricaoUpload").value;

    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    
    uploadTask.on("state_changed",function(snapshot){
      const progress =Math.round(snapshot.bytesTransferred/snapshot.totalBytes) *100;
      setPregress(progress);
    },function(error){

    }, function(){
      storage.ref("images").child(file.name).getDownloadURL()
      .then(function(url){
        db.collection("posts").add({
          descricao: drescricaoUpload,
          image: url,
          userName: props.user,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setPregress(0);
        setFile(null);
        alert("Upload realizado com sucessso!");
        document.getElementById("form-upload").reset();

      })
    })
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

      <div className="modalUpload">
        <div className="formUpload">
        <div onClick={()=>fecharModalUpload()} className="closeModalUpload"><p>X</p></div>
        <h2>Fazer Post</h2>
          <form id="form-upload" onSubmit={(e)=>uploadPost(e)}>
            <progress id="pregressUpload" value={progress}></progress>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file" />
            <input id="descricaoUpload" type="text" placeholder="Descrição"  />
            <input type="submit" name="acao" value="Postar Foto!"/>
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
          <a onClick={(e)=>abrirModalUpload(e)} href=''>Postar</a>
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