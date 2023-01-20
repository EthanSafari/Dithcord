import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createServer } from '../../../../store/server'
import { useModal } from '../../../../context/Modal';
import ServerFormInput from './ServerFormInput';


const NewServerForm = ( ) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    const [editedServerData, setEditedServerData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: '',
        ownerId: currentUser.id,
        private: false,
        server_image: '',
    });

    // console.log('EDIT SERVER FORM: ', editedServerData)

    const serverInputs = [
        {
            id: 1,
            name: "name",
            type: "name",
            placeholder: "Name",
            label: "Name",
            // errorMessage: "Name must be at least 1 character",
            required: true,
            // pattern: "",
        },
        {
            id: 2,
            name: "server_image",
            type: "server_image",
            placeholder: "server_image",
            label: "server_image",
            // errorMessage: "Must be valid URL",
            required: true,
            // pattern: "",
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault(); 
        return dispatch(createServer(editedServerData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setEditedServerData({ ...editedServerData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <ServerFormInput className={input.name} key={input.id} {...input} value={editedServerData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='editServerButton'>Submit Changes</button>
            </form>
        </>
    )

}


export default NewServerForm
