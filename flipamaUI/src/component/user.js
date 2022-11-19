import React, { useEffect,useState,useContext} from "react";
import axios from 'axios';
import Cart from './cart';
import {userContext} from './main.js';

export default function User(){
    let navbar = ['electronics','Fashion','Furniture','Grocery'];
    const [user] = useContext(userContext);
    const [cart,setCart]=useState([]);
    const [category,setCategory] = useState({
        product_type : 'electronics',
        from : 0,
        to : Infinity
    });

    useEffect(()=>{
        const fetchData=async()=>{
            let res = await axios.get(`http://localhost:5000/products/${category.product_type}?from=${category.from||0}&to=${category.to||Infinity}`,{
                headers : {
                    'authorization' : user.accessToken
                }
            })
            if(res.data.status==='failed'){
                res.data.message==='no Product'?setCart(res.data.message):setCart('Please login');
            }else{
                setCart(res.data.data);
            }
        }
        fetchData();
    },[category,user])

    return(
        <div className='user'>
            <div className='nav-bar'>
                <h3>Filter</h3>
                <div className='list'>
                    {navbar.map((list,i)=>{
                        return <div key={i+'a'} onClick={()=>{console.log(list);setCategory({...category,product_type : list})}}>{list}</div>
                    })}
                </div>
            </div>
            <div className='display'>
                <div className="range">
                    <label>Pice range</label>
                    <label>From</label>
                    <input type='text' placeholder="amount" onChange={(e)=>(setCategory({...category,from : parseInt(e.target.value)}))}></input>
                    <label>To</label>
                    <input type='text' placeholder="amount" onChange={(e)=>(setCategory({...category,to : parseInt(e.target.value)}))}></input>
                </div>
                <div className='product-list'>
                    {
                        cart==="no Product"||cart==="Please login"?<h3 id='login'>{cart}</h3>:cart.map((item,i)=>{
                            return <Cart key={i} obj={item}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}