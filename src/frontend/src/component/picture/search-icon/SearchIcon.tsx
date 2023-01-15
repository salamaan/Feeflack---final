import "./SearchIcon.css"

interface SearchIconProps {
    onClickHandler: () => void;
}

const SearchIcon = (props: SearchIconProps) => {
    const {onClickHandler} = props;

    return <button onClick={onClickHandler} className="search-icon">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
             preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
               fill="#949191" stroke="none">
                <path d="M1914 5100 c-315 -48 -646 -172 -899 -337 -560 -367 -928 -964 -1005
                        -1632 -18 -155 -8 -496 19 -641 90 -483 308 -892 648 -1221 349 -337 776 -546
                        1259 -615 160 -23 448 -23 609 0 355 51 685 177 963 369 l73 50 512 -510 c571
                        -569 554 -555 692 -561 106 -5 177 21 245 88 67 68 93 139 88 245 -6 137 8
                        121 -561 692 l-510 512 72 108 c307 462 431 1056 335 1611 -76 445 -277 846
                        -588 1169 -190 198 -374 335 -611 455 -231 117 -466 190 -716 222 -167 22
                        -467 20 -625 -4z m636 -670 c657 -134 1144 -631 1267 -1295 23 -126 23 -396
                        -1 -530 -40 -223 -144 -472 -274 -655 -86 -121 -251 -286 -372 -372 -535 -380
                        -1244 -394 -1788 -35 -686 452 -917 1331 -541 2057 239 462 702 784 1221 850
                        119 15 368 5 488 -20z"
                />
            </g>
        </svg>
    </button>
};

export default SearchIcon;