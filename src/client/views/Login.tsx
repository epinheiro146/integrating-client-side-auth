import * as React from "react";
import swal from "sweetalert"
import { useState } from "react";
import { TOKEN_KEY, apiService } from "../services/api-service";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const data = { email, password };
    const nav = useNavigate();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!email || !password) {
            swal("Welp.", "Please fill out all fields!", "error");
            return;
        }

        apiService("/auth/login", "POST", data)
            .then(token => {
                localStorage.setItem(TOKEN_KEY, token);
                nav('/chirps');
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center">
                        <h2 className="mt-2">Please Sign In</h2>
                    </div>
                    <div className="card-body">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className="form-control" id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button onClick={handleLogin} className="btn btn-outline-success mt-2">Login</button>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span>Don't have an account? </span>
                        <Link className="text-light" to={'/register'}>Sign up here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;