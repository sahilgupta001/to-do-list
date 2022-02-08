

export default function List(props) {
    const { list, fireListEvent, buttonText, title, viewTask, currentItemInView } = props;
    
    const generateHTML = () => {
        if (!list)
            return <></>
        var html = Object.keys(list).map((item, index) => (
            <>
                <div className = "col-1">
                    <h6 className="font-weight-bold">{index + 1}</h6>
                </div>
                <div className='col-6'>
                    <p className='float-left font-weight-bold'>{list[item].description}</p>
                </div>
                <div className = 'col-2'>
                    <button 
                        onClick = {() => {viewTask(item, list[item])}}
                        className = "btn btn-sm btn-dark"
                        disabled = {currentItemInView ? currentItemInView.key === item : false}
                    >
                        View
                    </button>
                </div>
                <div className = 'col-3'>
                    <button 
                        onClick = {() => {fireListEvent(item, list[item])}}
                        className = "btn btn-sm btn-info"
                    >
                        {buttonText}
                    </button>
                </div>
            </>
        ))
        return html;
    }

    return (
        <section>
            <div className = "card">
                <div className = "card-title mt-4">
                    <h3 className = "font-weight-bold">{title}</h3>
                </div>
                <div className = "card-body">
                    <div className = "row">    
                        {generateHTML()}
                    </div>
                </div>
            </div>
        </section>
    )
}