import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import fig from '../static/login.jpeg'
import { auth,provider } from "../firebase-config";
import { signInWithEmailAndPassword,signInWithPopup,sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";

import Cookies from "js-cookie";
const Signup = ({host}) => {
  const [credential, setCredential] = useState({ email: "", password: "" })
  const [forgot, setForgot] = useState(false)
  const forgotpassword=()=>{
    sendPasswordResetEmail(auth, credential.email)
  .then(() => {
    setForgot(false);
    setCredential({ ...credential, ['email']: "" });
    alert("ok")
  })
  .catch((error) => {
 alert(error)
  });
  }
    let navigate=useNavigate()
   
    const handleSignIn =async () => {
  try {
    let userCr=await signInWithEmailAndPassword(auth, credential.email, credential.password)
     console.log(userCr.user)  
     const email=userCr.user.email
     const name=credential.username
     const profilepic=userCr.user.photoURL;
       Cookies.set('dp', profilepic?profilepic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGjDJxNoPQgkbqeBPV0yYH7CNMJwficf9hw&usqp=CAU")
       Cookies.set('email', email)
       Cookies.set('name',name)
    
          const url=`${host}/api/auth`;
       const resp=await axios.post(`${url}/login1`,{email:credential.email})
  const res=resp.data
  if(!res.authToken)
  alert("wrong credentials")
  else{
       Cookies.set('dorm--7z2__PMRW',res.authToken)
        navigate('/dashboard')
  }
     
    
  } catch (error) {
    alert(error)
  }
     
    }
    const handleSign = (e) => {
      setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    const signinwithgoogle= async()=>{
      try {
        const signin=await signInWithPopup(auth,provider);
        const email=signin.user.email
        const name=signin.user.displayName;
        const profilepic=signin.user.photoURL;
          Cookies.set('dp', profilepic)
          Cookies.set('email', email)
          Cookies.set('name',name)
        
          const url=`${host}/api/auth`;
          const user=await axios.post(`${url}/createUser1`,{email:email,name:name,address:"",contact:"",dob:"",nationality:"",pan:"",gender:""});
          const res=user.data;
          console.log(res)
          if(!res.authToken)
          {
            const login=await axios.post(`${url}/login1`,{email:Cookies.get('email')});
            const data=login.data;
            Cookies.set('dorm--7z2__PMRW',data.authToken)
            navigate('/dashboard')
            return;
          }
          else
          Cookies.set('dorm--7z2__PMRW',res.authToken)
          
           
          
        navigate('/dashboard');
      } catch (error) {
        alert(error)
      }
   
      }
      // const check=()=>{
      //   var user=auth.currentUser
      //  console.log(user)
      //  }
  return (
        <>
        <div className="grid  md:grid-cols-[40%_60%] mt-[5vw]">
        <div className="h-[100vh] md:block hidden" style={{backgroundImage:`url(${fig})` ,backgroundSize:"cover"}}>
        <div className="h-full backdrop-blur-[7.5px]">

        </div>
        </div>
            <div>

         {  forgot&& <section className=" min-h-screen flex items-center justify-center">
      <div
        className=" flex rounded-2xl  max-w-3xl p-5 items-center"
      >
        <div className="">
          <h2 className="font-bold text-2xl text-[#3F3D56] ">Forgot Password</h2>
       
          <div  className="flex flex-col gap-4 ">
             <input value={credential.email} onChange={handleSign} className="p-2 mt-8  rounded-xl border" type="email" name="email" placeholder="Email" ></input>
            
          
        <button disabled={(credential.email==="")?true:false} onClick={forgotpassword} className={`${(credential.email==="")?"bg-[#3F3D56]":"bg-[#3F3D56]"}  rounded-xl text-white py-2 hover:scale-105 duration-300`} >Send reset link</button>
          </div>
          
        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
       
      </div>

      
     <div onClick={()=>{setForgot(false);}} className="font-semibold text-[#3F3D56] text-[1.2rem] cursor-pointer">Back to login</div>
                  
   
     
    </div>
      </div>
    </section> }
    
            <section className=" min-h-screen flex items-center justify-center">
      <div
        className=" flex rounded-2xl  max-w-3xl p-5 items-center"
      >
        <div className="">
        {/* <button onClick={check}>check</button> */}
          <h2 className="font-bold text-2xl text-[#3F3D56] ">Login</h2>
          <p className="text-xs mt-4 text-[#3F3D56] ">
            If you are already a member, easily log in
          </p>
          <div  className="flex flex-col gap-4 ">
             <input value={credential.email} onChange={handleSign} className="p-2 mt-8  rounded-xl border" type="email" name="email" placeholder="Email" ></input>
            
             <div className="relative">
            
          <input value={credential.password} onChange={handleSign} className="p-2 rounded-xl mr-20 border w-full" type="password" name="password" placeholder="Password"></input>
        </div>
        <button disabled={(credential.email===""||credential.password==="")?true:false} onClick={handleSignIn} className={`${(credential.email===""||credential.password==="")?"bg-[#3F3D56]":"bg-[#3F3D56]"}  rounded-xl text-white py-2 hover:scale-105 duration-300`}>Login</button>
          </div>
          
        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400"></hr>
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400"></hr>
      </div>

          {/* <div className="flex items-center content-center">
            <img src="./images/hero-img.svg" className="w-48 h-48 m-auto" alt="" />
          </div> */}

          <button 
          onClick={async()=>{await signinwithgoogle(); }}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#3F3D56]"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
                  </button>
                  
    <div onClick={()=>{setForgot(true)}} className="mt-1 text-xs py-4 text-[#3F3D56] text-center">
        <div >Forgot your password?</div>
      </div>

      <div className="mt- text-xs flex justify-between items-center text-[#3F3D56]">
        <p>Don't have an account?</p>
        <button onClick={()=>{navigate('/signup')}} className="py-2 px-5 text-[#3F3D56] bg-white border rounded-xl hover:scale-110 duration-300">Sign Up</button>
      </div>
    </div>
      </div>
    </section> 
            </div>
        </div>

    </>
  )
};

export default Signup;
