import { useState, useEffect } from 'react';
import Photo from './Photo';

function Photos(){
    const [photos, setPhotos] = useState([]);
    useEffect(function(){
        const getPhotos = async function(){
            const res = await fetch("http://localhost:3001/photos");
            let data = await res.json();
            // Sort photos based on the postedOn attribute
            data.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
            setPhotos(data);
        }
        getPhotos();
    }, []);
    

    return(
        <div>
            <h3>Photos:</h3>
            <ul style={{width: 800, marginTop: 40}}>
                {photos.map(photo=>(<Photo photo={photo} key={photo._id}></Photo>))}
            </ul>
        </div>
    );
}

export default Photos;