import DeleteServerButton from "./DeleteServerButton"
import EditServerFormModal from '../Forms/ServerForm/ServerFormModal';
import NewServerFormModal from '../Forms/ServerForm/ServerFormModal'
import { useSelector } from "react-redux";


const ServerDropDownMenu = () => {
    const server = useSelector(state => state.servers.oneServer[1]);

    // console.log('INSIDE OF SERVER DROP DOWN', server)

    return (
        <div>
        <EditServerFormModal server={ server } />
        <DeleteServerButton server={ server } />
        </div>
    )
}


export default ServerDropDownMenu
