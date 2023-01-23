import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editServerById } from '../../../../../store/server'
import FormInput from '../ServerFormInput';
import { useModal } from '../../../../../context/Modal';


const EditServerForm = ({ server }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const thisServerObj = useSelector(state => state.servers.oneServer)
    const thisServer = Object.values(thisServerObj)
    const [editedServerData, setEditedServerData] = useState({
        // channels: thisServer[0].channels,
        id: thisServer[0]?.id,
        name: thisServer[0]?.name,
        ownerId: thisServer[0].ownerId,
        private: thisServer[0].private,
        server_image: thisServer[0]?.server_image,
    });

    // console.log('===============EDIT SERVER FORM===================', thisServer[0])

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
        return dispatch(editServerById(editedServerData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setEditedServerData({ ...editedServerData, [e.target.name]: e.target.value })
    }

    return (
        <div className='edit'>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <FormInput className={input.name} key={input.id} {...input} value={editedServerData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='btn btn-edit'>Submit Changes</button>
            </form>
        </div>
    )

}


export default EditServerForm
