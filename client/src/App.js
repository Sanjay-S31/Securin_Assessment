import {BrowserRouter, Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import CVEDetail from './pages/CVEDetail'

export default function App(){
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/item' element={<CVEDetail/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}