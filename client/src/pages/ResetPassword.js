import React,{useState} from 'react'
import { auth,provider } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword,signInWithPopup,sendPasswordResetEmail } from "firebase/auth";
function ResetPassword() {
    let navigate=useNavigate()
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
  const handleSign = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  return (
    <div className='mt-[15vh] m-auto w-[80vw]'>
         <div className='flex gap-5 items-center'>
                <div onClick={()=>navigate('/profile')}>
                    My account
                </div>
                <div>
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" transform="matrix(-1 0 0 -1 30 30)" fill="#FDFDFD"/>
<path d="M12.4688 7.5L20 15.0312L12.4688 22.5625L11.125 21.2188L17.3125 15.0312L11.125 8.84375L12.4688 7.5Z" fill="#3F3D56"/>
</svg>

                </div>
                <div onClick={()=>navigate('/profile/security')}>
                    Security
                </div>
                <div>
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" transform="matrix(-1 0 0 -1 30 30)" fill="#FDFDFD"/>
<path d="M12.4688 7.5L20 15.0312L12.4688 22.5625L11.125 21.2188L17.3125 15.0312L11.125 8.84375L12.4688 7.5Z" fill="#3F3D56"/>
</svg>

                </div>
                <div >
                    Reset password
                </div>
            
            </div>

        <section className="  my-5">
      <div
        className=" flex rounded-2xl  max-w-3xl p-5 items-center"
      >
        <div className="">
          <h2 className="font-semibold text-2xl text-[#3F3D56] ">Forgot Password</h2>
       
          <div  className="flex flex-col gap-4 ">
             <input value={credential.email} onChange={handleSign} className="p-2 mt-8  rounded-xl border" type="email" name="email" placeholder="Email" ></input>
            
          
        <button disabled={(credential.email==="")?true:false} onClick={forgotpassword} className={`${(credential.email==="")?"bg-[#3F3D56]":"bg-[#3F3D56]"}  rounded-xl text-white py-2 hover:scale-105 duration-300`} >Send reset link</button>
          </div>
          
        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
       
      </div>

                  
   
     
    </div>
      </div>
    </section>
    </div>
  )
}

export default ResetPassword