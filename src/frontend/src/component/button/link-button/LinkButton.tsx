import Button from "../Button";
import "./LinkButton.css"

interface LinkButtonProps {
    text: string;
}

const LinkButton = (props: LinkButtonProps) => {
    const {text} = props;

    return <div className="link-button flex align-center">
        <div className="link-button-dot"/>
        <Button text={text}/>
    </div>
}

export default LinkButton;