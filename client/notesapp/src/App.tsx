import './App.css'
import AllNotes from './component/AllNotes.js'
import Folder from './component/folder.js'
import Navbar from './component/Navbar.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './component/Auth.js'
import FormModal from './common/FormModal.js'
import Profile from './component/Profile.js'
import AllFolders from './component/SideBarList.js'
import NotesContent from './component/NotesContent.js'
import NotesShare from './component/NotesShare.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './common/PrivateRoute.js'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {!window.location.pathname.includes('/notes-view') && <Navbar />}
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/notes-view/:id?' element={<NotesShare />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Folder />} />
              <Route path='/notes/:id?' element={<AllNotes />} />
              <Route path='/modal' element={<FormModal />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/folder' element={<AllFolders />} />
              <Route path='/notes-content/:id?' element={<NotesContent />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick={false}
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Slide}
            closeButton={false}
          />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
