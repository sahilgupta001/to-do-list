import { useState, useEffect } from 'react';
import { uncheckedList } from './data';

export default function List() {
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState({});

    useEffect(() => {
        setPendingTasks(uncheckedList);
    }, [])
   
    const markAsChecked = (key, data) => {
        setCompletedTasks({
            ...completedTasks,
            [key] : data
        })
        delete pendingTasks[key];
    }

    const markAsUnchecked = (key, data) => {
        delete completedTasks[key];

        setPendingTasks({
            ...pendingTasks,
            [key] : data
        })
    }

    const unCheckedListHTML = () => {
        if (!pendingTasks)
            return <></>
        var html = Object.keys(pendingTasks).map((uncheckedItem, index) => (
            <>
                <div className = "col-1">
                    <h6>{index + 1}</h6>
                </div>
                <div className='col-8'>
                    <p className='float-left'>{pendingTasks[uncheckedItem].description}</p>
                </div>
                <div className = 'col-3'>
                    <button 
                        onClick = {() => {markAsChecked(uncheckedItem, pendingTasks[uncheckedItem])}}
                        className = "btn btn-sm btn-info">Check</button>
                </div>
            </>
        ))
        return html;
    }

    const checkedListHTML = () => {
        if (!completedTasks)
            return <></>
        var html = Object.keys(completedTasks).map((checkedItem, index) => (
            <>
                <div className = "col-1">
                    <h6>{index + 1}</h6>
                </div>
                <div className='col-8'>
                    <p className='float-left'>{completedTasks[checkedItem].description}</p>
                </div>
                <div className = 'col-3'>
                    <button 
                        onClick = {() => {markAsUnchecked(checkedItem, completedTasks[checkedItem])}}
                        className = "btn btn-sm btn-info">Un-Check
                    </button>
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