import { useState, useEffect } from 'react';
import { uncheckedList } from './data';
import List from './list'
import TaskForm from './taskForm';

export default function Dashboard() {
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
    
    return (
        <section className='container mt-5'>
            <div className = "row mb-3">
                <TaskForm />
            </div>
            <div className = "row">
                <div className = "col-6">
                    <List 
                        list = {pendingTasks}
                        fireListEvent = {markAsChecked}
                        buttonText = "Check"
                        title = "Tasks to be done !!"
                    />
                </div>
                <div className = "col-6">
                    <List
                        list = {completedTasks}
                        fireListEvent = {markAsUnchecked}     
                        buttonText = "Un-Check"
                        title = "Completed Tasks"
                    /> 
                </div>
            </div>
        </section>
    );
}