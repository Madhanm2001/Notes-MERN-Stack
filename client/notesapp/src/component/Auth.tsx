import React, { useState } from 'react'

const Auth = () => {

  const[isSignUp,setIsSignUp]=useState(false)



  return (
    <div className='flex flex-col justify-center items-center mt-[7%]'>

        {!isSignUp?<section className='bg-[black] shadow-[0px_0px_10px_2px_#989898] rounded-[10px] w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]  px-[min(300px,5%)] py-[min(3%,2%)]'>
          <h2 className='text-[#c8c0c0] text-[20px]'>Sign-In</h2>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>username or email:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>password:</label>
                <input type="password" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <button className='bg-[#0052d9] text-white rounded border-none w-full mt-[5vh] py-[5px]'>submit</button>
            <div className='text-center text-white rounded text-small mt-[7%]' onClick={()=>{setIsSignUp(true)}}>create account</div>
        </section>

        :<section className='bg-[black] shadow-[0px_0px_10px_2px_#989898] rounded-[10px] w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]  px-[min(300px,5%)] py-[min(3%,2%)]'>
          <h2 className='text-[#c8c0c0] text-[20px]'>Sign-up</h2>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>name:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>username:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>email:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>phoneno:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>age:</label>
                <input type="text" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <div className='flex flex-col mt-[5vh]'>
                <label htmlFor="" className='text-white font-semibold'>password:</label>
                <input type="password" className='border-[1px] rounded text-white px-[15px] py-[1%]'/>
            </div>
            <button className='bg-[#0052d9] text-white rounded border-none w-full mt-[5vh] py-[5px]'>submit</button>
            <div className='text-center text-white rounded text-small mt-[7%]' onClick={()=>{setIsSignUp(false)}}>sign-in</div>
        </section>}
      
    </div>
  )
}

export default Auth
