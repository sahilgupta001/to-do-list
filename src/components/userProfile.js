import Header from "./header";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";

export default function UserProfile() {
    const [ userInfo, setUserInfo ] = useState();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ disableButton, setDisableButton ] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState();

    useEffect(() => {
        fetchProfile();
    }, [])

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append(
          'avatar', selectedFile
        );
        setDisableButton(true);
        await axios.post("https://api-nodejs-todolist.herokuapp.com/user/me/avatar",
         formData, {
             headers : {
                 Authorization : localStorage.getItem('token')
             }
         }).catch((err) => {
             console.log(err)
         });
         setDisableButton(false);
      };
    
    const fetchProfile = () => {
        axios.get('https://api-nodejs-todolist.herokuapp.com/user/me', {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setUserInfo(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateProfile = async () => {
        setDisableButton(true);
        await axios.put('https://api-nodejs-todolist.herokuapp.com/user/me', {
            name : userInfo.name,
            age : userInfo.age,
            email: userInfo.email
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then((res) => {
            setIsEditing(false);
            setUserInfo(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        setDisableButton(false)
    }

    return(
        <section>
            <Header />
            {!userInfo 
                ?
                    <Loader />
                :
                    <div className="container">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Email Id</th>
                                    <th scope="col">Creation Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{userInfo._id}</th>
                                    <td>
                                        {isEditing 
                                            ? 
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Enter email" 
                                                    value = {userInfo.name}
                                                    onChange = {(e) => {
                                                        setUserInfo({
                                                            ...userInfo,
                                                            name : e.target.value
                                                        })
                                                    }}
                                                />
                                            :
                                                <span>{userInfo.name}</span>
                                        }
                                    </td>
                                    <td>
                                        {isEditing 
                                            ?
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Enter email" 
                                                    value = {userInfo.age}
                                                    onChange = {(e) => {
                                                        setUserInfo({
                                                            ...userInfo,
                                                            age : e.target.value
                                                        })
                                                    }}
                                                />
                                            :
                                                <span>{userInfo.age}</span>
                                        }    
                                    </td>
                                    <td>
                                        {isEditing 
                                            ?
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Enter email" 
                                                    value = {userInfo.email}
                                                    onChange = {(e) => {
                                                        setUserInfo({
                                                            ...userInfo,
                                                            email : e.target.value
                                                        })
                                                    }}
                                                />
                                            :
                                                <span>{userInfo.email}</span>
                                        }
                                    </td>
                                    <td>{userInfo.createdAt.split("T")[0]}</td>
                                    <td>
                                        {isEditing ? 
                                                <button 
                                                    onClick = {() => {updateProfile()}}
                                                    className="btn btn-sm btn-success"
                                                    disabled = {disableButton}
                                                >
                                                    Save
                                                </button>
                                            :
                                                <button 
                                                    onClick = {() => {setIsEditing(true)}}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Edit
                                                </button>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="file" onChange={onFileChange} />
                        <button 
                            className = "btn btn-info" 
                            onClick={onFileUpload}
                            disabled = {disableButton}
                        >
                            Upload!
                        </button>
                    </div>
            }
        </section>
    )
}