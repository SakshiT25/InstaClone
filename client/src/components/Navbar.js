import React, {useContext} from "react"
import {Link, useHistory } from 'react-router-dom'
import { userContext } from "../App"
const NavBar=()=>{
  const {state, dispatch}= useContext(userContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
        return[
          <li><Link to="/profile">Profile</Link ></li>,
          <li><Link to="/create">Create Post</Link ></li>,
          <li><Link to="/myfollowingpost">My following Posts</Link ></li>,
          <li>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/signin')
                }}
                > LogOut </button>
          </li>
        ]
    }else{
          return[
            <li><Link to="/signin">SignIn</Link></li>,
            <li><Link to="/signup">SignUp</Link></li>
          ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
} 
export default NavBar