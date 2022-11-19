import { createStore } from 'redux';

function reducer(state={orderList:[],totalCount:0,totalAmount:0},action){
    if(action.type === "add"){
        let arr=[];
        let obj = {};
        let exist =false;
        for(let k=0;k<state.orderList.length;k++){
            if(state.orderList[k]._id===action.playload._id){
                state.orderList[k].quantity += 1;
                state.orderList[k].total_price += action.playload.product_price
                exist = true;
            }
        }
        if(exist){
            obj.orderList = [...state.orderList];
        }else{
            arr.push(action.playload);
            obj.orderList = [...state.orderList,...arr]
        }
        obj.totalCount = state.totalCount+1;
        obj.totalAmount = state.totalAmount+action.playload.product_price;
        return {...state,...obj};
    }else if(action.type==='remove'){
        let objRemove = {};
        let arrRemove = [];
        for(let j=0;j<state.orderList.length;j++){
            if(state.orderList[j]._id!==action.playload._id){
                    arrRemove.push(state.orderList[j]);
            }else{
                state.orderList[j].quantity-=1;
                if(state.orderList[j].quantity>0){
                    state.orderList[j].total_price-=action.playload.product_price;
                    arrRemove.push(state.orderList[j]);
                }
            }
        } 
        objRemove.totalCount = state.totalCount-1;
        objRemove.totalAmount = state.totalAmount-action.playload.product_price;          
        objRemove.orderList = [...arrRemove];
        return {...state,...objRemove};
    }else if(action.type==='delete'){
        let objDelete = {};
        let arrDelete = [];
        for(let j=0;j<state.orderList.length;j++){
            if(state.orderList[j]._id!==action.playload._id){
                    arrDelete.push(state.orderList[j]);
            }else{
                objDelete.totalCount = state.totalCount-action.playload.quantity;
                objDelete.totalAmount = state.totalAmount-(action.playload.product_price*action.playload.quantity); 
            }
        }           
        objDelete.orderList = [...arrDelete];
        return {...state,...objDelete};

    }else if(action.type==='clear'){
        state = {orderList:[],totalCount:0,totalAmount:0}
        return state;
    }
    return state;
}


const store = createStore(reducer);

export default store;