import React, { useState } from 'react';
import './cart.css';
import { useDispatch} from 'react-redux';

export default function Cart(props) {
    const dispatch = useDispatch();
    const [toggle,setToggle]= useState(true);
    const addToStoreHandler=()=>{
        dispatch({
            type : 'add',
            playload : {
                _id : props.obj._id,
                product_name : props.obj.product_name,
                product_price : props.obj.product_price,
                total_price : props.obj.product_price,
                quantity : 1
            }
        })
        setToggle(false);
    }
    return (
        <div className='cart-box'>
            <div>
                <h1>{props.obj.product_name}</h1>
                <h5>{`Rs ${props.obj.product_price}`}</h5>
                {toggle && <button onClick={addToStoreHandler}>ADD TO CART</button>}
                {!toggle && <button>ADDED</button>}
            </div>
        </div>
    );
}