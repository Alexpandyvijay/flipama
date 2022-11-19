import React,{ useContext, useEffect, useState} from "react";
import axios from 'axios';
import { userContext } from "./main";
import './history.css';

function Items (props) {
    return(
        <div className="hisTable">
        <h3>{props.list.date.split('T')[0]}</h3>
        <table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
                {props.list.product_list.map((list)=>{
                 return (
                    <tr>
                        <td>{list.product_name}</td>
                        <td>{list.product_quantity}</td>
                        <td>{list.product_price}</td>
                        <td>{list.total_price}</td>
                    </tr>
                 )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{background : "#318CE7",color : "white"}}>{props.list.total}</td>
                </tr>
            </tfoot>
        </table>
        </div>
    )
}

export default function History () {
    const [user]= useContext(userContext);
    const [his,setHis]=useState([]);
    useEffect(()=>{
        const fetchHistory=async()=>{
            let res = await axios.get('http://localhost:5000/history',{
                headers : {
                    "authorization" : user.accessToken
                }
            })
            if(res.data.status === 'failed') {
                res.data.message==='no history to show'?setHis('NO HISTORY'):setHis('Please login');
            }else{
                setHis(res.data.data);
            }
        }
        fetchHistory();
    },[]);
    return (
        <div className="history">
            {
                his==='NO HISTORY'||his==='Please login'?<h3>{his}</h3>:
                his.map((item)=>{
                    return (<Items list={item}/>)
                })
            }
        </div>
    )
}