import Picture from "../Picture";
import './Icon.css'
import '../../util/welcome-animation/WelcomeAnimation.css'

interface AppIconProps {
    src: string;
    size: string;
    hasAnimation?: boolean;
}

const Icon = (props: AppIconProps) => {
    const {
        src,
        size,
        hasAnimation = false
    } = props;

    const classes = hasAnimation ? "welcome-animation welcome-image" : "";

    return <div className={classes} style={{width: size, height: size}}>
        <Picture src={src} className="icon"/>
    </div>
}

export default Icon;