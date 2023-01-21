import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from '../../../../../context/Modal';
import ChannelFormIput from '../ChannelFormInput'
import { newChannel } from '../../../../../store/channel';


const AddChannelForm = ( ) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const currentServer = useSelector(state => state.servers.oneServer)
    const currentChannelObj = useSelector(state => state.channels.oneChannel)

    console.log('-----INSIDE OF EDIT CHANNEL-------', currentChannelObj.name)


    const [addedChannelData, setAddedChannelData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: '',
        private: false,
        server_id: currentServer[1].id,
    });

    console.log('EDIT SERVER FORM: ', addedChannelData)

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
        dispatch(newChannel(addedChannelData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setAddedChannelData({ ...addedChannelData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <ChannelFormIput className={input.name} key={input.id} {...input} value={addedChannelData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='editServerButton'>Add Channel</button>
            </form>
        </>
    )

}


export default AddChannelForm
