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
        <section className = "mt-5 container mb-3">
            {/* <div className="row">
                <div className="col-9">
                    <h1 className="font-weight-bold float-left">My To-Do List Application</h1>
                </div>
                {localStorage.getItem('token') &&
                    <div className="col-3">
                        <button onClick={() => {logout()}} className = "btn btn-secondary float-right">Log out</button>
                    </div>
                }
            </div> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h1 className="navbar-brand font-weight-bold">My To-Do List Application</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item mr-2">
                            <a href = "/profile" onClick={() => {}} className = "float-right nav-link">Profile</a>
                        </li>
                        <li className="nav-item float-right">
                            <button onClick={() => {logout()}} className = "btn btn-dark float-right">Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
    );
}