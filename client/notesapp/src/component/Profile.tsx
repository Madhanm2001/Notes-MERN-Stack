import React, { useState } from 'react'
import FormModal from '../common/FormModal'

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePass, setChangePass] = useState(false)
  return (
    <div className="flex justify-center items-center h-screen">
      <FormModal
        show={showProfile}
        isclose={true}
        isNotes={false}
        onclose={() => setShowProfile(false)}
        onlayoutclose={() => setShowProfile(false)}
        cancel={() => setShowProfile(false)}
        header={'Edit-Profile'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>name:</label>
            <input type="text" className='layoutInput' />
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>user-name:</label>
            <input type="text" className='layoutInput' />
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>e-mail:</label>
            <input type="text" className='layoutInput' />
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>phone-number:</label>
            <input type="text" className='layoutInput' />
          </div>
        </>}
        footer={
          <>
            <button className='button'>submit</button>
            <button className='button' onClick={() => setShowProfile(!showProfile)}>cancel</button>
          </>
        }/>
        <FormModal
        show={showChangePass}
        isclose={true}
        isNotes={false}
        onclose={() => setChangePass(false)}
        onlayoutclose={() => setChangePass(false)}
        cancel={() => setChangePass(false)}
        header={'Change-Password'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>current-password:</label>
            <input type="text" className='layoutInput' />
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>new-password:</label>
            <input type="text" className='layoutInput' />
          </div>
        </>}
        footer={
          <>
            <button className='button'>submit</button>
            <button className='button' onClick={() => setChangePass(!showChangePass)}>cancel</button>
          </>
        }/>
  <div className="flex justify-center gap-2.5 bg-[black] shadow-[0px_0px_10px_0px_#989898] min-[850px]:w-[50%] min-[990px]:w-[40%] min-[650px]:w-[60%] min-[500px]:w-[70%] w-[90%] p-[2em] rounded-[10px]">
    <div className="flex flex-col gap-[30px] items-center w-full">
      <div className="flex flex-col items-center flex-wrap">
        <div className="text-black font-bold flex items-center justify-center rounded-full w-[120px] h-[120px] bg-[#e5d700] text-[50px]">
          M
        </div>
        <p className="text-[#e5d700] font-bold text-center mt-3 text-[20px]">___mr.maddy___</p>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Name:</span>
        <span className="text-white break-words max-w-[150px]">Madhankumar</span>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Email:</span>
        <span className="text-white break-words max-w-[150px]">madhan@gmail.com</span>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Contact:</span>
        <span className="text-white break-words max-w-[150px]">912716726172</span>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Age:</span>
        <span className="text-white break-words max-w-[150px]">99</span>
      </div>
      <div className="flex justify-between w-full flex-wrap  break-words">
        <span className="text-white text-[15px] underline cursor-pointer" onClick={()=>setChangePass(true)}>forgot password</span>
        <span className="text-white text-[15px] underline cursor-pointer" onClick={()=>setShowProfile(true)}>edit profile</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default Profile
