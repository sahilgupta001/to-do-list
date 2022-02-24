import { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";

export default class ListComponent extends Component {
    render() {
        const { list, fireListEvent, buttonText, title, deleteFromList, listType, disableButton } = this.props
        
        const generateHTML = () => {
            if (!list)
                return <Loader />
            var html = Object.keys(list).map((item, index) => (
                <div className = "row" key = {`to-do-list-${item}`}>    
                    <div className = "col-1">
                        <h6 className="font-weight-bold">{index + 1}</h6>
                    </div>
                    <div className={listType ? 'col-4' : 'col-5'}>
                        <p className='float-left font-weight-bold'>{list[item].description}</p>
                    </div>
                    <div className = 'col-2'>
                        <Link 
                            className = "btn btn-sm btn-dark"    
                            to={`/item/${list[item]._id}`}
                            disabled = {disableButton}
                        >
                            View
                        </Link>
                    </div>
                    <div className = {listType ? 'col-2' : 'col-3'}>
                        <button 
                            onClick = {() => {fireListEvent(list[item]._id, list[item])}}
                            className = "btn btn-sm btn-info"
                            disabled = {disableButton}
                        >
                            {buttonText}
                        </button>
                    </div>
                    {listType && 
                        <div className = 'col-2'>
                            <button 
                                onClick = {() => {deleteFromList(list[item]._id)}}
                                className = "btn btn-sm btn-danger"
                                disabled = {disableButton}
                            >
                                Delete
                            </button>
                        </div>
                    }
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
}



export function List(props) {
    const { list, fireListEvent, buttonText, title, deleteFromList, listType, disableButton } = props;
    
    const generateHTML = () => {
        if (!list)
            return <Loader />
        var html = Object.keys(list).map((item, index) => (
            <div className = "row" key = {`to-do-list-${item}`}>    
                <div className = "col-1">
                    <h6 className="font-weight-bold">{index + 1}</h6>
                </div>
                <div className={listType ? 'col-4' : 'col-5'}>
                    <p className='float-left font-weight-bold'>{list[item].description}</p>
                </div>
                <div className = 'col-2'>
                    <Link 
                        className = "btn btn-sm btn-dark"    
                        to={`/item/${list[item]._id}`}
                        disabled = {disableButton}
                    >
                        View
                    </Link>
                </div>
                <div className = {listType ? 'col-2' : 'col-3'}>
                    <button 
                        onClick = {() => {fireListEvent(list[item]._id, list[item])}}
                        className = "btn btn-sm btn-info"
                        disabled = {disableButton}
                    >
                        {buttonText}
                    </button>
                </div>
                {listType && 
                    <div className = 'col-2'>
                        <button 
                            onClick = {() => {deleteFromList(list[item]._id)}}
                            className = "btn btn-sm btn-danger"
                            disabled = {disableButton}
                        >
                            Delete
                        </button>
                    </div>
                }
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