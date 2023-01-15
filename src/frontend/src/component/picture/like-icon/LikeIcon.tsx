import "./LikeIcon.css"
import {LikeService} from "../../../service/entity/LikeService";
import {useState} from "react";

interface LikeIconProps {
    isAlreadyLiked: boolean;
    postId: string;
    setIsLikedByIssuer: (isLiking: boolean, postId: string) => void;
}

const LikeIcon = (props: LikeIconProps) => {
    const {isAlreadyLiked, postId, setIsLikedByIssuer} = props;
    const [style, setStyle] = useState(isAlreadyLiked ? "" : "not-liked");

    const onClick = () => {
        if(isAlreadyLiked) {
            LikeService.unlikePost(localStorage.getItem('issuer_id')!, postId)
                .then(() => {
                    setStyle("not-liked");
                    setIsLikedByIssuer(false, postId);
                });
        }
        else {
            LikeService.likePost(localStorage.getItem('issuer_id')!, postId)
                .then(() => {
                    setStyle("");
                    setIsLikedByIssuer(true, postId);
                });
        }
    };

    return <button className={`like-icon ${style}`} onClick={onClick}>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" height="350.000000pt"
                viewBox="0 0 350.000000 350.000000"
                preserveAspectRatio="xMidYMid meet">
        <g transform="translate(-90.000000,350.000000) scale(0.20000,-0.20000)"
           fill="#982ed2" stroke="none">
            <path d="M2005 1713 c-11 -3 -31 -13 -45 -23 -25 -18 -138 -60 -160 -60 -6 0
                    -23 -12 -38 -26 -15 -15 -58 -43 -95 -63 -47 -25 -79 -52 -105 -86 -35 -46
                    -41 -50 -78 -48 -21 2 -95 4 -164 5 l-125 3 -87 -42 c-48 -23 -115 -61 -150
                    -85 -35 -23 -90 -56 -123 -73 -48 -24 -64 -38 -80 -71 -11 -23 -53 -73 -92
                    -112 -78 -76 -133 -153 -133 -187 0 -12 7 -30 15 -41 8 -10 15 -26 15 -35 0
                    -9 24 -54 53 -100 124 -195 124 -195 152 -344 24 -128 44 -185 63 -185 4 0 19
                    26 33 58 21 44 28 80 33 153 l6 97 -35 21 c-40 24 -50 45 -65 139 -7 40 -23
                    89 -41 121 -28 49 -29 55 -14 63 9 5 31 22 48 38 18 15 71 50 118 78 94 56
                    134 95 163 158 10 24 29 47 44 54 15 6 85 14 157 16 71 3 147 6 168 8 30 3 37
                    1 37 -13 0 -19 30 -51 48 -51 6 0 22 -11 35 -24 62 -62 164 -51 187 20 22 65
                    22 125 0 144 -11 9 -24 29 -30 44 -9 26 -13 27 -50 21 -22 -4 -40 -4 -40 0 0
                    15 83 115 112 136 18 12 74 62 125 112 98 96 98 96 235 114 74 9 86 34 23 46
                    -11 2 -19 9 -17 15 2 12 -62 15 -103 5z"
            />
        </g>
    </svg>
    </button>
}

export default LikeIcon;