import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../ChannelFormInput';
import { useModal } from '../../../../../context/Modal';
import { putChannel } from '../../../../../store/channel';


const EditChannelForm = ({ server }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const currentServer = useSelector(state => state.servers.oneServer)
    const currentChannel = useSelector(state => state.channels.oneChannel)

    const [editedChannelData, setEditedChannelData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: currentChannel.name,
        private: false,
        server_id: currentServer[1].id,
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
        <>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <FormInput className={input.name} key={input.id} {...input} value={editedChannelData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='editChannelButton'>Submit Changes</button>
            </form>
        </>
    )

}


export default EditChannelForm
