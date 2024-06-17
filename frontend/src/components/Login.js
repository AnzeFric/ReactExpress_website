import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <form onSubmit={Login} style={{ maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                {userContext.user ? <Navigate replace to="/" /> : ""}
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} className="form-control" style={{ marginBottom: '10px' }} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} className="form-control" style={{ marginBottom: '10px' }} />
                <input type="submit" name="submit" value="Log in" className="btn btn-dark" />
                <label style={{ color: 'red', marginTop: '10px', display: 'block' }}>{error}</label>
            </form>
        </div>
    );
}

export default Login;