import React,{useState} from "react";
import Slider from './slider';
import User from './user';
import Admin from './admin';
import History from "./history";


export default function CartChanger(){
    const [router,setRouter] = useState('user');
    const routerHandler=()=>{
        if(router==='user'){
            return <User/>
        }else if(router==='admin'){
            return <Admin/>
        }else{
            return <History/>
        }
    }
    return(
        <>
            <section>
                <Slider/>
            </section>
            <section>
                <div className='router'>
                    <h3 onClick={()=>setRouter('admin')}>Admin</h3>
                    <h3 onClick={()=>setRouter('user')}>Customer</h3>
                    <h3 onClick={()=>setRouter('history')}>History</h3>
                </div>
                {routerHandler()}
            </section>
        </>
    )
}