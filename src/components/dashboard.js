import { useState, useEffect } from 'react';
import Description from './description';
import List from './list'
import TaskForm from './taskForm';
import axios from 'axios';

export default function Dashboard() {
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentItemInView, setCurrentItemInView] = useState(undefined);

    useEffect(() => {
        fetchPendingTasks();
        fetchCompletedTasks();
    }, [])

    const fetchPendingTasks = () => {
        axios.get('https://api-nodejs-todolist.herokuapp.com/task?completed=false', {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setPendingTasks(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchCompletedTasks = () => {
        axios.get('https://api-nodejs-todolist.herokuapp.com/task?completed=true', {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setCompletedTasks(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const addToList = (description) => {
        axios.post('https://api-nodejs-todolist.herokuapp.com/task', {
            description: description
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setPendingTasks({
                ...pendingTasks,
                [res.data.data._id] : {
                    description: res.data.data.description,
                    timestamp : res.data.data.createdAt 
                }
            })
        }).catch((err) => {
            console.log(err)
        })
        
    }
   
    const markAsChecked = (key, data) => {
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: true
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setCompletedTasks({
                ...completedTasks,
                [key] : data
            })
            let pendingTasksCopy = pendingTasks.filter(item => item !== data);
            setPendingTasks(pendingTasksCopy)
        }).catch((err) => {
            console.log(err)
        })
    }

    const markAsUnchecked = (key, data) => {
        let completedTasksCopy = completedTasks;
        delete completedTasksCopy[key];
        setCompletedTasks(completedTasksCopy)

        setPendingTasks({
            ...pendingTasks,
            [key] : data
        })
    }

    const viewTask = (key, data) => {
        setCurrentItemInView({
            key: key,
            data : data
        })
    }
    
    return (
        <section className='container mt-5'>
            <div className = "row mb-3">
                <TaskForm 
                    pendingTasks = {pendingTasks}
                    addToList = {addToList}
                />
            </div>
            <div className = "row">
                <div className = "col-6">
                    <List 
                        list = {pendingTasks}
                        fireListEvent = {markAsChecked}
                        buttonText = "Check"
                        title = "Tasks to be done !!"
                        viewTask = {viewTask}
                        currentItemInView = {currentItemInView}
                    />
                </div>
                <div className = "col-6">
                    <List
                        list = {completedTasks}
                        fireListEvent = {markAsUnchecked}     
                        buttonText = "Un-Check"
                        title = "Completed Tasks"
                        viewTask = {viewTask}
                        currentItemInView = {currentItemInView}
                    /> 
                </div>
            </div>
            {currentItemInView &&
                <div className='row'>
                    <Description 
                        task = {currentItemInView}
                    /> 
                </div>
            }
        </section>
    );
}