import React, { useEffect, useRef, useState } from 'react'
import folderLogo from '../images/folderLogo.jpg'
import '../styles/folder.css'
import searchLogo from '../images/searchLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpAZ,faSort,faEdit, faFolderPlus,faArrowUpShortWide,faFilter,faArrowUpZA ,faTrash, faClock} from '@fortawesome/free-solid-svg-icons';
import FormModal from '../common/FormModal'
import { Link, useNavigate } from 'react-router-dom'
import UseValidator from '../hooks/UseValidator'
import { URL } from '../Api/settings'
import useFetch from '../hooks/UseFetch'
import SideBarList from './SideBarList'

const Folder: React.FC = () => {

  const [folderList,setFolderList]=useState([{name:'',date:'',time:"",folderId:''}])
const[filterList,setFilterList]=useState(['All'])
  const sortOptions = ['A-Z', 'Z-A', 'old-new', 'new-old']
  const [folderFilter,setFolderFilter]=useState({category:'',sort:'newtoold',limit:10,page:1})
  const [show, setShow] = useState(false)
  const[folderDetail,setFolderDetail]=useState({name:'',category:''})
  const[folderErr,setFolderErr]=useState({name:'',category:''})
  const[folderId,setFolderId]=useState('')
  const{folderValidator}=UseValidator()
   const[isFilter,setIsFilter]=useState(false)
   const[isSort,setIsSort]=useState(false)
   const{axiosFunction}=useFetch()
   const[searchValue,setSearchValue]=useState('')
   const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLUListElement>(null);

   const navigate=useNavigate()

   useEffect(() => {
  const token = localStorage.getItem('NotesToken')
  if (!token) {
    navigate('/auth')
  }

  fetchFolders();

}, [folderFilter])


const onSubmitFolder = () => {
  const error = folderValidator(folderDetail) || {}
  const params = folderId || "";
  setFolderErr(error)
  if (Object.keys(error).length === 0) {
    axiosFunction(params ? 'put' : "post", URL.Folder.create, params, '', folderDetail)
      .then(() => {
  setFolderFilter(ps => ({ ...ps, page: 1 }));
  setShow(false)
  setHasMore(true);
  if (containerRef.current) {
    containerRef.current.scrollTop = 0;
  }
})
  }
}

const onclickDelete = (data: any) => {
  axiosFunction("delete", URL.Folder.create, data.folderId, "", "")
    .then(() => {
      setFolderFilter(ps => ({ ...ps, page: 1 }));
      setHasMore(true);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    });
};

   const TimeFormat=(time:any)=>{

    const tim=time?.split('T')

    const d=tim[1]?.split(':')
    console.log(tim,d);

    const date=tim[0].split('-')

    return {date:`${date[2]}/${date[1]}/${date[0]}`,time:`${d[0]}:${d[1]} ${d[0]>12?'PM':'AM'}`}
    
    
   }
  
    const onClickFilter=(e:string|any)=>{
      setFolderFilter(ps=>({
        ...ps,
        category:e.target.value,
        page:1
      }))
       setHasMore(true)
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      
    }
    const onchangeFolder=(e:any)=>{

      const{name,value}=e.target

      setFolderDetail(ps=>({
        ...ps,
        [name]:value
      }))

    }
    const onclickSort = (sort: any) => {
  setFolderFilter(ps => ({
    ...ps,
    sort: sort,
    page: 1 
  }));
  setHasMore(true);
}


    const onclickClearAll = () => {
  setFolderFilter({
    category: "",
    sort: "newtoold",
    limit: 10,
    page: 1
  })
  setIsFilter(false)
  setIsSort(false)
  setSearchValue('')
  setHasMore(true)
  
  if (containerRef.current) {
    containerRef.current.scrollTop = 0;
  }
}


    const onclickEdit=(data:any)=>{
      console.log(data,'folderID');
      setFolderId(data.folderId)
      setShow(true)
      axiosFunction("get",URL.Folder.create,data.folderId,"","").then((res)=>{
      setFolderDetail({name:res.name,category:res.category})
      })
    }

    const CreateFolder=()=>{
      setShow(true)
      setFolderDetail({name:'',category:''})
      setFolderErr({name:'',category:''})
      setFolderId('')
    }
    const fetchFolders = () => {
  axiosFunction("get", URL.Folder.create, "", {
    category: folderFilter.category,
    sort: folderFilter.sort,
    page: folderFilter.page,
    limit: folderFilter.limit
  }, '').then((res) => {
    const folder = res?.folders.map((data: any) => ({
      name: data.name,
      date: TimeFormat(data.updatedAt).date,
      time: TimeFormat(data.updatedAt).time,
      folderId: data.folderId
    }))
    if (folderFilter.page > 1) {
      setFolderList(prev => [...prev, ...folder])
    } else {
      setFolderList(folder)
    }
    if (folder.length < folderFilter.limit) {
      setHasMore(false)
    }
    console.log(folder)
    axiosFunction("get", URL.Folder.getCategories, "", '', '')
    .then((res) => {
      setFilterList(res)
      console.log(res);
    })
  })
}



      const onclickSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
setIsFilter(false)
    setTimeout(() => {
        if (value.trim()) {
            axiosFunction("get", URL.Folder.search, '', { name: value }, "")
              .then((res) => {
                 const folder = res?.map((data: any) => ({
                    name: data.name,
                    date: TimeFormat(data.updatedAt).date,
                    time: TimeFormat(data.updatedAt).time,
                    folderId: data.folderId
                 }))
                 setFolderList(folder);
              })
        }
    }, 200)
    setHasMore(true)
    if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
}

 const handleScroll = () => {
  if (!containerRef.current || !hasMore) return
  const { scrollTop, scrollHeight, clientHeight } = containerRef.current

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    setFolderFilter(ps => ({ ...ps, page: ps.page + 1 }))
  }
}

  
  return (
    <div>
      <FormModal
        show={show}
        isclose={true}
        isNotes={false}
        onclose={() => setShow(false)}
        onlayoutclose={() => setShow(false)}
        cancel={() => setShow(false)}
        header={'Create-Folder'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Title:</label>
            <input type="text" onChange={onchangeFolder} name='name' value={folderDetail.name} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{folderErr.name}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Category:</label>
            <input type="text" onChange={onchangeFolder} name='category' value={folderDetail.category} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{folderErr.category}</div>
          </div>
        </>}
        footer={
          <>
            <button className='button' onClick={onSubmitFolder}>submit</button>
            <button className='button' onClick={() => setShow(!show)}>cancel</button>
          </>
        }
      />
    <div className='flex flex-wrap justify-between m-[25px] relative'>
      <SideBarList/>
        <div className='flex gap-[80px] max-sm:gap-[10px] flex-wrap relative'>
          <span className='flex gap-1'>
            <input
              type="text"
              className='border-[2px] border-white p-[0_10px] text-white h-[35px] sm:w-[500px] w-[200px] rounded mt-[25px]'
              value={searchValue}
              onChange={onclickSearch}
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded'
              src={searchLogo}
              onClick={onclickSearch}
              alt=""
            />
          </span>
        </div>
        <p className='text-white mt-[25px] cursor-pointer hover:text-red-500' onClick={onclickClearAll}>clear all</p>
      </div>

<div className='flex justify-between m-[25px]'>
          <li className='cursor-pointer flex gap-[50px]' >
            <FontAwesomeIcon icon={faFilter} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isFilter?'text-black bg-[#cdca00]':'text-black bg-[#878787]'} p-2 rounded`} onClick={() => {setIsFilter(!isFilter),setIsSort(false)}} />
            <FontAwesomeIcon icon={faFolderPlus} style={{height:'40px',width:'40px'}} className={`${show?'text-[#cdca00]':'text-[#878787]'} cursor-pointer`} onClick={CreateFolder}/>

          </li>
          <li className='cursor-pointer'><FontAwesomeIcon onClick={() => {setIsSort(!isSort),setIsFilter(false)}} icon={faSort} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isSort?'text-black bg-[#cdca00]':'text-black bg-[#878787]'} p-2 rounded`} /></li>
      </div>

      <div className='flex justify-between w-[100%]'>
        <div className='flex bg-black p-3 gap-[3%] rounded mt-[5px] w-[100%] flex-wrap'>
{filterList.map((data,id)=>{
return  (isFilter&&<button value={data} onClick={(e)=>onClickFilter(e)} className={`p-[2px_10px] mt-[5px] text-center truncate cursor pointer max-w-[150px] ${folderFilter.category===data?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>{data}</button>)
})}     
 </div>

        {isSort&&<ul className='flex max-[400px]:gap-[3%] gap-[10%] mt-[20px] flex-wrap'>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} onClick={()=>onclickSort('atoz')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${folderFilter.sort==='atoz'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} onClick={()=>onclickSort('ztoa')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${folderFilter.sort==='ztoa'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} onClick={()=>onclickSort('newtoold')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${folderFilter.sort==='newtoold'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpShortWide} style={{ width: "20px", height: "20px" }} onClick={()=>onclickSort('oldtonew')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${folderFilter.sort==='oldtonew'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
        </ul>}

      </div>
      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

       <ul
      id='folders'
      ref={containerRef}
      onScroll={handleScroll}
      className='max-h-[80vh] overflow-y-auto max-sm:justify-center p-1 overflow-y-scroll hide-scrollbar'
    >
  {folderList && folderList.length > 0 ? (
    folderList.map((data, id) => (
      
      <li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[25px] rounded-[10px] my-[10px] w-[200px] hover:scale-[1.02]'>
        <Link to={`/notes/${data.folderId}`}><img className='mx-auto my-[8px]' id='folderlogo' src={folderLogo} alt="folder" /></Link>
        <p id='folderName' className='text-center truncate w-full'>
          {data?.name}
        </p>
        <div className='flex justify-center gap-[25px] my-[25px] flex-wrap'>
          <FontAwesomeIcon icon={faTrash} onClick={() => onclickDelete(data)} className='text-[#878787] hover:text-red-500' />
          <FontAwesomeIcon icon={faEdit} onClick={() => onclickEdit(data)} className='text-[#878787] hover:text-yellow-500' />
        </div>
        <p className='text-[#878787] text-[13px] flex justify-center gap-[5px]'>
          <span><FontAwesomeIcon className='text-[#878787]' icon={faClock}/></span>
          {`${data?.date}, ${data?.time}`}
        </p>
      </li>
    ))
  ) : (
    <h1 className='text-white mx-auto font-bold text-[25px]'>No Result Found</h1>
  )}
</ul>

    </div>
  )
}

export default Folder
