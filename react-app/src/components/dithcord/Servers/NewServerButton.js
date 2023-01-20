import { useDispatch, useSelector } from "react-redux"
import NewServerForm from "../Forms/ServerForm/NewServerForm";
import { createServer } from "../../../store/server";


const NewServerButton = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const newServer = async (e) => {
        e.preventDefault();
        // dispatch(createServer(message.id));
    };

    return (
        <div>
            <NewServerForm />
        </div>
    );
};

export default NewServerButton;
