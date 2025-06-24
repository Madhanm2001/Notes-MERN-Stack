import React from 'react'
import AddNotes from '../images/AddNotes.jpg'
import deleteLogo from '../images/delete.png'
import editLogo from '../images/edit.jpg'
import ArchivedLogo from '../images/Archived.png'
import ispinnedLogo from '../images/ispinned.jpg'
import notpinnedLogo from '../images/notpinned.jpg'
import appLogo from '../images/AppLogo.jpg'
import '../styles/folder.css'

const AllNotes: React.FC = () => {

  const folderList = ['workout routine workout routine workout routine workout routine workout routineworkout routine workout routine workout routine workout routine workout routineworkout routine workout routine workout routine workout routine workout routine', "workout routine", "workout routine", "workout routine", "workout routine", "workout routine", "workout routine"]
  return (
    <div>
      <div><img src={AddNotes} id="Addnotes" title='Add-Notes' className='cursor-pointer' alt="" /></div>

      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='folders'>
        {folderList.map((data, id) => {

          return <li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[15px] rounded-[10px] my-[10px] '>
            <img src={notpinnedLogo} alt="" className='h-[30px] w-[30px] my-[10px] ms-auto'/>
            <img className='mx-auto my-[8px]' id='noteslogo' src={appLogo} alt="" /><p id='folderName'>{data}</p>
            <div className='flex justify-center gap-[20px] my-[10px]'>
              <img src={deleteLogo} alt="" className='h-[25px] w-[25px] my-[10px]'/>
              <img src={editLogo} alt="" className='h-[25px] w-[25px] my-[10px]'/>
              <img src={ArchivedLogo} alt="" className='h-[25px] w-[25px] my-[10px]'/>
            </div>
          </li>

        })}
      </ul>
    </div>
  )
}


export default AllNotes
