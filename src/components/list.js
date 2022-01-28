import { uncheckedList } from './data';


export default function List() {
    
    const unCheckedListHTML = () => {
        var html = Object.keys(uncheckedList).map((uncheckedItem, index) => (
            <>
                <div className = "col-1">
                    <h6>{index + 1}</h6>
                </div>
                <div className='col-11'>
                    <p>{uncheckedList[uncheckedItem].description}</p>
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
                            <h3 className = "font-weight-bold">Tasks to be done</h3>
                        </div>
                        <div className = "card-body">
                            {unCheckedListHTML()}        
                        </div>           
                    </div>
                </div>
            </div>
        </section>
    );
}