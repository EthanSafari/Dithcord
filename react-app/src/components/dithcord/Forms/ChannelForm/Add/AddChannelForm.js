import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from '../../../../../context/Modal';
import ChannelFormIput from '../ChannelFormInput'
import { newChannel } from '../../../../../store/channel';


const AddChannelForm = ( ) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const currentServerObj = useSelector(state => state.servers.oneServer)
    const currentServer = Object.values(currentServerObj)
    // const currentChannelObj = useSelector(state => state.channels.oneChannel)

    // console.log('-----INSIDE OF ADD CHANNEL-------', currentServer[0])


    const [addedChannelData, setAddedChannelData] = useState({
        // channels: server.channels,
        // id: server.id,
        name: '',
        private: false,
        server_id: currentServer[0].id,
    });


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
        dispatch(newChannel(addedChannelData))
        .then(closeModal())
    }

    const onChange = (e) => {
        setAddedChannelData({ ...addedChannelData, [e.target.name]: e.target.value })
    }

    return (
        <div className='edit'>
            <form onSubmit={handleSubmit}>
                {serverInputs.map((input) => (
                    <ChannelFormIput className={input.name} key={input.id} {...input} value={addedChannelData[input.name]} onChange={onChange} />
                ))}
                <span id='api-error'></span>
                <button className='btn btn-edit'>Add Channel</button>
            </form>
        </div>
    )

}


export default AddChannelForm
