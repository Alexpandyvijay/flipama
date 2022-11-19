import React ,{useEffect, useMemo, useState} from "react";
import './userCart.css';
import {useNavigate} from 'react-router-dom';
import store from "../store";

const AddCart = (props)=>{
    const {data,setData} = {...props};
    const [count,setCount]=useState(1);
    const decHandler = () => {
        let newupdate = {
            totalCount : data.totalCount-1,
            totalAmount : data.totalAmount-parseInt(props.obj.product_price)
        }
        store.dispatch({
            type : 'totalCount',
            playload : newupdate.totalCount
        })
        store.dispatch({
            type : 'totalAmount',
            playload : newupdate.totalAmount
        })
        store.dispatch({
            type : 'dec',
            playload : props.obj._id
        })
        setData({...data,...newupdate});
        count>0?setCount(count-1):setCount(0);
    }
    const incHandler=()=>{
        let newupdate = {
            totalCount : data.totalCount+1,
            totalAmount : data.totalAmount+parseInt(props.obj.product_price)
        }
        store.dispatch({
            type : 'totalCount',
            playload : newupdate.totalCount
        })
        store.dispatch({
            type : 'totalAmount',
            playload : newupdate.totalAmount
        })
        store.dispatch({
            type : 'inc',
            playload : props.obj._id
        })
        setData({...data,...newupdate});
        setCount(count+1);
    }
    const removeHandler=()=>{
        store.dispatch({
            type : 'remove',
            playload : props.obj._id
        })
        props.removeElement(props.obj._id);
    }
    return(
        <tr>
            <td>{props.obj.product_name}</td>
            <td><button onClick={decHandler}>-</button><span>{count}</span><button onClick={incHandler}>+</button></td>
            <td>{props.obj.product_price}</td>
            <td>{count * parseInt(props.obj.product_price)}</td>
            <td><button id="remove" onClick={removeHandler}>remove</button></td>
        </tr>
    );
}

export default function UserCart() {
    const navigate = useNavigate();
    const [list,setList]=useState([]);
    const [data,setData]=useState({
        totalCount : 0,
        totalAmount : 0
    })

    useEffect(()=>{
        let listofobj = store.getState();
        try{
            if(listofobj.orderList.length){
                setList(listofobj.orderList);
            }
        }catch{
            setList([]);
        }
    },[])

    const removeElement = (id) =>{
        let newList = list.filter((item)=>{
            if(item._id!==id){
                return item;
            }
        })
        setList(newList);
    }

    useMemo(()=>{
        let totalvalue = 0;
        for(let obj of list){
            totalvalue += parseInt(obj.product_price);
        }
        let newupdate = {
            totalCount : list.length,
            totalAmount : totalvalue
        }
        store.dispatch({
            type : 'totalCount',
            playload : newupdate.totalCount
        })
        store.dispatch({
            type : 'totalAmount',
            playload : newupdate.totalAmount
        })
        setData({...data,...newupdate});
    },[list])

    return(
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
                {list===0?"":list.map((item,i)=>{
                    return <AddCart key={i+'b'} obj={item} data={data} setData={setData} removeElement={removeElement}/>
                })} 
             </tbody>
             <tfoot>
                <tr>
                    <td>-</td>
                    <td style={{backgroundColor : "#318CE7",color:'white'}}>{data.totalCount}</td>
                    <td>Total</td>
                    <td style={{backgroundColor : "#318CE7",color:'white'}}>{data.totalAmount}</td>
                    <td>-</td>
                </tr>
             </tfoot>
            </table>

        </div>
    );
}