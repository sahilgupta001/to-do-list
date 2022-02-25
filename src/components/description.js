import { useParams } from "react-router-dom";
import customInstance from "./axios";
import { useEffect, useState } from "react";
import Header from "./header";

export default function Description(props) {
    
    let { currentItemInView } = useParams();
    const [task, setTask] = useState();

    useEffect(() => {
        fetchItem()
    }, [])

    const fetchItem = () => {
        customInstance.get(`task/${currentItemInView}`)
        .then((res) => {
            setTask(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    if (!task)
        return <></>
    
    return(
        <section className="w-100 mt-5 mb-5">
            <Header />
            <div className="container">
                <div className ="card">
                    <div className = "card-title mt-4">
                        <h3 className="font-weight-bold">Task Details</h3>
                    </div>
                    <div className="card-body">
                        <h3 className="font-weight-bold">{task._id}</h3>
                        <h4 className = "mt-4 font-weight-bold">{task.description}</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}