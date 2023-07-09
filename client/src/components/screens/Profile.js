import React, {useEffect, useState, useContext} from "react";
import { userContext } from "../../App";
const Profile=()=>{
    const [mypics, setPics]= useState([])
    const {state, dispatch}= useContext(userContext)
    const[image, setImage] = useState("")
    
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.mypost)
        })
    },[])
    useEffect(()=>{
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "dlwthpmi0")
            fetch("https://api.cloudinary.com/v1_1/dlwthpmi0/image/upload",{
            method:"post",
            body:data
            })
            .then(res=>res.json())
            .then(data=>{
            //setUrl(data.url)
            console.log(data)
            
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user", JSON.stringify({...state, pic:data.pic}))
                dispatch({type:"UPDATEPIC", payload:result.pic})
            })
            })
            .catch(err=>{
            console.log(err)
            }) 
        }
    },[image])
    const  uploadPhoto=(file)=>{
        setImage(file)
    }
    return(
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{margin:"18px 0px", borderBottom:"1px solid grey"}}>
            <div style={{ display:"flex", justifyContent:"space-around"}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src={state? state.pic:"loading"}
                    />
                </div>
                
                <div>
                    <h4>{state? state.name:"loading"} </h4>
                    <h4>{state? state.email:"loading"} </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6> {state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            
            
                </div>
                    <div className="file-field input-field"> 
                        <div className="btn #64b5f6 blue darken-1" style={{fontSize: 10, fontFamily:"Comic-sans", margin:"10px"}}>
                            <span> Upload New picture</span>
                            <input type="file" onChange={(e)=>uploadPhoto(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return (
                            <img key ={item._id} className="item" src={item.photo} alt={item.title}/>
                    )
                    })
                }
            </div>
        </div>
    )
}

export default Profile