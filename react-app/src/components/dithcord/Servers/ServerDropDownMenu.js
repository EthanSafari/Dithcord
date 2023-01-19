import DeleteServerButton from "./DeleteServerButton"
import EditServerFormModal from '../Forms/ServerForm/ServerFormModal';
import { useSelector } from "react-redux";


const ServerDropDownMenu = () => {
    const server = useSelector(state => state.servers.oneServer);

    return (
        <div>
        <EditServerFormModal server={ server } />
        <DeleteServerButton />
        </div>
    )
}


export default ServerDropDownMenu
