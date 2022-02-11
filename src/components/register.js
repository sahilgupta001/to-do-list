import axios from "axios"
import { useState } from "react"


export default function RegisterUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [userName, setUserName] = useState("");
    const [apiMessage, setAPIMessage] = useState()

    const registerUser = () => {
        axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', {
            email: email,
            password: password,
            name : userName,
            age: parseInt(age)  
        }).then((res) => {
            setAPIMessage({
                flag: 0,
                message: "Registration successful !!"
            })
        }).catch((error) => {
            console.log(error.response)
            if (error && error.response && error.response.data)
            setAPIMessage({
                flag: 1,
                message: error.response.data
            })
        })
    }

    return (
        <section>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Register</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input 
                                    type="text" 
                                    value = {userName} 
                                    className="form-control" 
                                    placeholder="name" 
                                    onChange = {(e) => {setUserName(e.target.value)}} 
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input 
                                    type="text" 
                                    value = {age} 
                                    className="form-control" 
                                    placeholder="age" 
                                    onChange = {(e) => {setAge(e.target.value)}} 
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input 
                                    type="text" 
                                    value = {email} 
                                    className="form-control" 
                                    placeholder="email" 
                                    onChange = {(e) => {setEmail(e.target.value)}} 
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input 
                                    type="password" 
                                    value = {password} 
                                    className="form-control" 
                                    placeholder="password" 
                                    onChange = {(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                            {(apiMessage) &&
                                <p className={!apiMessage.flag ? "text-success" : "text-danger"}>{apiMessage.message}</p>
                            }
                            <div className="form-group">
                                <button 
                                    className="btn btn-primary float-right login_btn"
                                    onClick={() => {registerUser()}}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/">Log In</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}