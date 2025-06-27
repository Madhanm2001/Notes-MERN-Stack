import React from 'react'

const Profile = () => {
  return (
    <div className="flex justify-center items-center h-screen">
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
        <span className="text-white text-[15px] underline">forgot password</span>
        <span className="text-white text-[15px] underline">edit profile</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default Profile
