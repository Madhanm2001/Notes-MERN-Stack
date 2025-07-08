import React, { useEffect, useState } from 'react'
import FormModal from '../common/FormModal'
import { useQuery,type UseQueryResult } from '@tanstack/react-query'
import useFetch from '../hooks/UseFetch'
import { URL } from '../Api/settings'
import UseValidator from '../hooks/UseValidator'


const Profile = () => {
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePass, setChangePass] = useState(false)
  const [profileDetail,setProfileDetail]=useState({name:'',username:'',phoneNumber:'',email:''})
  const{ axiosFunction } = useFetch()
  const[profileErr,setProfileErr]=useState({name:'',username:'',phoneNumber:'',email:''})
  const[changePassErr,setChangePassErr]=useState({oldPassword:'',newPassword:'',invalid:''})
  const[changePassDetail,setChangePassDetail]=useState({oldPassword:'',newPassword:''})
  const{profileValidator,ChangePasswordValidator}=UseValidator()

const { data: profileData, isLoading, isError } = useQuery({
    queryKey: ['profileData',showProfile],
    queryFn: () => axiosFunction('get', URL.Profile.get, '', '', ''),
  })

  console.log(profileDetail);

  const getProfile=()=>{
    setProfileErr({name:'',username:'',phoneNumber:'',email:''})

    axiosFunction('get', URL.Profile.get, '', '', '').then((res)=>{
      setProfileDetail(res.profile)
    })

    setShowProfile(true)

  }
  
  const profileOnChange=(e:any)=>{

    const{name,value}=e.target

    setProfileDetail(ps=>({
      ...ps,
      [name]:value
    }))

  }

  const OnchangePass=(e:any)=>{

    const{name,value}=e.target

    setChangePassDetail(ps=>({
      ...ps,
      [name]:value
    }))

  }

  const onSubmitChangePass=()=>{

const error = ChangePasswordValidator(changePassDetail) || {}
setChangePassErr(error)

if(Object.keys(error).length==0){

   axiosFunction('patch', URL.Profile.changePassword, '', '', changePassDetail)
    .then((res)=>{
      if(res!='password is changed successfully'){

        setChangePassErr(ps=>({
          ...ps,
          invalid:'enter valid old password'
        }))

      }
      else{
setChangePass(false)
      }
      
    })

}
  }

  
  const onSubmitProfile=()=>{

const error = profileValidator(profileDetail) || {}
setProfileErr(error)

if(Object.keys(error).length==0){

   axiosFunction('patch', URL.Profile.update, '', '', profileDetail)
    .then(()=>{
      setShowProfile(false)
    })

}
  }
  
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
            <input type="text" name='name' className='layoutInput' onChange={profileOnChange} value={profileDetail.name}/>
            <div className='text-[red] text-[12px]'>{profileErr.name}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>user-name:</label>
            <input type="text" name='username' className='layoutInput' onChange={profileOnChange} value={profileDetail.username}/>
            <div className='text-[red] text-[12px]'>{profileErr.username}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>e-mail:</label>
            <input type="text" name='email' className='layoutInput' onChange={profileOnChange} value={profileDetail.email}/>
            <div className='text-[red] text-[12px]'>{profileErr.email}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>phone-number:</label>
            <input type="text" name='phoneNumber' className='layoutInput' onChange={profileOnChange} value={profileDetail.phoneNumber}/>
            <div className='text-[red] text-[12px]'>{profileErr.phoneNumber}</div>
          </div>
        </>}
        footer={
          <>
            <button className='button' onClick={onSubmitProfile}>submit</button>
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
            <input type="text" name='oldPassword' onChange={OnchangePass} value={changePassDetail.oldPassword} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{changePassErr.oldPassword}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>new-password:</label>
            <input type="text" name='newPassword' onChange={OnchangePass} value={changePassDetail.newPassword} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{changePassErr.newPassword}</div>
          </div>
          <div className='text-[red] text-[12px] text-center'>{changePassErr.invalid}</div>
        </>}
        footer={
          <>
            <button className='button' onClick={onSubmitChangePass}>submit</button>
            <button className='button' onClick={()=>setChangePass(!showChangePass)}>cancel</button>
          </>
        }/>
  <div className="flex justify-center gap-2.5 bg-[black] shadow-[0px_0px_10px_0px_#989898] min-[850px]:w-[50%] min-[990px]:w-[40%] min-[650px]:w-[60%] min-[500px]:w-[70%] w-[90%] p-[2em] rounded-[10px]">
    <div className="flex flex-col gap-[30px] items-center w-full">
      <div className="flex flex-col items-center flex-wrap">
        <div className="text-black font-bold flex items-center justify-center rounded-full truncate w-[120px] h-[120px] bg-[#e5d700] text-[50px]">
          {profileData?.profile?.username[0]}
        </div>
        <p className="text-[#e5d700] font-bold text-center truncate mt-3 text-[20px]">{profileData?.profile?.username}</p>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Name:</span>
        <span className="text-white break-words truncate max-w-[150px]">{profileData?.profile?.name}</span>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Email:</span>
        <span className="text-white break-words truncate max-w-[150px]">{profileData?.profile?.email}</span>
      </div>
      <div className="flex justify-between border-b border-white w-full flex-wrap">
        <span className="text-white font-semibold">Contact:</span>
        <span className="text-white break-words truncate max-w-[150px]">{profileData?.profile?.phoneNumber}</span>
      </div>
      <div className="flex justify-between w-full flex-wrap  break-words">
        <span className="text-white text-[15px] underline cursor-pointer" onClick={()=>{setChangePass(true),setChangePassErr({oldPassword:'',newPassword:'',invalid:""}),setChangePassDetail({oldPassword:'',newPassword:''})}}>forgot password</span>
        <span className="text-white text-[15px] underline cursor-pointer" onClick={getProfile}>edit profile</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default Profile
