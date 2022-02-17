import { useState, useEffect } from 'react';
import Description from './description';
import List from './list'
import TaskForm from './taskForm';
import axios from 'axios';
import Header from './header';

export default function Dashboard() {
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState();
    const [currentItemInView, setCurrentItemInView] = useState(undefined);
    const [disableButton, setDisableButton ] = useState(false);

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
            setPendingTasks([
                ...pendingTasks,
                res.data.data
            ])
        }).catch((err) => {
            console.log(err)
        })
        
    }

    const deleteFromList = (id) => {
        setDisableButton(true)
        axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
            headers : {
                Authorization : localStorage.getItem('token')    
            }
        })
        .then((res) => {
            let pendingTasksCopy = pendingTasks.filter(item => item._id !== id);
            setPendingTasks(pendingTasksCopy)
            setDisableButton(false)
        }).catch((err) => {
            setDisableButton(false)
        })
    }
   
    const markAsChecked = (key, data) => {
        setDisableButton(true)
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: true
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setCompletedTasks([
                ...completedTasks,
                data
            ])
            let pendingTasksCopy = pendingTasks.filter(item => item !== data);
            setPendingTasks(pendingTasksCopy)
            setDisableButton(false)
        }).catch((err) => {
            console.log(err)
            setDisableButton(false)
        })
    }

    const markAsUnchecked = (key, data) => {
        setDisableButton(true)
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: false
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            let completedTasksCopy = completedTasks.filter(item => item !== data);
            setCompletedTasks(completedTasksCopy)
            setPendingTasks([
                ...pendingTasks,
                data   
            ])
            setDisableButton(false)
        }).catch((err) => {
            setDisableButton(false)    
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
            <Header />
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
                        listType = {1}
                        deleteFromList = {deleteFromList}
                        disableButton = {disableButton}
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
                        disableButton = {disableButton}
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