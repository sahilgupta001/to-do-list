import { useState, useEffect } from 'react';
import { checkedList, uncheckedList } from './data';

export default function List() {
    
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState({});

    useEffect(() => {
        setPendingTasks(uncheckedList);
    }, [])

   
    const markAsChecked = (key, data) => {
        delete uncheckedList[key];
        checkedList[key] = data;
        console.log(uncheckedList)
        console.log(checkedList)
    }

    const unCheckedListHTML = () => {
        var html = Object.keys(uncheckedList).map((uncheckedItem, index) => (
            <>
                <div className = "col-1">
                    <h6>{index + 1}</h6>
                </div>
                <div className='col-8'>
                    <p className='float-left'>{uncheckedList[uncheckedItem].description}</p>
                </div>
                <div className = 'col-3'>
                    <button 
                        onClick = {() => {markAsChecked(uncheckedItem, uncheckedList[uncheckedItem])}}
                        className = "btn btn-sm btn-info">Check</button>
                </div>
            </>
        ))
        return html;
    }

    const checkedListHTML = () => {
        var html = Object.keys(checkedList).map((checkedItem, index) => (
            <>
                <div className = "col-1">
                    <h6>{index + 1}</h6>
                </div>
                <div className='col-11'>
                    <p className='float-left'>{checkedList[checkedItem].description}</p>
                </div>
            </>
        ))
        return html;
    }
    
    return (
        <section className='container mt-5'>
            <div className = "row">
                <div className = "col-6">
                    <div className = "card">
                        <div className = "card-title mt-4">
                            <h3 className = "font-weight-bold">Tasks to be done</h3>
                        </div>
                        <div className = "card-body">
                            <div className = "row">
                                {unCheckedListHTML()}                   
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "col-6">
                    <div className = "card">
                        <div className = "card-title mt-4">
                            <h3 className = "font-weight-bold">Completed Tasks</h3>
                        </div>
                        <div className = "card-body">
                            <div className = "row">
                                {checkedListHTML()}  
                            </div>      
                        </div>           
                    </div>
                </div>
            </div>
        </section>
    );
}