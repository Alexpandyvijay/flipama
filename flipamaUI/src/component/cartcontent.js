import {useDispatch} from "react-redux";
import React from "react";
export default function AddCart(props){
    const dispatch = useDispatch();
    const decHandler = () => {
        dispatch({
            type : 'remove',
            playload : props.obj
        })
    }
    const incHandler=()=>{
        dispatch({
            type : 'add',
            playload : props.obj
        })
    }
    const removeHandler=()=>{
        dispatch({
            type : 'delete',
            playload : props.obj
        })
    }
    return(
        <tr>
            <td>{props.obj.product_name}</td>
            <td><button onClick={decHandler}>-</button><span>{props.obj.quantity}</span><button onClick={incHandler}>+</button></td>
            <td>{props.obj.product_price}</td>
            <td>{props.obj.total_price}</td>
            <td><button id="remove" onClick={removeHandler}>remove</button></td>
        </tr>
    );
}