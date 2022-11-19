import React ,{useState,createContext} from 'react';
import './main.css';
import CartChanger from './cartChanger';
import {BrowserRouter as Router, Routes , Route, Link} from 'react-router-dom';
import UserCart from './userCart';
import SignIn from './signin';
import SignUp from './signup';
import {useSelector} from 'react-redux'
const userContext = createContext([]);
export default function StoreCart(){
    const [disable , setDisable] = useState(true);
    const counter = useSelector(state=>state.totalCount);
    const [user , setUser] = useState({
        userId : '',
        accessToken : ''
      })
    return(
        <Router>
        <div className='main'>
            <header>
                <h1>FlipAma</h1>
                {disable && <Link to='/signin'><button id='login' onClick={()=>setDisable(false)}>login</button></Link>}
                {disable && <Link to='/signup'><button id='signup' onClick={()=>setDisable(false)}>Sign Up</button></Link>}
                {!disable && <Link to='/'><button id="logout" onClick={()=>{setUser({userId:'',accessToken:''});setDisable(true);}}>Logout</button></Link>}
                <h3>{user.userId.split('@')[0] || "Hello Guest"}</h3>
                <Link to='/userCart'><button id='cart'><img src={require('../image/shopping-cart.png')} alt='cart'></img><span id='counter'>{counter || 0}</span></button></Link>
            </header>
            <userContext.Provider value={[user,setUser]}>
            <Routes>
                <Route path='/' element={<CartChanger/>}></Route>
                <Route path='/userCart' element={<UserCart/>}></Route>
                <Route path='/signin' element={<SignIn/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
            </Routes>
            </userContext.Provider>
        </div>
        </Router>
    );
}
export {userContext};