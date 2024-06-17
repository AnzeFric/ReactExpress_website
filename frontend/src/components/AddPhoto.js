import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        formData.append('image', file);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <form className="form-group" onSubmit={onSubmit} style={{ maxWidth: '500px', width: '100%', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                {!userContext.user ? <Navigate replace to="/login" /> : ""}
                {uploaded ? <Navigate replace to="/" /> : ""}
                <input type="text" className="form-control" name="ime" placeholder="Photo name" value={name} onChange={(e) => { setName(e.target.value) }} style={{ marginBottom: '10px' }} />
                <input type="text" className="form-control" name="sporocilo" placeholder="Photo message" value={message} onChange={(e) => { setMessage(e.target.value) }} style={{ marginBottom: '10px' }} />
                <label htmlFor="file" style={{ marginBottom: '10px', display: 'block' }}>Choose photo</label>
                <input type="file" id="file" onChange={(e) => { setFile(e.target.files[0]) }} style={{ marginBottom: '20px' }} />
                <input className="btn btn-dark" type="submit" name="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddPhoto;