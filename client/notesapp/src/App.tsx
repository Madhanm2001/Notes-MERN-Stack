import './App.css'
import AllNotes from './component/AllNotes.js'
import Folder from './component/folder.js'
import Navbar  from './component/Navbar.js'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './component/Auth.js'
import FormModal from './common/FormModal.js'
import Profile from './component/Profile.js'
import AllFolders from './component/AllFolders.js'
import NotesContent from './component/NotesContent.js'
import NotesShare from './component/NotesShare.js'

function App() {
  return (
    <>
    <BrowserRouter>
    {!window.location.pathname.includes('/notes-view') && <Navbar/>}
    <Routes>
      <Route path='/' element={<Folder/>}/>
      <Route path="/notes/:id?" element={<AllNotes />} />
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/modal' element={<FormModal/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/folder' element={<AllFolders/>}/>
      <Route path='/notes-content/:id?' element={<NotesContent/>}/>
      <Route path='/notes-view/:id?' element={<NotesShare/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
