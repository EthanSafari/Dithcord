import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { addMessage, loadChannelMessages, createMessage } from "../../../store/message"

const MessageForm = ({ channelId }) => {
    const dispatch = useDispatch()
    const user =  useSelector(state => state.session.user.id)
    const [body, setBody] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState(false)


    const addBody = (e) => setBody(e.target.value)

    useEffect(() => {
        const errors = []
        if (!body || body.length > 750) errors.push('Message must be between 1 and 750 characters')
        setValidationErrors(errors)
    }, [body, channelId])




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(true)

        if (!validationErrors.length) {
            const payload = {
                body,
                channel_id: channelId,
                author_id: user
            }


            let newMessage = await dispatch(createMessage(payload))
            if (newMessage) {
                await dispatch(loadChannelMessages(channelId))
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
