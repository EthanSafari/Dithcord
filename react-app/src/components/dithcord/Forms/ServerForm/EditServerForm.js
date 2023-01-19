import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createServer, editServerById } from '../../../../store/server'
import FormInput from './ServerFormInput';


const EditServerForm = ({ server }) => {
    const dispatch = useDispatch();
    const [editedServerData, setEditedServerData] = useState({
        channels: server.channels,
        id: server.id,
        name: server?.name,
        ownerId: server.ownerId,
        private: server.private,
        server_image: server?.server_image,
    });

    console.log('EDIT SERVER FORM: ', editedServerData)

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
        return dispatch(editServerById(editedServerData))
    }

    const onChange = (e) => {
        setEditedServerData({ ...editedServerData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <FormInput className={input.name} key={input.id} {...input} value={editedServerData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='editServerButton'>Submit Changes</button>
            </form>
        </>
    )

}


export default EditServerForm
