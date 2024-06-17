import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from "../userContext";


function Photos() {
    const [photo, setPhoto] = useState(null);
    const { id } = useParams(); // Get the photo ID from URL params
    const [comment, setComment] = useState('');
    const currentUser = useContext(UserContext);


    useEffect(() => {
        const getPhoto = async () => {
            try {
                const res = await fetch(`http://localhost:3001/photos/${id}`);
                const data = await res.json();
                setPhoto(data);
            } catch (error) {
                console.error("Error fetching photo:", error);
            }
        };

        getPhoto();
    }, [id]);

    const handleLike = async () => {
        try {
            if (!photo || !currentUser || !currentUser.user) {
                console.log("Photo or currentUser data is not available.");
                return;
            }

            const userId = currentUser.user._id;

            // Check if the user has already liked the photo
            if (photo.likedBy.some(user => user.user === userId)) {
                console.log("User has already liked this photo.");
                return;
            }

            // Check if the user has already disliked the photo
            const hasDisliked = photo.dislikedBy.some(user => user.user === userId);
            if (hasDisliked) {
                // If the user has disliked the photo, remove the dislike
                const resRemoveDislike = await fetch(`http://localhost:3001/photos/${id}/removeDislike`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId }) // Send userId in the request body
                });
                const dataRemoveDislike = await resRemoveDislike.json();
                // Update the photo state with updated data from the server
                setPhoto(dataRemoveDislike);
            }

            // Like the photo
            const resLike = await fetch(`http://localhost:3001/photos/${id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId }) // Send userId in the request body
            });
            const dataLike = await resLike.json();
            // Update the photo state with updated data from the server
            setPhoto(dataLike);
        } catch (error) {
            console.error("Error liking photo:", error);
        }
    };


    const handleDislike = async () => {
        try {
            if (!photo || !currentUser || !currentUser.user) {
                console.log("Photo or currentUser data is not available.");
                return;
            }

            const userId = currentUser.user._id;

            // Check if the user has already disliked the photo
            if (photo.dislikedBy.some(user => user.user === userId)) {
                console.log("User has already disliked this photo.");
                return;
            }

            // Check if the user has already liked the photo
            const hasLiked = photo.likedBy.some(user => user.user === userId);
            if (hasLiked) {
                // If the user has liked the photo, remove the like
                const resRemoveLike = await fetch(`http://localhost:3001/photos/${id}/removeLike`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId }) // Send userId in the request body
                });
                const dataRemoveLike = await resRemoveLike.json();
                // Update the photo state with updated data from the server
                setPhoto(dataRemoveLike);
            }

            // Dislike the photo
            const resDislike = await fetch(`http://localhost:3001/photos/${id}/dislike`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId }) // Send userId in the request body
            });
            const dataDislike = await resDislike.json();
            // Update the photo state with updated data from the server
            setPhoto(dataDislike);
        } catch (error) {
            console.error("Error liking photo:", error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        // Send comment to backend
        try {
            const userId = currentUser.user._id;

            const res = await fetch(`http://localhost:3001/photos/${photo._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, userId: userId })
            });
            const data = await res.json();

            window.location.reload();

        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div>
            {photo ? (
                <div>
                    <h3>Photo Details:</h3>
                    <div className="card bg-light text-dark" style={{ width: '60%', margin: 'auto', marginTop: '10vh', marginBottom: '5vh' }}>
                        <div className="card-body">
                            <h5 className="card-title">{photo.name}</h5>
                            <img className="card-img-bottom" src={`http://localhost:3001/${photo.path}`} alt={photo.name} style={{ width: '100%' }} />
                            <div style={{ marginTop: '20px' }}>
                                <p style={{ marginBottom: '10px' }}>Likes: {photo.likes} Dislikes: {photo.dislikes}</p>
                                <UserContext.Consumer>
                                    {context => (
                                        context.user ? (
                                            <div>
                                                <button onClick={handleLike} style={{ marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>Like</button>
                                                <button onClick={handleDislike} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>Dislike</button>
                                            </div>
                                        ) : null
                                    )}
                                </UserContext.Consumer>
                            </div>
                        </div>
                    </div>



                    <UserContext.Consumer>
                        {context => (
                            context.user ? (
                                <form onSubmit={handleSubmitComment} style={{ marginBottom: '20px' }}>
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{
                                            padding: '8px',
                                            marginRight: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            width: 'calc(100% - 100px)', // Adjust the width as needed
                                            maxWidth: '400px', // Set maximum width to prevent input from stretching too much
                                        }}
                                        placeholder="Add a comment..."
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '8px 20px',
                                            backgroundColor: '#3b3b3b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Add Comment
                                    </button>
                                </form>
                            ) : null
                        )}

                    </UserContext.Consumer>

                    <div>
                        <h4>Comments:</h4>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {photo.comments.map((comment, index) => (
                                <li key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Author: {comment.user}</p>
                                    <p style={{ marginTop: '5px', fontSize: '14px' }}>{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Photos;