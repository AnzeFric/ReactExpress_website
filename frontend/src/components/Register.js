import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/";
        }
        else {
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <form onSubmit={Register} style={{ maxWidth: '400px', width: '100%', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => (setEmail(e.target.value))} className="form-control" style={{ marginBottom: '10px' }} />
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))} className="form-control" style={{ marginBottom: '10px' }} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} className="form-control" style={{ marginBottom: '10px' }} />
                <input type="submit" name="submit" value="Register" className="btn btn-dark" />
                <label style={{ color: 'red', marginTop: '10px', display: 'block' }}>{error}</label>
            </form>
        </div>
    );
}

export default Register;