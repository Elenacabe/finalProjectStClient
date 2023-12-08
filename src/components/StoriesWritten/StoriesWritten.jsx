import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StoriesWritten.css'
import storyService from '../../services/story.services';

const StoriesWritten = ({ _id }) => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        storyService
            .getAllMyStories(_id)
            .then(response => {
                setStories(response.data);
            })
            .catch(err => console.log('Error buscando historias', err));
    }, [_id]);

    return (
        <><h1 style={{ color: 'orange' }}>Microrrelatos:</h1>

            {stories.map((e) => (

                <li key={e._id}><Link className='refs' to={`/microrrelatos/detalles/${e._id}`}>
                    {e.title}
                </Link></li>

            ))}

        </>
    );
}

export default StoriesWritten;