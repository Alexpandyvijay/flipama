import { createStore } from 'redux';

function reducer(state={},action){
    if(action.type === "add"){
        let arr=[];
        let obj = {};
        try{
            let exist = false;
            for(let k=0;k<state.orderList.length;k++){
                if(state.orderList[k]._id===action.playload._id){
                    exist = true;
                }
            }
            if(exist){
                obj.orderList = [...state.orderList,...arr]
            }else{
                arr.push(action.playload);
                obj.orderList = [...state.orderList,...arr]
            }
            state = {...state,...obj}
        }catch{
            arr.push(action.playload)
            obj.orderList = arr
            state = {...state,...obj}
        }
        return state;
    }else if(action.type === 'remove'){
        let objRemove = {};
        try{
            let arrRemove = [];
            for(let j=0;j<state.orderList.length;j++){
                if(state.orderList[j]._id!==action.playload){
                     arrRemove.push(state.orderList[j]);
                }
            }           
            objRemove.orderList = arrRemove;
        }catch{
            console.log('no cart yet added');
        }
        return {...state,...objRemove};
    }else if(action.type === 'inc'){
        let obj = {};
        try{
            let arr = []
            for(let i=0;i<state.orderList.length;i++){
                if(state.orderList[i]._id===action.playload){
                    let ele = state.orderList[i];
                    ele.quantity += 1;
                    arr.push(ele);
                }else{
                    arr.push(state.orderList[i])
                }
            }
            obj.orderList  = arr;
        }catch{
            console.log('no cart yet added')
        }
        return {...state,...obj};
    }else if(action.type === 'dec'){
        let obj = {};
        try{
            let arr = []
            for(let i=0;i<state.orderList.length;i++){
                if(state.orderList[i]._id===action.playload){
                    let ele = state.orderList[i];
                    ele.quantity -= 1;
                    arr.push(ele);
                }else{
                    arr.push(state.orderList[i])
                }
            }
            obj.orderList  = arr;
        }catch{
            console.log('no cart yet added')
        }
        console.log(obj);
        return {...state,...obj};
    }else if(action.type === 'totalCount'){
        let newobjc = {
            totalCount : action.playload
        }
        return {...state,...newobjc}
    }else if(action.type === 'totalAmount'){
        let newobja = {
            totalAmount : action.playload
        }
        return {...state,...newobja}
    }
    return state;
}


const store = createStore(reducer);

export default store;