import React, { useEffect, useState } from 'react';
import './MiddleParts.css'

const NotLoggedInParts = ({ partsArray }) => {
    const [lastPart, setLastPart] = useState({});
    const [lastPartTrue, setLastPartTrue] = useState(false);

    useEffect(() => {
        if (lastPartTrue === false){
            setLastPart(partsArray.pop());
            setLastPartTrue(true)
        };
    }, [])
    if (!lastPart) return null;
    return (
        <div className='front-page-information'>
            {partsArray.map(part => (
                <div className='part' key={part.picture}>
                    <img className='part-picture' src={part.picture} alt='image' />
                    <div className='part-heading'>{part.heading}</div>
                    <div className='part-description'>{part.description}</div>
                </div>
            ))}
            <div className='part'>
                <div className='part-heading'>{lastPart.heading}</div>
                <div className='part-description'>{lastPart.description}</div>
                <img className='part-picture' src={lastPart.picture} alt='image' />
            </div>
        </div>
    )
}

export default NotLoggedInParts;
