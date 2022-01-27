import { uncheckedList } from './data';


export default function List() {
    
    const unCheckedListHTML = () => {
        var html = Object.keys(uncheckedList).map((uncheckedItem, index) => (
            <p>{uncheckedList[uncheckedItem].description}</p>
        ))
        return html;
    }
    
    return (
        <section>
            {unCheckedListHTML()}                   
        </section>
    );
}