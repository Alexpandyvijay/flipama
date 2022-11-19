import React from "react";
import './admin.css';

export default function Admin(){
    return(
        <div className="admin">
            <h1>Add product details</h1>
            <form>
                <label>Category</label>
                <input type='text'></input><br/>
                <label>Product Name</label>
                <input type='text'></input><br/>
                <label>Quantity</label>
                <input type='text'></input><br/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}