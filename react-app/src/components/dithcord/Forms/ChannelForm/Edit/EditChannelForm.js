import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../ChannelFormInput';
import { useModal } from '../../../../../context/Modal';
import { putChannel } from '../../../../../store/channel';


const EditChannelForm = ({ server }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const currentServerObj = useSelector(state => state.servers.oneServer)
    const currentServer = Object.values(currentServerObj)
    const currentChannel = useSelector(state => state.channels.oneChannel)

    const [editedChannelData, setEditedChannelData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: currentChannel.name,
        private: false,
        server_id: currentServer[0].id,
    });

    // console.log('----------------------------EDIT CHANNEL FORM: ', currentServer[0])

    const serverInputs = [
        {
            id: 1,
            name: "name",
            type: "name",
            placeholder: "Name",
            label: "Name",
            errorMessage: "Name must be 3-12 characters",
            required: true,
            pattern: "^[a-zA-Z0-9 ]{3,12}$",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault(); 
        return dispatch(putChannel(currentChannel.id, editedChannelData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setEditedChannelData({ ...editedChannelData, [e.target.name]: e.target.value })
    }

    return (
        <div className='edit'>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <FormInput className={input.name} key={input.id} {...input} value={editedChannelData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='btn btn-edit'>Submit Changes</button>
            </form>
        </div>
    )

}


export default EditChannelForm
