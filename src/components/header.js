import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header() {
    let history = useNavigate();

    const logout = () => {
        axios.post('https://api-nodejs-todolist.herokuapp.com/user/logout', {}, {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            localStorage.removeItem('token')
            history('/')
        }).catch((err) => {
            console.log(err)
        })
    }
     
    return  (
        <section className = "mt-5 container">
            <div className="row">
                <div className="col-9">
                    <h1 className="font-weight-bold float-left">My To-Do List Application</h1>
                </div>
                {localStorage.getItem('token') &&
                    <div className="col-3">
                        <button onClick={() => {logout()}} className = "btn btn-secondary float-right">Log out</button>
                    </div>
                }
            </div>
        </section>
    );
}