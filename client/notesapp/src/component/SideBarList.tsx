import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faListSquares } from '@fortawesome/free-solid-svg-icons'
import searchLogo from '../images/searchLogo.png'
import { URL } from '../Api/settings';
import useFetch from '../hooks/UseFetch';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SideBarList = () => {
const {id:Ids}:any=useParams()
console.log(Ids);

  const navigate=useNavigate()
    const [fileList,setFileList]=useState([{name:'',noteId:'',folderId:''}])
    const [isFileOpen, setIsFileOpen] = useState(false)
    const [fileKey, setFilekey] = useState(Ids)
    const[pageNo,setPageNo]=useState(1)
    const[searchValue,setSearchValue]=useState('')
   const{axiosFunction}=useFetch()

console.log(fileList);

    const activeRef: any= useRef(null)
    
    useEffect(()=>{

    const token = localStorage.getItem('NotesToken')
  if (!token) {
    navigate('/auth')
  }
    
  fetchFiles();
    
      const onOverlayClick = (e:any) => {
          if (activeRef.current && !activeRef.current.contains(e.target)) {
            setIsFileOpen(false);
          }
        };
        document.addEventListener("mousedown", onOverlayClick);
    
      return () => {
          document.removeEventListener("mousedown", onOverlayClick);
        };
    
    },[])

    const fetchFiles = () => {
          if(window.location.pathname.includes('notes-content')){
            axiosFunction("get", URL.Note.getAll,'', {
          filter: 'all',
          sort: 'newtoold',
          page: 'infinite',
          limit: 10
        }, '').then((res) => {
          const note = res?.notes.map((data: any) => ({
            name: data.name,
            noteId: data.noteId
          }))
          if (pageNo > 1) {
            setFileList(prev=>[...prev, ...note])
          } else {
            setFileList(note)
          }
        })
          }
          else{
            axiosFunction("get",URL.Folder.getAllFolders,'','', '').then((res) => {
          const note = res?.folders.map((data: any) => ({
            name: data.name,
            folderId: data.folderId
          }))
          if (pageNo > 1) {
            setFileList(prev => [...prev, ...note])
          } else {
            setFileList(note)
          }
        })
          }
        
      }

    const onclickFile = (data: any) => {
  setFilekey(data?.noteId || data?.folderId);

  if (data?.noteId) {
    window.location.href = `/notes-content/${data.noteId}`;
  } else {
    window.location.href = `/notes/${data.folderId}`;
  }
};
const onclickSearch = (e: any) => {
      const value = e.target.value;
      setSearchValue(value);

      setTimeout(() => {
          if (value.trim()) {

            if(window.location.pathname.includes('notes-content')){
              axiosFunction("get", URL.Note.searchAll, '', { name: value }, "")
                .then((res) => {
                   const folder = res?.map((data: any) => ({
                      name: data.name,
                      folderId: data.folderId
                   }))
                   setFileList(folder);
                })
              }
              else{
                axiosFunction("get", URL.Folder.search, '', { name: value }, "")
                .then((res) => {
                   const folder = res?.map((data: any) => ({
                      name: data.name,
                      folderId: data.folderId
                   }))
                   setFileList(folder);
                })
              }
          }
      }, 200)

  }

    return (
        <div ref={activeRef}>
            <div className='mt-[20px]' onClick={() => setIsFileOpen(!isFileOpen)}><FontAwesomeIcon icon={faListSquares}  style={{height:'18px',width:"18px"}} className={`p-3 rounded ${isFileOpen?'text-black bg-[#cdca00]':'text-black bg-[#878787]'} cursor-pointer` }/></div>
            {isFileOpen &&
                <div className='w-[275px] bg-[black] p-2 shadow-[0px_0px_10px_0px_grey]  absolute z-[100] p-3 rounded mx-auto h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar mx-auto'>
        <div className='flex gap-[80px] flex-wrap relative justify-center'>
          <span className='flex gap-2'>
            <input
              type="text"
              className='border-[2px] border-white text-white h-[35px] rounded mt-[25px]'
              value={searchValue}
              onChange={onclickSearch}
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] p-[0_10px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
                    <div className='m-5'>
                        {fileList.map((data, idx) => {
    const dataId = data.noteId || data.folderId;
    const isActive = String(dataId) === String(Ids);

    return (
        <div
            className='flex gap-[25%] mx-auto mt-[2%] cursor-pointer'
            key={dataId}
            onClick={() => onclickFile(data)}
        >
            <FontAwesomeIcon
                icon={faFolder}
                className={`${isActive ? 'text-[#cdca00]' : 'text-white'} mt-[1.5%]`}
            />
            <p className={`truncate max-w-[200%] ${isActive ? 'text-[#cdca00]' : 'text-white'}`}>
                {data.name}
            </p>
        </div>
    );
})}

                    </div>
                    
                </div>}
        </div>
    )
}

export default SideBarList
