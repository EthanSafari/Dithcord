import OpenModalButton from "./OpenModalButton";

const Greeting = () => {
    return (
        <OpenModalButton
            buttonText="Greeting"
            modalComponent={<h2>Hello World!</h2>}
        />
    );
};

export default Greeting
