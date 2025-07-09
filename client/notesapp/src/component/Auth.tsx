import React, { useEffect, useState } from 'react'
import UseValidator from '../hooks/UseValidator'
import axiosInstance from '../Api/AxiosInstance'
import useFetch from '../hooks/UseFetch'
import { URL } from '../Api/settings'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/UseLocalStorage'
import { toast } from 'react-toastify'

const Auth = () => {
    const navigate=useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)
    const [signInDetails, setSignInDetails] = useState({ usernameoremail: '', password: '' })
    const [signInError, setSignInError] = useState({ usernameoremail: '', password: '' ,invalid:''})
    const [signUpDetails, setSignUpDetails] = useState({ username: '', password: '', confirmPassword: '', phoneNumber: '', email: '', name: '' })
    const { signInValidator, signUpValidator } = UseValidator()
    const [signUpError,setSignUpError]=useState({ username: '', password: '', confirmPassword: '', phoneNumber: '', email: '', name: '' })
    const{axiosFunction} =useFetch()
    const{setItem,getItem,deleteItem}=useLocalStorage()

    useEffect(()=>{
        if(localStorage.getItem('NotesToken')){
            navigate('/')
        }

    },[])


    const onClickSignUp = () => {

        const error = signUpValidator(signUpDetails) || {}
        setSignUpError(error)

if (error && Object.keys(error).length > 0) {
  
  console.log("Found errors:", signUpError)
} else {
    axiosFunction("post",URL.Auth.signUp,'','',signUpDetails).then((res)=>{
        toast.success('account is created successfully')
   
    console.log(res)
    
  }) 

  setTimeout(()=>{
     window.location.reload()
  },500)
  console.log("No errors")
}
    }
    console.log(signInError.invalid);
    
const onClickSignIn = async () => {
  const error = signInValidator(signInDetails) || {};
  setSignInError(error);

  if (Object.keys(error).length > 0) {
    console.log("Found errors:", error);
  } else {
    console.log("No errors, sending API call...");
    axiosFunction("post", URL.Auth.signIn, '', '', signInDetails)
      .then((data: any) => {
        toast.success('login successfully')
        console.log("Login response:", data.token);
        if (data.token) {
          setItem('NotesToken',data.token);
          navigate('/');
        }
        else{
         setSignInError(ps => ({
          ...ps,
          invalid: 'invalid, username or email'
        }));
        }
        
        console.log(data);
      })
      .catch(err => {
        console.log("API error:", err.response?.data?.message);
      });
  }
}


    const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSignUpDetails(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSignInDetails(ps => ({
            ...ps,
            [name]: value
        }))
    }

//     const onKeyDownEnter = (e: any) => {
//   if (e.key === 'Enter') {
//     if (e.target.value === 'signin') {
//       onClickSignIn()
//     } else if (e.target.value === 'signup') {
//       onClickSignUp()
//     }
//   }
// }

    return (
        <div className='flex flex-col justify-center items-center mt-[7%]'>

            {!isSignUp ? <section className='bg-[black] shadow-[0px_0px_10px_2px_#989898] rounded-[10px] w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]  px-[min(300px,5%)] py-[min(3%,2%)]'>
                <h2 className='text-[#c8c0c0] text-[20px]'>Sign-In</h2>
                <div className='flex flex-col mt-[5vh]'>
                    <label htmlFor="" className='text-white font-semibold'>username or email:</label>
                    <input type="text" name='usernameoremail' value={signInDetails.usernameoremail} onChange={handleChangeSignIn} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                    <div className='text-[red] text-[12px]'>{signInError.usernameoremail}</div>
                </div>
                <div className='flex flex-col mt-[5vh]'>
                    <label htmlFor="" className='text-white font-semibold'>password:</label>
                    <input type="password" name='password' value={signInDetails.password} onKeyDown={(e) => {
    if (e.key === 'Enter') onClickSignIn()
  }} onChange={handleChangeSignIn} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                    <div className='text-[red] text-[12px]'>{signInError.password}</div>
                </div>
                <button className='bg-[#0052d9] text-white rounded border-none w-full mt-[5vh] py-[5px] cursor-pointer' value={'signin'} onClick={onClickSignIn}>submit</button>
                <div className='text-[red] text-[12px] text-center'>{signInError.invalid}</div>
                <div className='text-center text-white rounded text-small mt-[7%] cursor-pointer' onClick={() => { setIsSignUp(true),setSignInError({usernameoremail:'',password:'',invalid:''}),setSignInDetails({usernameoremail:'',password:''}) }}>create account</div>
            </section>

                : <section className='bg-[black] shadow-[0px_0px_10px_2px_#989898] rounded-[10px] w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]  px-[min(300px,5%)] py-[min(3%,2%)]'>
                    <h2 className='text-[#c8c0c0] text-[20px]'>Sign-up</h2>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>name:</label>
                        <input type="text" name='name' onChange={handleChangeSignUp} value={signUpDetails.name} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.name}</div>
                    </div>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>username:</label>
                        <input type="text" name='username' onChange={handleChangeSignUp} value={signUpDetails.username} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.username}</div>
                    </div>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>email:</label>
                        <input type="text" name='email' onChange={handleChangeSignUp} value={signUpDetails.email} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.email}</div>
                    </div>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>phoneno:</label>
                        <input type="text" name='phoneNumber' onChange={handleChangeSignUp} value={signUpDetails.phoneNumber} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.phoneNumber}</div>
                    </div>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>password:</label>
                        <input type="password" name='password' onChange={handleChangeSignUp} onKeyDown={(e) => {
    if (e.key === 'Enter') onClickSignUp()
  }} value={signUpDetails.password} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.password}</div>
                    </div>
                    <div className='flex flex-col mt-[5vh]'>
                        <label htmlFor="" className='text-white font-semibold'>confirm password:</label>
                        <input type="password" name='confirmPassword' onChange={handleChangeSignUp} value={signUpDetails.confirmPassword} className='border-[1px] rounded text-white px-[15px] py-[1%]' />
                        <div className='text-[red] text-[12px]'>{signUpError.confirmPassword}</div>
                    </div>
                    <button className='bg-[#0052d9] text-white rounded border-none w-full mt-[5vh] py-[5px] cursor-pointer' value={'signup'} onClick={onClickSignUp}>submit</button>
                    <div className='text-center text-white rounded text-small mt-[7%] cursor-pointer' onClick={() => { setIsSignUp(false),setSignUpError({username: '', password: '', confirmPassword: '', phoneNumber: '', email: '', name: ''}),setSignUpDetails({username: '', password: '', confirmPassword: '', phoneNumber: '', email: '', name: ''}) }}>sign-in</div>
                </section>}

        </div>
    )
}

export default Auth
