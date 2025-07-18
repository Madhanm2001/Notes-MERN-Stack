import React, { useEffect, useRef, useState } from 'react'
import appLogo from '../images/AppLogo.jpg'
import '../styles/folder.css'
import searchLogo from '../images/searchLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpAZ, faArrowUpShortWide, faTrash, faThumbtack, faFileCirclePlus, faCopy, faFilter, faArrowUpZA, faEdit, faArchive, faClock, faSort } from '@fortawesome/free-solid-svg-icons';
import FormModal from '../common/FormModal'
import TextEditor from '../common/TextEditor'
import AllFolders from './SideBarList'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/UseFetch'
import { URL } from '../Api/settings'
import UseValidator from '../hooks/UseValidator'
import { toast } from 'react-toastify';


const AllNotes: React.FC = () => {

  const { id } = useParams()
  const { axiosFunction } = useFetch()
  const navigate = useNavigate()
  const[initalLoading,setInitalLoading]=useState(true)
  const[load,setLoad]=useState(false)
  const [noteFilter, setNoteFilter] = useState({ page: 1, category: 'all', sort: 'newtoold', limit: 10 })

  useEffect(() => {
  const token = localStorage.getItem('NotesToken')
  if (!token) {
    navigate('/auth')
  }
    console.log(id);
    if(!load){
    fetchNotes()
    }
  }, [noteFilter])

  const [notesList, setNotesList] = useState([{ name: '', noteId: '', date: '', time: Date(), isPinned: false, isArchived: false }])
  const [isFilter, setIsFilter] = useState(false)
  const [deleteShow, setDeleteShow] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [SortVal, setSortVal] = useState('')
  const [show, setShow] = useState(false)
  const [notesId, setNotesId] = useState('')
  const { noteValidator } = UseValidator()
  const [notesDetail, setNotesDetail] = useState({ name: '', content: '' })
  const [noteErr, setNoteErr] = useState({ name: '', content: '' })
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState('')
  const debounceRef = useRef<any>(null);

  console.log(notesList);


  const onClickFilter = (data: string) => {
    setIsSearchLoading(true)
    setNoteFilter(ps => ({
      ...ps,
      category: data,
      page: 1
    }))
    setHasMore(true)
    setSearchValue('')
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }
  const onSubmitNote = () => {
    const error = noteValidator(notesDetail) || {}
    const params = notesId || "";
    setNoteErr(error)
    if (Object.keys(error).length === 0) {
    setIsSearchLoading(true)
      axiosFunction('put', notesId ? URL.Note.update : URL.Note.create, params || id, '', notesDetail)
        .then(() => {
          setNoteFilter(ps => ({ ...ps, page: 1 }));
          setShow(false)
          if (notesId) {
            toast.info('note is updated')
          }
          else {
            toast.info('note is created')
          }
          setHasMore(true);
          if (containerRef.current) {
            containerRef.current.scrollTop = 0;
          }
        })
    }
  }

  const onTooglePinned = (data: any) => {
    setIsSearchLoading(true)
    if (data.isPinned) {
      axiosFunction('put', URL.Note.unpinned, data.noteId, '', { isPinned: true }).then(() => {
        setNoteFilter(ps => ({
          ...ps,
          page: 1
        }))
        toast.info('note is unpinned')
      })
    }
    else {
      axiosFunction('put', URL.Note.pinned, data.noteId, '', { isPinned: false }).then(() => {
        setNoteFilter(ps => ({
          ...ps,
          page: 1
        }))
        toast.info('note is pinned')
      })
    }
    setHasMore(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }
  const onToogleArchived = (data: any) => {
    console.log(typeof (data.noteId), data.isArchived);
setIsSearchLoading(true)
    if (data.isArchived) {
      axiosFunction('put', URL.Note.unarchived, data.noteId, '', { isArchived: false }).then(() => {
        setNoteFilter(ps => ({
          ...ps,
          page: 1
        }))
        toast.info('note is unarchived')
      })
    } else {
      axiosFunction('put', URL.Note.archived, data.noteId, '', { isArchived: true }).then(() => {
        setNoteFilter(ps => ({
          ...ps,
          page: 1
        }))
        toast.info('note is archived')
      })
    }
    setHasMore(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

  }

  const onchangeNote = (content: any) => {

    setNotesDetail(ps => ({
      ...ps,
      content: content
    }))

  }

  const TimeFormat = (time: any) => {

    const tim = time?.split('T')

    const d = tim[1]?.split(':')
    console.log(tim, d);

    const date = tim[0].split('-')

    return { date: `${date[2]}/${date[1]}/${date[0]}`, time: `${d[0]}:${d[1]} ${d[0] > 12 ? 'PM' : 'AM'}` }


  }
  const fetchNotes = () => {
    if (id) {
      axiosFunction("get", URL.Note.getAllByFolder, id, {
        filter: noteFilter.category,
        sort: noteFilter.sort,
        page: noteFilter.page,
        limit: noteFilter.limit
      }, '').then((res) => {
        const note = res?.notes.map((data: any) => ({
          name: data.name,
          date: TimeFormat(data.updatedAt).date,
          time: TimeFormat(data.updatedAt).time,
          noteId: data.noteId,
          isPinned: data.isPinned,
          isArchived: data.isArchived
        }))
        setIsSearchLoading(false)
        setInitalLoading(false)
        setSearchValue('');
        setLoad(false)
        if (noteFilter.page > 1) {
          setNotesList(prev => [...prev, ...note])
        } else {
          setNotesList(note)
        }
        if (note.length < noteFilter.limit) {
          setHasMore(false)
        }
      })
    }
    else {
      axiosFunction("get", URL.Note.getAll, '', {
        filter: noteFilter.category,
        sort: noteFilter.sort,
        page: noteFilter.page,
        limit: noteFilter.limit
      }, '')
      .then((res) => {
        const note = res?.notes.map((data: any) => ({
          name: data.name,
          date: TimeFormat(data.updatedAt).date,
          time: TimeFormat(data.updatedAt).time,
          noteId: data.noteId,
          isPinned: data.isPinned,
          isArchived: data.isArchived
        }))
        setIsSearchLoading(false)
        setInitalLoading(false)
        setLoad(false)
        setSearchValue('')

        if (noteFilter.page > 1) {
          setNotesList(prev => [...prev, ...note])
        } else {
          setNotesList(note)
        }
        if (note.length < noteFilter.limit) {
          setHasMore(false)
        }
      })
      .catch(()=>{
        setIsSearchLoading(false)
        setInitalLoading(false)
        setLoad(false)

      })
    }

  }

  const onchangeNoteName = (e: any) => {

    const { name, value } = e.target

    setNotesDetail(ps => ({
      ...ps,
      [name]: value
    }))

  }

  console.log(notesDetail);

  const onclickEdit = (data: any) => {
    console.log(data);
    setNotesId(data.noteId)
    axiosFunction("get", URL.Note.get, data.noteId, "", "").then((res) => {
      setNotesDetail({ name: res.name, content: res.content })
      setShow(true)
    })

  }

  const handleSortClick = (sortValue: any) => {
    setSortVal(sortValue);
    navigator.clipboard.writeText(sortValue)
      .then(() => {
        console.log("Copied:", sortValue)
        toast.info('note link is copied')
      }
      )
      .catch(err => console.error("Copy failed", err));
  }

  const onclickSort = (sort: any) => {
    setIsSearchLoading(true)
    setNoteFilter(ps => ({
      ...ps,
      sort: sort,
      page: 1
    }));
    setSearchValue('')
    setHasMore(true);
  }

const onclickSearch = (e: any) => {  
  const value = e.target.value;
  setLoad(value.trim().length>=3 ? true : false)
  setSearchValue(value);
  setIsFilter(false)
  if(value.trim().length>=3){
setNoteFilter(ps => ({
    ...ps,
    category: 'all',
    sort: 'newtoold'
  }))
  }
  
  setIsSort(false)
  if (debounceRef.current) {
    clearTimeout(debounceRef.current)
  }
  debounceRef.current = setTimeout(() => {
    if (value.trim().length>=3) {
      axiosFunction("get", id ? URL.Note.searchByFolder : URL.Note.searchAll, id, { name: value }, "")
        .then((res) => {
          const notes = res?.map((data: any) => ({
            name: data.name,
            date: TimeFormat(data.updatedAt).date,
            time: TimeFormat(data.updatedAt).time,
            noteId: data.noteId,
            isArchived: data.isArchived,
            isPinned: data.isPinned,
          }))
          setNotesList(notes);
          setLoad(false)
        })
    }
  }, 300);

  setHasMore(true)
  if (containerRef.current) {
    containerRef.current.scrollTop = 0;
  }
}


  console.log(searchValue,"searchValue");

  const onclickDelete = (data: any) => {
    setNotesId(data.noteId)
    setDeleteShow(true)
  };


  const onDeleteConfirm = () => {
    console.log(notesId, 'folderId');
    setIsSearchLoading(true)
    axiosFunction("delete", URL.Note.delete, notesId, "", "")
      .then(() => {
        setNoteFilter(ps => ({ ...ps, page: 1 }));
        toast.error('Note is Deleted')
        setHasMore(true);
        setDeleteShow(false)
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      });
  };

  const onclickClearAll = () => {
    setIsSearchLoading(true)
    setNoteFilter({
      category: "all",
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

  const CreateFolder = () => {
    setShow(true)
    setNotesDetail({ name: '', content: '' })
    setNoteErr({ name: '', content: '' })
    setNotesId('')
  }

  const handleScroll = () => {
    if (!containerRef.current || !hasMore) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollTop + clientHeight >= scrollHeight - 5 && !searchValue) {
      setNoteFilter(ps => ({ ...ps, page: ps.page + 1 }))
}

  }

  return (
    <div>
      {id && 
      <div className='text-[white] flex justify-end m-[30px] text-[15px] cursor-pointer ' onClick={() => { navigate(-1) }}>{'< back to folders'}</div>}
      <div className='flex flex-wrap justify-between m-[25px] relative'>

        <AllFolders />
        {/* <FontAwesomeIcon icon={faFileCirclePlus} style={{height:'40px',width:'40px'}} className={`${show?'text-[#cdca00]':'text-[#878787]'} mt-[20px] cursor-pointer`} onClick={()=>setShow(true)}/> */}
        <div className='flex gap-[80px] max-sm:gap-[10px] flex-wrap relative'>
          <span className='flex gap-1'>
            <input
              type="text"
              className='border-[2px] border-white text-white h-[35px] sm:w-[500px] w-[200px] rounded mt-[25px] p-[0_10px]'
              value={searchValue}
              onChange={onclickSearch}
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] p-[0_10px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded cursor-pointer'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
        <p onClick={onclickClearAll} className='text-white mt-[25px] cursor-pointer hover:text-red-500'>clear all</p>
      </div>
      <FormModal
        show={deleteShow}
        isNotes={false}
        onlayoutclose={() => setDeleteShow(false)}
        cancel={() => setDeleteShow(false)}
        content='Are you sure you want to delete this note?'
        footer={
          <>
            <button className='button cursor-pointer' onClick={onDeleteConfirm}>delete</button>
            <button className='button cursor-pointer' onClick={() => setDeleteShow(!deleteShow)}>cancel</button>
          </>
        }
      />

      <FormModal
        show={show}
        isclose={true}
        isNotes={true}
        onclose={() => setShow(false)}
        onlayoutclose={() => setShow(false)}
        cancel={() => setShow(false)}
        header={notesId ? 'Update-Notes' : 'Create-Notes'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Title:</label>
            <input type="text" name='name' value={notesDetail.name} onChange={onchangeNoteName} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{noteErr.name}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Content:</label>
            <div> <TextEditor content={notesDetail.content} onChange={onchangeNote} /></div>
            <div className='text-[red] text-[12px]'>{noteErr.content}</div>
          </div>
        </>}
        footer={
          <>
            <button className='button' onClick={onSubmitNote}>submit</button>
            <button className='button' onClick={() => setShow(!show)}>cancel</button>
          </>
        }
      />

      <div className='flex justify-between m-[25px]'>
        <li className='cursor-pointer flex gap-[50px]'>
          <FontAwesomeIcon icon={faFilter} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isFilter ? 'text-black bg-[#cdca00]' : 'text-black bg-[#878787]'} p-2 rounded`} onClick={() => { setIsFilter(!isFilter), setIsSort(false) }} />
          {window.location.pathname !== '/notes' && <FontAwesomeIcon icon={faFileCirclePlus} style={{ height: '40px', width: '40px' }} className={`${show ? 'text-[#cdca00]' : 'text-[#878787]'} cursor-pointer`} onClick={CreateFolder} />}
        </li>
        <li className='cursor-pointer'><FontAwesomeIcon onClick={() => { setIsSort(!isSort), setIsFilter(false) }} icon={faSort} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isSort ? 'text-black bg-[#cdca00]' : 'text-black bg-[#878787]'} p-2 rounded`} /></li>
      </div>

      <div className='flex justify-between w-[100%]'>
        <div className='flex bg-black p-3 gap-[3%] rounded mt-[5px] w-[100%] flex-wrap'>

          {isFilter && <>
            <button onClick={() => onClickFilter('all')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${noteFilter.category === 'all' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>All</button>
            <button onClick={() => onClickFilter('active')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${noteFilter.category === 'active' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Active</button>
            <button onClick={() => onClickFilter('archived')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${noteFilter.category === 'archived' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Archived</button>
          </>}
        </div>

        {isSort && <ul className='flex max-[400px]:gap-[3%] gap-[10%] mt-[20px] flex-wrap'>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} onClick={() => onclickSort('atoz')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${noteFilter.sort === 'atoz' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} onClick={() => onclickSort('ztoa')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${noteFilter.sort === 'ztoa' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} onClick={() => onclickSort('newtoold')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${noteFilter.sort === 'newtoold' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpShortWide} style={{ width: "20px", height: "20px" }} onClick={() => onclickSort('oldtonew')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${noteFilter.sort === 'oldtonew' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
        </ul>}


      </div>




      {/* <div className='flex gap-[3%]'>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>All</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Active</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Archived</button>
      </div> */}


      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='notes' ref={containerRef} onScroll={handleScroll} className='max-h-[100vh] overflow-y-auto max-sm:justify-center p-1 overflow-y-scroll hide-scrollbar'>
        {isSearchLoading || load || initalLoading ?
          <div className="flex justify-center items-center p-10 w-full text-[]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          : notesList.length > 0 ? notesList?.map((data, id) => {
            return (<li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[25px] rounded-[10px] my-[10px] w-[201px] hover:scale-[1.02]'>
              <div className="shadow rounded flex ">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  onClick={() => onTooglePinned(data)}
                  className={`${data.isPinned ? 'text-[#00809f]' : "text-[#878787]"} hover:text-blue-500 transition-colors duration-300 ms-auto cursor-pointer`}
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>

              <Link to={`/notes-content/${data.noteId}`}><img className='mx-auto my-[8px] cursor-pointer' id='noteslogo' src={appLogo} alt="" /><p id='folderName' className='text-center truncate w-full cursor-pointer'>{data.name}</p></Link>
              <div className='flex justify-center gap-[25px] my-[25px]'>
                <FontAwesomeIcon icon={faTrash} className='text-[#878787] hover:text-red-500 cursor-pointer' onClick={() => onclickDelete(data)} />
                <FontAwesomeIcon icon={faEdit} className='text-[#878787] hover:text-yellow-500 cursor-pointer' onClick={() => onclickEdit(data)} />
                <FontAwesomeIcon icon={faArchive} className={`${data.isArchived ? 'text-[#cf8000]' : 'text-[#878787]'} hover:text-orange-500 cursor-pointer`} onClick={() => onToogleArchived(data)} />
                <FontAwesomeIcon icon={faCopy} onClick={() => handleSortClick(`localhost:5173/notes-view/${data.noteId}`)} className='text-[#878787] hover:text-green-500 cursor-pointer' />
              </div>
              <p className='text-[#878787] text-[13px] flex justify-center gap-[10px] '><span><FontAwesomeIcon className='text-[#878787]' icon={faClock} /></span>{`${data?.date}, ${data?.time}`}</p>
            </li>)
          }) : (
            <h1 className='text-white mx-auto font-bold text-[25px]'>No More Note :(</h1>
          )}
      </ul>
    </div>
  )
}


export default AllNotes
