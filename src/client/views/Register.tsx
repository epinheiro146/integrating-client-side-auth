import * as React from "react";
import swal from "sweetalert"
import { useState } from "react";
import { apiService } from "../services/api-service";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const data = { name, email, password };
    const nav = useNavigate();

    const handleRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            swal("Welp.", "Please fill out all fields!", "error");
            return;
        }

        apiService("/auth/register", "POST", data)
            .then(res => {
                swal("Welcome Aboard!", "Your account is now registered. Please sign in.", "success")
                nav('/login');
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center">
                        <h2 className="mt-2">Register an Account!</h2>
                    </div>
                    <div className="card-body">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input className="form-control" id="username" type="username" value={name} onChange={e => setName(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <input className="form-control" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button onClick={handleRegistration} className="btn btn-outline-success mt-2">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;