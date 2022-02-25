import { useState, useEffect, Component } from 'react';
import Description from './description';
import ListComponent from './list'
import TaskForm from './taskForm';
import customInstance from './axios'
import Header from './header';

export default class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disableButton: false
        }
    }

    componentDidMount() {
        this.fetchPendingTasks()
        this.fetchCompletedTasks()
    }

    fetchPendingTasks = () => {
        customInstance.get(`task?completed=false`, {
        }).then((res) => {
            this.setState({
                pendingTasks: res.data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    fetchCompletedTasks = () => {
        customInstance.get('https://api-nodejs-todolist.herokuapp.com/task?completed=true').then((res) => {
            this.setState({
                completedTasks: res.data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    addToList = (description) => {
        customInstance.post('https://api-nodejs-todolist.herokuapp.com/task', {
            description: description
        }).then((res) => {
            this.setState(prevState => ({
                pendingTasks : [
                    ...prevState.pendingTasks,
                    res.data.data
                ]
            }))
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteFromList = async (id) => {
        this.setState({disableButton : true})
        await customInstance.delete(`https://api-nodejs-todolist.herokuapp.com/task/${id}`).then((res) => {
            let pendingTasksCopy = this.state.pendingTasks.filter(item => item._id !== id);
            this.setState({pendingTasks: pendingTasksCopy})
        })
        this.setState({disableButton : false})
    }
   
    markAsChecked = async (key, data) => {
        this.setState({disableButton: true})
        await customInstance.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: true
        }).then((res) => {
            let pendingTasksCopy = this.state.pendingTasks.filter(item => item !== data);
            this.setState(prevState => ({
                pendingTasks: pendingTasksCopy,
                completedTasks: [
                    ...prevState.completedTasks,
                    data
                ]
            }))
        })
        this.setState({disableButton: false})
    }

    markAsUnchecked = async (key, data) => {
        this.setState({disableButton: true})
        await customInstance.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: false
        }).then((res) => {
            let completedTasksCopy = this.state.completedTasks.filter(item => item !== data);
            this.setState(prevState => ({
                completedTasks: completedTasksCopy,
                pendingTasks : [
                    ...prevState.pendingTasks,
                    data
                ]
            }))
        })
        this.setState({disableButton: false}) 
    }

    viewTask = (key, data) => {
        this.setState({
            currentItemInView : {
                key: key,
                data : data
            }
        })
    }

    render () {
        return (
            <section className='container mt-5'>
                <Header />
                <div className = "row mb-3">
                    <TaskForm 
                        pendingTasks = {this.state.pendingTasks}
                        addToList = {this.addToList}
                    />
                </div>
                <div className = "row">
                    <div className = "col-6">
                        <ListComponent 
                            list = {this.state.pendingTasks}
                            fireListEvent = {this.markAsChecked}
                            buttonText = "Check"
                            title = "Tasks to be done !!"
                            viewTask = {this.viewTask}
                            currentItemInView = {this.state.currentItemInView}
                            listType = {1}
                            deleteFromList = {this.deleteFromList}
                            disableButton = {this.disableButton}
                        />
                    </div>
                    <div className = "col-6">
                        <ListComponent
                            list = {this.state.completedTasks}
                            fireListEvent = {this.markAsUnchecked}     
                            buttonText = "Un-Check"
                            title = "Completed Tasks"
                            viewTask = {this.viewTask}
                            currentItemInView = {this.state.currentItemInView}
                            disableButton = {this.state.disableButton}
                        /> 
                    </div>
                </div>
                {this.state.currentItemInView &&
                    <div className='row'>
                        <Description 
                            task = {this.state.currentItemInView}
                        /> 
                    </div>
                }
            </section>
        );
    }
}



export function Dashboard() {
    const [pendingTasks, setPendingTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState();
    const [currentItemInView, setCurrentItemInView] = useState(undefined);
    const [disableButton, setDisableButton ] = useState(false);

    useEffect(() => {
        fetchPendingTasks();
        fetchCompletedTasks();
    }, [])

    const fetchPendingTasks = () => {
        customInstance.get('https://api-nodejs-todolist.herokuapp.com/task?completed=false').then((res) => {
            setPendingTasks(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchCompletedTasks = () => {
        customInstance.get('https://api-nodejs-todolist.herokuapp.com/task?completed=true').then((res) => {
            setCompletedTasks(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const addToList = (description) => {
        customInstance.post('https://api-nodejs-todolist.herokuapp.com/task', {
            description: description
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
        customInstance.delete(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
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
        customInstance.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: true
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
        customInstance.put(`https://api-nodejs-todolist.herokuapp.com/task/${key}`, {
            completed: false
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
                    <ListComponent 
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
                    <ListComponent
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