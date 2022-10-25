import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../JS/actions/authActions';

const Login = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch();
	const [login,setLogin] = useState("");
	const [password,setPassword] = useState("");
	
    const goToNavBar = ()=>navigate("/bar")


	const userLogin = ()=>{

		dispatch(loginUser({login,password}))
	  
		setLogin('');
		setPassword('');
		goToNavBar()
		
	  }


  return (
    <div>

<div className="limiter">
		<div className="container-login100" style={{backgroundImage: '/public/images/bg-01.jpg'}}>
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-logo">
						<i className="zmdi zmdi-landscape"></i>
					</span>

					<span className="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter username">
						<input className="input100" type="email" name="login" placeholder="Login" value={login} onChange={(e)=>setLogin(e.target.value)} />
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" name="pass" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					{/* <div className="contact100-form-checkbox">
						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
						<label className="label-checkbox100" for="ckb1">
							Remember me
						</label>
					</div> */}

					<div className="container-login100-form-btn">
						<button type="submit" className="login100-form-btn" onClick={()=>{userLogin()}}>
							Login
						</button>
					</div>

					{/* <div className="text-center p-t-90">
						<a className="txt1" href="#">
							Forgot Password?
						</a>
					</div> */}
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>

    </div>
  )
}

export default Login