import Button from "../button/Button";
import "./Modal.css"
import {Fragment} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    title: string;
    applyHandler: () => void;
    cancelHandler: () => void;
    body: JSX.Element;
}

const Backdrop = () => {
    return <div className="backdrop"/>
}

const Overlay = (props: ModalProps) => {
    const {title, applyHandler, cancelHandler, body} = props;

    return <div className="modal">
        <header className="modal-header">
            <h2>{title}</h2>
        </header>
        <div className="modal-content">
            {body}
        </div>
        <footer className="modal-actions">
            <Button text={"Apply"} onClickHandler={applyHandler}/>
            <Button text={"Cancel"} onClickHandler={cancelHandler}/>
        </footer>
    </div>
}

const Modal = (props: ModalProps) => {
    const {title, applyHandler, cancelHandler, body} = props;

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop/>, document.getElementById("backdrop-root")!)}
        {ReactDOM.createPortal(
            <Overlay title={title} body={body} applyHandler={applyHandler} cancelHandler={cancelHandler}/>,
            document.getElementById("overlay-root")!
        )}
    </Fragment>
}

export default Modal;