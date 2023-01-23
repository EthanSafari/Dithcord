import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createServer } from '../../../../../store/server'
import { useModal } from '../../../../../context/Modal';
import ServerFormInput from '../ServerFormInput';



const NewServerForm = ( ) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    const [editedServerData, setEditedServerData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: '',
        owner_id: currentUser.id,
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
            errorMessage: "Name must be 3-20 characters",
            required: true,
            pattern: "^[a-zA-Z0-9 ]{3,20}$",
        },
        {
            id: 2,
            name: "server_image",
            type: "server_image",
            placeholder: "server_image",
            label: "server_image",
            errorMessage: "Must be valid URL containing https",
            required: true,
            pattern: "^https?://.*"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(createServer(editedServerData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setEditedServerData({ ...editedServerData, [e.target.name]: e.target.value })
    }

    return (
        <div className='edit'>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <ServerFormInput className={input.name} key={input.id} {...input} value={editedServerData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className="btn btn-edit">Create Server</button>
            </form>
        </div>
    )

}


export default NewServerForm
