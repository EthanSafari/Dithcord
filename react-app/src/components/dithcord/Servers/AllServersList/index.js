import OpenModalButton from "../../../OpenModalButton";
import AllServersList from "./AllServersList";

const AllServersModal = () => {
    return (
        <OpenModalButton
            buttonText="Browse Servers"
            modalComponent={<AllServersList />}
        />
    );
};

export default AllServersModal;
