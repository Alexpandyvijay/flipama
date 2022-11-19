import React,{useContext,useState} from "react";
import './userCart.css';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import AddCart from "./cartcontent";
import axios from 'axios';
import {userContext} from "./main.js";

export default function UserCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pop , setPop] = useState(false);
    const [user] = useContext(userContext);
    let totalItem = useSelector(state=>state.totalCount);
    let totalValue = useSelector(state=>state.totalAmount);
    let listOfItem = useSelector(state=>state.orderList);
    const handlePayment = async ()=>{
        let res = await axios.post('http://localhost:5000/order',{orderList : listOfItem,total : totalValue},{
            headers : {
                "authorization" : user.accessToken
            }
        })
        if(res.data.status === 'failed'){
            alert('Please login');
            navigate('/')
        }else{
            dispatch({
                type : 'clear'
            })
            setTimeout(()=>setPop(true),2000)
        }
    }
    const Popup=()=>{
        return(
            <div className="popup" onClick={()=>setPop(false)}>
                <div className="inside">
                    <img src={require('../image/check.png')} alt='img..'></img>
                    <h1>Success</h1>
                    <h5>Your payment was processed</h5>
                </div>
            </div>
        );
    }

    return(
        <>
        {pop && <Popup></Popup>}
        <div className="userCart">
            <div>
                <button onClick={()=>(navigate('/'))}>Back</button>
            </div>
            <table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {listOfItem.length===0?<tr><td></td></tr>:listOfItem.map((item,i)=>{
                    return <AddCart key={i+'b'} obj={item}/>
                })} 
             </tbody>
             <tfoot>
                <tr>
                    <td>-</td>
                    <td style={{backgroundColor : "#318CE7",color:'white'}}>{totalItem}</td>
                    <td>Total</td>
                    <td style={{backgroundColor : "#318CE7",color:'white'}}>{totalValue}</td>
                    <td>-</td>
                </tr>
             </tfoot>
            </table>
            <div>
                <button onClick={handlePayment}>Proceed to pay</button>
            </div>

        </div>
        </>
    );
}