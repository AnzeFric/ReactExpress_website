import React from 'react';
import { Link } from 'react-router-dom';


function Photo({ photo }) {
    return (
        <div className="card bg-light text-dark" style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div className="card-body">
                <h5 className="card-title" style={{ marginBottom: '15px' }}>{photo.name}</h5>
                <p style={{ marginBottom: '10px' }}>Number of interactions: {photo.likes + photo.dislikes}</p>
                <p style={{ marginBottom: '10px' }}>Author: {photo.postedBy.username}, posted on {new Date(photo.postedOn).toLocaleDateString()}</p>
                <img className="card-img-bottom" src={`http://localhost:3001/${photo.path}`} alt={photo.name} style={{ width: '100%', marginBottom: '15px' }} />
                <Link to={`/${photo._id}`} style={{ display: 'block', width: "200px", margin: "0 auto", padding: "10px", backgroundColor: '#3b3b3b', color: 'white', borderRadius: '4px', textAlign: 'center', textDecoration: 'none' }}>View Details</Link>
            </div>
        </div>
    );
}

export default Photo;
