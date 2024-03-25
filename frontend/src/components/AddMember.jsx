import React, { useState } from 'react';
import Roles from './Roles';

export const AddMember = () => {

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        status: true,
        roleId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }

    const handleRadioChange = (value) => {
        if (value === "option1") {
            setUserDetails({ ...userDetails, status: true });
        } else if (value === "option2") {
            setUserDetails({ ...userDetails, status: false });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userDetails.username || !userDetails.email || !userDetails.password || !userDetails.roleId) {
            alert("Please fill all the fields");
            return;
        }
        const response = await fetch('http://localhost:1234/controllers/addUser.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        const responseData = await response.json();

        if (responseData.success) {
            // alert(responseData.message); // message: "User added successfully"

            setUserDetails({
                username: "",
                email: "",
                password: "",
                status: true,
                roleId: "",
            });

        } else {
            alert(responseData.error);
        }
    }

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">ADD MEMBER</h5>
                        {/* Horizontal Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label htmlFor="inputText" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputText"
                                        onChange={handleChange} name="username" value={userDetails.username} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputEmail"
                                        onChange={handleChange} name="email" value={userDetails.email} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input onChange={handleChange} name="password" value={userDetails.password}
                                        type="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label">Role</label>
                                <div className="col-sm-10">
                                    <select className="form-select" onChange={handleChange} name="roleId"
                                        aria-label="Default select example">
                                        <option className='text-center' hidden>Select Role</option>
                                        <Roles />
                                    </select>
                                </div>
                            </div>
                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Status</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <input onChange={() => handleRadioChange("option1")} className="form-check-input"
                                            type="radio" name="gridRadios" id="gridRadios1"
                                            value="option1" checked={userDetails.status} />
                                        <label className="form-check-label" htmlFor="gridRadios1">
                                            Active
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={() => handleRadioChange("option2")} className="form-check-input"
                                            type="radio" name="gridRadios" id="gridRadios2"
                                            value="option2" checked={!userDetails.status} />
                                        <label className="form-check-label" htmlFor="gridRadios2">
                                            Inactive
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>{/* End Horizontal Form */}

                    </div>
                </div>
            </section>
        </main>
    )
}
