// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {io} from 'socket.io-client'
// import { createMessage } from "../../../store/message"
// import { getChannel } from "../../../store/channel"
// let socket;

// const MessageForm = ({ channelId }) => {
//     const dispatch = useDispatch()
//     const user =  useSelector(state => state.session.user.id)
//     const [body, setBody] = useState('')
//     // const [msgs, setMsgs] = useState([])
//     const [validationErrors, setValidationErrors] = useState([])
//     // const [errors, setErrors] = useState(false)



//     const addBody = (e) => setBody(e.target.value)

//     useEffect(() => {
//         const errors = []
//         if (!body || body.length > 750) errors.push('Message must be between 1 and 750 characters')
//         setValidationErrors(errors)
//         socket = io()


//         socket.on("chat", (chat) => {
//             setMsgs(msgs => [...msgs, chat])
//         })
//         return(() => {
//             socket.disconnect()
//         })
//     }, [body, dispatch])




//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors(true)


//         if (!validationErrors.length) {
//             const payload = {
//                 body,
//                 channel_id: channelId,
//                 author_id: user
//             }

//             socket.emit("chat", body)

//             let newMessage = await dispatch(createMessage(payload, channelId))
//             if (newMessage) {
//                 await dispatch(getChannel(channelId))
//                 setErrors(false)
//             }
//         }
//     }

//     return (
//         <div className="message-bar-submit">
//             <form onSubmit={handleSubmit} className='message-form-submit-and-input'>
//                 <input
//                     type='text'
//                     placeholder="Type message here"
//                     value={body}
//                     onChange={addBody}
//                     className='message-input'
//                 />
//                 <button type="submit" className="message-form-button">Submit</button>
//             </form>
//         </div>
//     )







// }

// export default MessageForm
