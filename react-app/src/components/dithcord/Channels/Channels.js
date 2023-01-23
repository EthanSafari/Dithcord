import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import AddChannelFormModal from '../Forms/ChannelForm/Add/AddChannelFormModal';
import EditChannelFormModal from '../Forms/ChannelForm/Edit/EditChannelFormModal';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';
import LogoutButton from '../../auth/LogoutButton';
import styled from 'styled-components';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    const currentServerObj = useSelector(state => state.servers.oneServer)
    const currentServer = Object.values(currentServerObj)
    const sessionUser = useSelector(state => state.session.user)

    // console.log('INSIDE OF CHANNELS COMPONENT', currentServer[0])

    const getOneChannel = (channelId) => {
        if (channelId) {
            dispatch(getChannel(channelId))
            dispatch(getChannelMessages(channelId))
            // socket.emit("join", {user: currentUser.username, roomId: channelId})
        }
    }


    return (
        <>
            <DropDown>
                <div className='server-name'>
                    {currentServer && currentServer[0]?.name}
                </div>
                <ServerDropDownMenu />
            </DropDown>

            <ChannelsContainer>
                {currentChannels && currentChannels.map((channel) => (
                    <ChannelOptions key={channel.id} >
                        <Channel onClick={() => getOneChannel(channel.id)} key={channel.id}>
                            {/* {console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', channel, '\n', '')} */}
                            <h2 key={channel.id}>{channel.name}</h2>
                        </Channel>
                        <ChannelOptionButtons>
                            <EditChannelFormModal />
                            <DeleteChannelButton key={channel.id} channelId={channel.id} />
                        </ChannelOptionButtons>
                    </ChannelOptions>
                ))}
            </ChannelsContainer>

            <UserInfo>
                <div className="logout-div">
                    <img className="current-user-image" src={sessionUser.profile_img} alt={sessionUser.username} />
                    <p className='logout-username'>{sessionUser.username}</p>
                </div>
                    <LogoutButton />
            </UserInfo>
        </>
    )
}


const ChannelsContainer = styled.div`
    width: 100%;
    border-top: 1px solid black;
    background-color: rgba(49, 49, 49, 0.8);
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 3vh;
    box-sizing: border-box;
`

const Channel = styled.div`
    box-sizing: border-box;
    color: rgba(178, 178, 178, 1);
    margin: 10px 20px;
`

const DropDown = styled.div`
    background-color: rgba(10, 10, 10, 0.8);
    height: 10%;
`

const UserInfo = styled.div`
    width: 100%;
    height: 10%;
    border-top: 1px solid black;
    display: flex;
    flex-direction: column;
    background-color: rgba(10, 10, 10, 0.8);
`

const ChannelOptions = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    &:hover{
        background-color: rgba(111, 111, 111, 1);
        cursor: pointer;
    }
`
const ChannelOptionButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin: 0px 10px;
`


export default Channels
