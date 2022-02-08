export default function Description(props) {
    
    const { task } = props;
    
    return(
        <section className="w-100 mt-5 mb-5">
            <div className="container">
                <div className ="card">
                    <div className = "card-title mt-4">
                        <h3 className="font-weight-bold">Task Details</h3>
                    </div>
                    <div className="card-body">
                        <h3 className="font-weight-bold">{task.key}</h3>
                        <h4 className = "mt-4 font-weight-bold">{task.data.description}</h4>
                    </div>
                </div>
            </div>
        </section>
    )
}