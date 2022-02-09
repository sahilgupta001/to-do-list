import { Link } from "react-router-dom";

export default function List(props) {
    const { list, fireListEvent, buttonText, title, viewTask, currentItemInView } = props;
    
    const generateHTML = () => {
        if (!list)
            return <></>
        var html = Object.keys(list).map((item, index) => (
            <div className = "row" key = {`to-do-list-${item}`}>    
                <div className = "col-1">
                    <h6 className="font-weight-bold">{index + 1}</h6>
                </div>
                <div className='col-6'>
                    <p className='float-left font-weight-bold'>{list[item].description}</p>
                </div>
                <div className = 'col-2'>
                    <Link 
                        className = "btn btn-sm btn-dark"    
                        to={`/item/${item}`}
                    >
                        View
                    </Link>
                </div>
                <div className = 'col-3'>
                    <button 
                        onClick = {() => {fireListEvent(item, list[item])}}
                        className = "btn btn-sm btn-info"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
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
                    {generateHTML()}
                </div>
            </div>
        </section>
    )
}