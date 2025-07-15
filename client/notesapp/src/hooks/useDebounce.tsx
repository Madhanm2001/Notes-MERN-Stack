import { useEffect, useState } from 'react'
import useFetch from './UseFetch'
import { URL } from '../Api/settings'

const useDebounce = (value:string, id:string | undefined) => {
  const { axiosFunction } = useFetch()
  const [data, setData] = useState([])
  const [searchLoad, setSearchLoad] = useState(false)

  const TimeFormat = (time:any) => {
    const tim = time?.split('T')
    const d = tim[1]?.split(':')
    const date = tim[0].split('-')
    return { date: `${date[2]}/${date[1]}/${date[0]}`, time: `${d[0]}:${d[1]} ${d[0] > 12 ? 'PM' : 'AM'}` }
  }

  useEffect(() => {
    if (!value.trim()) {
      setData([])
      return
    }

    setSearchLoad(true)
    const ids = setTimeout(() => {
      axiosFunction("get", id ? URL.Note.searchByFolder : URL.Note.searchAll, id, { name: value }, "")
        .then((res) => {
          const notes = res?.map((data:any) => ({
            name: data.name,
            date: TimeFormat(data.updatedAt).date,
            time: TimeFormat(data.updatedAt).time,
            noteId: data.noteId,
            isArchived: data.isArchived,
            isPinned: data.isPinned,
          }))
          setData(notes)
          setSearchLoad(false)
        })
    }, 300)

    return () => clearTimeout(ids)
  }, [value, id])

  return { data, searchLoad }
}

export default useDebounce
