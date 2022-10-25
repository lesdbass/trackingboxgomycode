import React from 'react'
import SideNavBar from './component/SideNavBar/SideNavBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Barre = () => {
  const navigate = useNavigate()
  const user = useSelector(state=>state.authReducer.user)
  const goToLogin= ()=>navigate("/")
  if(user) { global.boutiqueName=user.login }
  if (user) { global.typeAccount=user.type }

  return (
    <div>
      
        {(user) ? <SideNavBar /> : goToLogin() }
       
         {/* <SideNavBar />  */}
        
         {/* {console.log(global.boutiqueName)} */}
    </div>
    
  )
}

export default Barre