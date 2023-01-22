import DeleteServerButton from './DeleteServerButton'
import EditServerFormModal from '../Forms/ServerForm/Edit/EditServerFormModal'
import { useSelector } from "react-redux";


const ServerDropDownMenu = () => {
    const serverObj = useSelector(state => state.servers.oneServer);
    const server = Object.values(serverObj)[0]

    // console.log('=========INSIDE OF SERVER DROP DOWN========', currentServer?.ownerId)

    return (
        <div>
            <EditServerFormModal server={ server } />
            <DeleteServerButton server={ server } />
        </div>
    )
}


export default ServerDropDownMenu
