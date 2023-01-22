import LoginForm from "./LoginForm";
import OpenModalButton from "../../OpenModalButton";

const LoginModal = () => {
    return (
        <OpenModalButton
            buttonText="Login"
            modalComponent={<LoginForm />}
        />
    );
};

export default LoginModal
