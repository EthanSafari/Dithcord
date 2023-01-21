import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'
import { addMessage, loadChannelMessages, createMessage, getChannelMessages } from "../../../store/message"
import { getChannel } from "../../../store/channel"
import { sendMessage } from "../socket"

const socket = io('http://localhost:5000')


const MessageForm = ({ channelId, messages }) => {
    const dispatch = useDispatch()
    const user =  useSelector(state => state.session.user.id)
    const [body, setBody] = useState('')
    const [msgs, setMsgs] = useState([])
    const [validationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState(false)
    const [chatInput, setChatInput] = useState('')
    // const room = 

    console.log(channelId)
    const addBody = (e) => setBody(e.target.value)

    useEffect(() => {
        const errors = []
        if (!body || body.length > 750) errors.push('Message must be between 1 and 750 characters')
        setValidationErrors(errors)
       
    }, [body, dispatch])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true)

        
        if (!validationErrors.length) {
            const payload = {
                body,
                channel_id: channelId,
                author_id: user
            }
            
            socket.emit("chat", {"message": payload, "room": channelId})
            
    
            let newMessage = await dispatch(createMessage(payload, channelId))
            if (newMessage) {
                await dispatch(getChannel(channelId))
                setErrors(false)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Type message here"
                    value={body}
                    onChange={addBody}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )







}

export default MessageForm
