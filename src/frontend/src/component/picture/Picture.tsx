interface PictureProps {
    src: string;
    className: string;
}

const Picture = (props: PictureProps) => {
    const {src, className} = props;

    return <img
        src={src}
        className={className}
        loading="lazy"
    />
}

export default Picture;