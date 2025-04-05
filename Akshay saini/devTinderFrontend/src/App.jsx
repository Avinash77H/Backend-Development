import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Body from './pages/Body'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Profile from './pages/Profile'
import Connection from './components/Connection'
import Requests from './components/Requests'
import Signup from './components/SignUp'
function App() {
  
  return (
    <div data-theme='night'>
      <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/' element={<Feed/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/connection' element={<Connection/>}/>
            <Route path='/requests' element={<Requests/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
