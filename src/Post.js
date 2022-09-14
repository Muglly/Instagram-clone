import {useEffect, useState} from "react";
import {db} from "./Firebase"
import "./Post.css";

function Post (props){

    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        db.collection("posts").doc(props.id).collection("comentarios").onSnapshot(function(snapshot){
            setComentarios(snapshot.docs.map(function(document){
              return {id:document.id, info:document.data()}
            }))
        })
    }, [])

    function comentar(id,e){
        e.preventDefault();

        let comentarioAtual = document.querySelector("#comentario-"+id).value;
        
        db.collection("posts").doc(id).collection("comentarios").add({
            nome: props.user,
            comentario: comentarioAtual
        })

        alert("comentario feito com sucesso!");

        document.querySelector("#comentario-"+id).value = "";
    }

    return(
        <div className='postSingle'>
            <img src={props.info.image}/>
            <p><b>{props.info.userName}:</b> {props.info.descricao}</p>
            <div className="coments">
                {
                    comentarios.map(function(val){
                        return(
                            <div className="comentsSingle">
                                <p><b>{val.info.nome}</b>: {val.info.comentario}</p>
                            </div>
                        )
                    })
                }
            </div>
            <form onSubmit={(e)=>comentar(props.id,e)}>
              <textarea id={"comentario-"+props.id}></textarea>
              <input type="submit" value="Enviar" placeholder='Comentar...'/>
            </form>
        </div>
    )
}

export default Post;