import React, { useEffect, useState } from 'react';
import './MiddleParts.css'

const NotLoggedInParts = ({ partsArray }) => {
    const [lastPart, setLastPart] = useState({});
    const [lastPartTrue, setLastPartTrue] = useState(false);

    const copyArray = [...partsArray];
    copyArray.pop();

    useEffect(() => {
        if (lastPartTrue === false){
            setLastPart(partsArray[partsArray.length - 1]);
            setLastPartTrue(true)
        };
    }, [lastPartTrue, partsArray])
    if (!lastPart) return null;
    return (
        <div className='front-page-information'>
            {copyArray.map(part => (
                <div>
                {part.id % 2 === 0 ? (
                <div className='part first-part' key={part.picture}>
                    <div className='info-container'>
                    <img className='part-picture' src={part.picture} alt='' />
                    <div className='part-info'>
                    <div className='part-heading'>{part.heading}</div>
                    <div className='part-description'>{part.description}</div>
                    </div>
                    </div>
                </div>
                ) : (
                <div className='part other-part' key={part.picture}>
                    <div className='info-container'>
                    <div className='part-info'>
                    <div className='part-heading'>{part.heading}</div>
                    <div className='part-description'>{part.description}</div>
                    </div>
                    <img className='part-picture' src={part.picture} alt='' />
                    </div>
                </div>
                )}
                </div>
            ))}
            <div className='part last-part-parts'>
                <div className='last-part-info-container'>
                <div className='part-heading last-part-heading'>{lastPart.heading}</div>
                <div className='part-description last-part-description'>{lastPart.description}</div>
                </div>
                <img className='part-picture' src={lastPart.picture} alt='' />
            </div>
        </div>
    )
}

export default NotLoggedInParts;
