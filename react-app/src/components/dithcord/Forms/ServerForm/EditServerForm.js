import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createServer } from '../../../../store/server'


const EditServerForm = ({ server }) => {
    const dispatch = useDispatch();
    const [serverData, setServerData] = useState({
        name: "",
        server_img: "",
    })

    const serverInputs = [
        {
            id: 1,
            name: "name",
            type: "name",
            placeholder: "Name",
            label: "Name",
            required: true;
            pattern: "",
        },
        {
            id: 2,
            name: "Server Image",
            type: "image",
            placeholder: "Image Url",
            label: "image",
            required: true;
            pattern: "",
        }
    ]
}
