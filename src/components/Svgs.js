import * as React from "react"
import Svg, { Path, Defs, G, Circle, } from "react-native-svg"


export function DashboardIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 3" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 4"
                d="M4.333 16.333h8A1.337 1.337 0 0013.667 15V4.333A1.337 1.337 0 0012.333 3h-8A1.337 1.337 0 003 4.333V15a1.337 1.337 0 001.333 1.333zm0 10.667h8a1.337 1.337 0 001.333-1.333v-5.334A1.337 1.337 0 0012.333 19h-8A1.337 1.337 0 003 20.333v5.333A1.337 1.337 0 004.333 27zm13.333 0h8A1.337 1.337 0 0027 25.667V15a1.337 1.337 0 00-1.333-1.333h-8A1.337 1.337 0 0016.333 15v10.667A1.337 1.337 0 0017.667 27zM16.333 4.333v5.334A1.337 1.337 0 0017.667 11h8A1.337 1.337 0 0027 9.667V4.333A1.337 1.337 0 0025.667 3h-8a1.337 1.337 0 00-1.334 1.333z"
                transform="translate(1 1)"
                fill={props.color ? props.color : "#4a5160"}
            />
        </Svg>
    )
}

export function ShareIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 25 25"
            {...props}
        >
            <Path data-name="Path 46" d="M0 0h25v25H0z" fill="none" />
            <Path
                data-name="Path 47"
                d="M18.625 16.667a3.033 3.033 0 00-2.042.8l-7.427-4.321a3.41 3.41 0 00.094-.729 3.41 3.41 0 00-.094-.729L16.5 7.406a3.118 3.118 0 10-1-2.281 3.41 3.41 0 00.094.729L8.25 10.135a3.125 3.125 0 100 4.563l7.417 4.333a2.939 2.939 0 00-.083.677 3.042 3.042 0 103.042-3.042zm0-12.583a1.042 1.042 0 11-1.042 1.042 1.045 1.045 0 011.042-1.043zm-12.5 9.375a1.042 1.042 0 111.042-1.042 1.045 1.045 0 01-1.042 1.041zm12.5 7.313a1.042 1.042 0 111.042-1.042 1.045 1.045 0 01-1.042 1.041z"
                transform="translate(.125 .083)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function ArrowDown(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={11.175}
            height={6.585}
            viewBox="0 0 11.175 6.585"
            {...props}
        >
            <Path
                d="M8.12 9.29L12 13.17l3.88-3.88a1 1 0 111.41 1.41l-4.59 4.59a1 1 0 01-1.41 0L6.7 10.7a1 1 0 010-1.41 1.017 1.017 0 011.42 0z"
                transform="translate(-6.408 -8.997)"
                fill="#818caa"
            />
        </Svg>
    )
}

export function RestMenuIcon(props) {
    return (
        <Svg
            data-name="restaurant_menu_black_24dp (1)"
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 120" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 121"
                d="M9.887 16.742l3.773-3.773-8.253-8.24a1.341 1.341 0 00-2.147.36 5.355 5.355 0 001.04 6.08zm9.04-2.413c2.04.947 4.907.28 7.027-1.84 2.547-2.547 3.04-6.2 1.08-8.16s-5.6-1.467-8.16 1.08c-2.12 2.12-2.787 4.987-1.84 7.027L4.953 24.516a1.329 1.329 0 001.88 1.88l8.253-8.227 8.24 8.24a1.329 1.329 0 001.88-1.88l-8.24-8.24 1.96-1.96z"
                transform="translate(.913 1.044)"
                fill={props.color ? props.color : "#4a5160"}
            />
        </Svg>
    )
}

export function PersonIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 122" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 123"
                d="M14.667 14.667a5.333 5.333 0 10-5.334-5.334 5.332 5.332 0 005.334 5.334zm0 2.667C11.107 17.333 4 19.12 4 22.667V24a1.337 1.337 0 001.333 1.333H24A1.337 1.337 0 0025.333 24v-1.333c0-3.547-7.106-5.334-10.666-5.334z"
                transform="translate(1.333 1.333)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function EyeIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 40" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 41"
                d="M15.667 4A15.769 15.769 0 001 14a15.756 15.756 0 0029.333 0A15.769 15.769 0 0015.667 4zm0 16.667A6.667 6.667 0 1122.333 14a6.669 6.669 0 01-6.666 6.667zm0-10.667a4 4 0 104 4 3.995 3.995 0 00-4-4z"
                transform="translate(.333 1.333)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function ResturentBtmIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <G data-name="Group 43">
                <G data-name="Group 42" fill="none">
                    <Path data-name="Rectangle 36" d="M0 0H32V32H0z" />
                    <Path data-name="Rectangle 37" d="M0 0H32V32H0z" />
                </G>
            </G>
            <G data-name="Group 44">
                <Path
                    data-name="Path 23"
                    d="M28.533 9.52l-1.4-4.493A2.619 2.619 0 0024.586 3H6.066a2.618 2.618 0 00-2.533 2.027l-1.4 4.493a4.391 4.391 0 001.2 4.227v10.586A2.675 2.675 0 006 27h18.666a2.675 2.675 0 002.667-2.667V13.747a4.352 4.352 0 001.2-4.227zM16.666 5.667h2.613L20 10.36a1.68 1.68 0 11-3.333.227zm-8.747 5.146a1.677 1.677 0 01-1.613 1.52 1.748 1.748 0 01-1.587-2.187l1.347-4.48h2.627zM14 10.587a1.686 1.686 0 11-3.347-.227l.733-4.693H14zm10.36 1.747a1.667 1.667 0 01-1.613-1.52l-.773-5.147 2.573-.013 1.4 4.493a1.741 1.741 0 01-1.588 2.186z"
                    transform="translate(2.67 4) translate(-2.002 -3)"
                    fill={props.color ? props.color : "#4a5160"}
                />
            </G>
        </Svg>
    )
}

export function MenuBtmIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <G data-name="Group 37" fill="none">
                <Path data-name="Rectangle 31" d="M0 0H32V32H0z" />
                <Path data-name="Rectangle 32" d="M0 0H32V32H0z" />
            </G>
            <G data-name="Group 38" fill={props.color ? props.color : "#4a5160"}>
                <Path
                    data-name="Path 5"
                    d="M23 4.5a12.4 12.4 0 00-7.333 2 12.4 12.4 0 00-7.333-2 14.426 14.426 0 00-5.707 1.053A2.717 2.717 0 001 8.02v15.04a2.66 2.66 0 003.307 2.587 16.467 16.467 0 014.027-.48 14.1 14.1 0 016.08 1.227 2.74 2.74 0 002.493 0 13.907 13.907 0 016.08-1.227 16.467 16.467 0 014.027.48 2.648 2.648 0 003.306-2.587V8.02a2.717 2.717 0 00-1.627-2.467A14.317 14.317 0 0023 4.5zm4.667 16.973a1.346 1.346 0 01-1.6 1.307A16.811 16.811 0 0023 22.513a16.06 16.06 0 00-7.333 2V9.167a16.06 16.06 0 017.333-2 16.915 16.915 0 013.6.373 1.352 1.352 0 011.067 1.307z"
                    transform="translate(1.333 6) translate(-1 -4.5)"
                />
                <Path
                    data-name="Path 6"
                    d="M14.229 11.677a1 1 0 01-.307-1.947 17.737 17.737 0 017.147-.6 1 1 0 01-.227 1.987 15.76 15.76 0 00-6.307.52 2.772 2.772 0 01-.306.04z"
                    transform="translate(1.333 6) translate(3.078 -2.997)"
                />
                <Path
                    data-name="Path 7"
                    d="M14.229 14.337a1 1 0 01-.307-1.947 17.716 17.716 0 017.147-.6 1 1 0 01-.227 1.987 15.76 15.76 0 00-6.307.52 1.292 1.292 0 01-.306.04z"
                    transform="translate(1.333 6) translate(3.078 -2.11)"
                />
                <Path
                    data-name="Path 8"
                    d="M14.229 17a1 1 0 01-.307-1.947 17.716 17.716 0 017.147-.6 1 1 0 01-.227 1.987 15.76 15.76 0 00-6.307.52 1.292 1.292 0 01-.306.04z"
                    transform="translate(1.333 6) translate(3.078 -1.223)"
                />
            </G>
        </Svg>
    )
}

export function MoreIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 151" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 152"
                d="M4.333 22h21.334a1.333 1.333 0 000-2.667H4.333a1.333 1.333 0 100 2.667zm0-6.667h21.334a1.333 1.333 0 000-2.667H4.333a1.333 1.333 0 100 2.667zM3 7.333a1.337 1.337 0 001.333 1.334h21.334a1.333 1.333 0 000-2.667H4.333A1.337 1.337 0 003 7.333z"
                transform="translate(1 2)"
                fill={props.color ? props.color : "#4a5160"}
            />
        </Svg>
    )
}

export function CalenderIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 53" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 54"
                d="M9 11H7v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm2-7h-1V2h-2v2H8V2H6v2H5a1.991 1.991 0 00-1.99 2L3 20a2 2 0 002 2h14a2.006 2.006 0 002-2V6a2.006 2.006 0 00-2-2zm0 16H5V9h14z"
                fill="#818caa"
            />
        </Svg>
    )
}

export function FilterIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            {...props}
        >
            <Path data-name="Path 55" d="M0 0h16m0 16H0" fill="none" />
            <Path
                data-name="Path 56"
                d="M4.179 5.073C5.526 6.8 8.013 10 8.013 10v4a.669.669 0 00.667.667h1.333a.669.669 0 00.666-.667v-4s2.48-3.2 3.827-4.927A.665.665 0 0013.979 4H4.706a.665.665 0 00-.527 1.073z"
                transform="translate(-1.346 -1.333)"
                fill="#818caa"
            />
            <Path data-name="Path 57" d="M0 0h16v16H0z" fill="none" />
        </Svg>
    )
}

export function PersonIconSmall(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            {...props}
        >
            <Path data-name="Path 122" d="M0 0h16v16H0z" fill="none" />
            <Path
                data-name="Path 123"
                d="M9.333 9.333a2.667 2.667 0 10-2.666-2.666 2.666 2.666 0 002.666 2.666zm0 1.333C7.553 10.667 4 11.56 4 13.333V14a.669.669 0 00.667.667H14a.669.669 0 00.667-.667v-.667c0-1.773-3.554-2.666-5.334-2.666z"
                transform="translate(-1.333 -1.333)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function TrashIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 112" d="M0 0h24v24H0z" fill="none" />
            <Path data-name="Path 113" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 114"
                d="M6 19a2.006 2.006 0 002 2h8a2.006 2.006 0 002-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
                fill="#e85d4a"
            />
        </Svg>
    )
}

export function PlusSmall(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <G data-name="Group 146">
                <Path data-name="Rectangle 237" fill="none" d="M0 0H24V24H0z" />
            </G>
            <G data-name="Group 148">
                <G data-name="Group 147">
                    <Path
                        data-name="Path 90"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                        transform="translate(5 5) translate(-5 -5)"
                        fill="#f58b44"
                    />
                </G>
            </G>
        </Svg>
    )
}

export function EditIcon(props) {
    return (
        <Svg
            data-name="edit_black_24dp (1)"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 88" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 89"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                fill={props.color ? props.color : "#818caa"}
            />
        </Svg>
    )
}

export function InfoIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 158" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 159"
                d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 15a1 1 0 01-1-1v-4a1 1 0 012 0v4a1 1 0 01-1 1zm1-8h-2V7h2z"
                fill="#818caa"
            />
        </Svg>
    )
}

export function DownloadIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 160" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 161"
                d="M16.59 9H15V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v5H7.41a1 1 0 00-.71 1.71l4.59 4.59a1 1 0 001.41 0l4.59-4.59a1 1 0 00-.7-1.71zM5 19a1 1 0 001 1h12a1 1 0 000-2H6a1 1 0 00-1 1z"
                fill="#54c2bb"
            />
        </Svg>
    )
}

export function PLusIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={66}
            height={66}
            viewBox="0 0 66 66"
            {...props}
        >
            <Defs></Defs>
            <G data-name="Component 36 \u2013 1">
                <G transform="translate(9 6) translate(-9 -6)" filter="url(#a)">
                    <Circle
                        data-name="Ellipse 115"
                        cx={24}
                        cy={24}
                        r={24}
                        transform="translate(9 6)"
                        fill="#f58b44"
                    />
                </G>
                <G data-name="Group 738">
                    <Path
                        data-name="Rectangle 624"
                        fill="none"
                        transform="translate(9 6) translate(12 12)"
                        d="M0 0H24V24H0z"
                    />
                </G>
                <G data-name="Group 740">
                    <G data-name="Group 739">
                        <Path
                            data-name="Path 180"
                            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                            fill="#fff"
                            transform="translate(9 6) translate(12 12)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export function QRCodeIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <G data-name="Group 39" fill="none">
                <Path data-name="Rectangle 33" d="M0 0H32V32H0z" />
                <Path data-name="Rectangle 34" d="M0 0H32V32H0z" />
            </G>
            <G data-name="Group 41">
                <G data-name="Group 40" fill="#fff">
                    <Path
                        data-name="Path 9"
                        d="M5.667 13.667H11A2.675 2.675 0 0013.667 11V5.667A2.675 2.675 0 0011 3H5.667A2.675 2.675 0 003 5.667V11a2.675 2.675 0 002.667 2.667zm0-8H11V11H5.667z"
                        transform="translate(4 4) translate(-3 -3)"
                    />
                    <Path
                        data-name="Path 10"
                        d="M5.667 23.667H11A2.675 2.675 0 0013.667 21v-5.333A2.675 2.675 0 0011 13H5.667A2.675 2.675 0 003 15.667V21a2.675 2.675 0 002.667 2.667zm0-8H11V21H5.667z"
                        transform="translate(4 4) translate(-3 .333)"
                    />
                    <Path
                        data-name="Path 11"
                        d="M13 5.667V11a2.675 2.675 0 002.667 2.667H21A2.675 2.675 0 0023.667 11V5.667A2.675 2.675 0 0021 3h-5.333A2.675 2.675 0 0013 5.667zM21 11h-5.333V5.667H21z"
                        transform="translate(4 4) translate(.333 -3)"
                    />
                    <Path
                        data-name="Path 12"
                        d="M21.667 21v-1.333A.66.66 0 0021 19h-1.333a.66.66 0 00-.667.667V21a.66.66 0 00.667.667H21a.66.66 0 00.667-.667z"
                        transform="translate(4 4) translate(2.333 2.333)"
                    />
                    <Path
                        data-name="Path 13"
                        d="M13 13.667V15a.66.66 0 00.667.667H15a.66.66 0 00.667-.667v-1.333A.66.66 0 0015 13h-1.333a.66.66 0 00-.667.667z"
                        transform="translate(4 4) translate(.333 .333)"
                    />
                    <Path
                        data-name="Path 14"
                        d="M17 15h-1.333a.66.66 0 00-.667.667V17a.66.66 0 00.667.667H17a.66.66 0 00.667-.667v-1.333A.66.66 0 0017 15z"
                        transform="translate(4 4) translate(1 1)"
                    />
                    <Path
                        data-name="Path 15"
                        d="M13 17.667V19a.66.66 0 00.667.667H15a.66.66 0 00.667-.667v-1.333A.66.66 0 0015 17h-1.333a.66.66 0 00-.667.667z"
                        transform="translate(4 4) translate(.333 1.667)"
                    />
                    <Path
                        data-name="Path 16"
                        d="M15.667 21.667H17a.66.66 0 00.667-.667v-1.333A.66.66 0 0017 19h-1.333a.66.66 0 00-.667.667V21a.66.66 0 00.667.667z"
                        transform="translate(4 4) translate(1 2.333)"
                    />
                    <Path
                        data-name="Path 17"
                        d="M17.667 19.667H19a.66.66 0 00.667-.667v-1.333A.66.66 0 0019 17h-1.333a.66.66 0 00-.667.667V19a.66.66 0 00.667.667z"
                        transform="translate(4 4) translate(1.667 1.667)"
                    />
                    <Path
                        data-name="Path 18"
                        d="M19 13h-1.333a.66.66 0 00-.667.667V15a.66.66 0 00.667.667H19a.66.66 0 00.667-.667v-1.333A.66.66 0 0019 13z"
                        transform="translate(4 4) translate(1.667 .333)"
                    />
                    <Path
                        data-name="Path 19"
                        d="M19.667 17.667H21a.66.66 0 00.667-.667v-1.333A.66.66 0 0021 15h-1.333a.66.66 0 00-.667.667V17a.66.66 0 00.667.667z"
                        transform="translate(4 4) translate(2.333 1)"
                    />
                </G>
            </G>
        </Svg>
    )
}

export function CameraIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 125" d="M0 0h32v32H0z" fill="none" />
            <Circle
                data-name="Ellipse 83"
                cx={4}
                cy={4}
                r={4}
                transform="translate(12 12)"
                fill="#4a5160"
            />
            <Path
                data-name="Path 126"
                d="M26 4.667h-4.227l-1.653-1.8A2.654 2.654 0 0018.16 2h-5.653a2.705 2.705 0 00-1.973.867l-1.64 1.8H4.667A2.675 2.675 0 002 7.333v16A2.675 2.675 0 004.667 26H26a2.675 2.675 0 002.667-2.667v-16A2.675 2.675 0 0026 4.667zM15.333 22A6.667 6.667 0 1122 15.333 6.669 6.669 0 0115.333 22z"
                transform="translate(.667 .667)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function LogoutIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <G data-name="Group 45">
                <Path data-name="Path 28" d="M0 0h32v32H0z" fill="none" />
            </G>
            <G data-name="Group 47">
                <G data-name="Group 46" fill="#4a5160">
                    <Path
                        data-name="Path 29"
                        d="M5.667 5.667h8A1.337 1.337 0 0015 4.333 1.337 1.337 0 0013.667 3h-8A2.675 2.675 0 003 5.667v18.666A2.675 2.675 0 005.667 27h8A1.337 1.337 0 0015 25.667a1.337 1.337 0 00-1.333-1.333h-8z"
                        transform="translate(4 4) translate(-3 -3)"
                    />
                    <Path
                        data-name="Path 30"
                        d="M24.533 12.631l-3.72-3.72a.668.668 0 00-1.147.467v2.387h-9.333A1.337 1.337 0 009 13.1a1.337 1.337 0 001.333 1.333h9.333v2.387a.66.66 0 001.133.467l3.72-3.72a.656.656 0 00.014-.936z"
                        transform="translate(4 4) translate(-1 -1.097)"
                    />
                </G>
            </G>
        </Svg>
    )
}

export function ArrowLeft(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Path 82" d="M0 0h32v32H0z" fill="none" />
            <Path
                data-name="Path 83"
                d="M25.333 13.333H9.107L16.56 5.88 14.667 4 4 14.667l10.667 10.666 1.88-1.88L9.107 16h16.226z"
                transform="translate(1.333 1.333)"
                fill="#4a5160"
            />
        </Svg>
    )
}

export function BagIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            {...props}
        >
            <Path data-name="Rectangle 349" fill="none" d="M0 0H32V32H0z" />
            <Path
                data-name="Path 111"
                d="M22.667 7.333H20a5.333 5.333 0 10-10.667 0H6.667A2.675 2.675 0 004 10v16a2.675 2.675 0 002.667 2.667h16A2.675 2.675 0 0025.333 26V10a2.675 2.675 0 00-2.666-2.667zM12 12.667a1.333 1.333 0 01-2.667 0V10H12zm2.667-8a2.675 2.675 0 012.667 2.667H12a2.675 2.675 0 012.667-2.667zm5.333 8a1.333 1.333 0 11-2.667 0V10H20z"
                transform="translate(1.333 .667)"
                fill="#818caa"
            />
        </Svg>
    )
}

export function CloseIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 58" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 59"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="#e85d4a"
            />
        </Svg>
    )
}

export function TickIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            {...props}
        >
            <Path data-name="Path 99" d="M0 0h20v20H0z" fill="none" />
            <Path
                data-name="Path 100"
                d="M8.067 14.433l-3.5-3.5L3.4 12.1l4.667 4.667 10-10L16.9 5.6z"
                transform="translate(-.567 -.933)"
                fill="#fff"
            />
        </Svg>
    )
}

export function SpicyIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            {...props}
        >
            <G data-name="Group 127">
                <Path data-name="Rectangle 148" fill="none" d="M0 0H20V20H0z" />
            </G>
            <G data-name="Group 128">
                <Path
                    data-name="Path 79"
                    d="M16.9 10.541c-1.308-3.4-5.967-3.583-4.842-8.525a.42.42 0 00-.625-.458A7.775 7.775 0 008.058 11.6a.415.415 0 01-.625.492A4.149 4.149 0 015.9 8.133a.417.417 0 00-.758-.283A7.835 7.835 0 004 12.224a6.711 6.711 0 005.675 6.283 7.148 7.148 0 005.792-1.558 5.762 5.762 0 001.433-6.408zm-7.733 4.192a2.575 2.575 0 001.983-1.925c.275-1.192-.8-2.358-.075-4.242C11.35 10.124 13.8 11.1 13.8 12.8c.067 2.108-2.217 3.916-4.633 1.933z"
                    transform="translate(3.333 1.247) translate(-4 -1.496)"
                    fill="#4a5160"
                />
            </G>
        </Svg>
    )
}

export function Square1(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            {...props}
        >
            <G data-name="Group 576" transform="translate(-36 -509)">
                <G
                    data-name="Rectangle 227"
                    transform="translate(36 509)"
                    fill="none"
                    stroke={props.color ? props.color : "#ff0026"}
                    strokeWidth={2}
                >
                    <Path stroke="none" d="M0 0H16V16H0z" />
                    <Path d="M1 1H15V15H1z" />
                </G>
                <Circle
                    data-name="Ellipse 61"
                    cx={4}
                    cy={4}
                    r={4}
                    transform="translate(40 513)"
                    fill={props.color ? props.color : "#ff0026"}
                />
            </G>
        </Svg>
    )
}

export function MinusIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            {...props}
        >
            <Path data-name="Path 103" d="M0 0h20v20H0z" fill="none" />
            <Path
                data-name="Path 104"
                d="M16.667 12.667H5V11h11.667z"
                transform="translate(-.833 -1.833)"
            />
        </Svg>
    )
}

export function PlusIcon1(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            {...props}
        >
            <G data-name="Group 577">
                <G data-name="Group 89">
                    <Path
                        data-name="Rectangle 92"
                        fill="none"
                        transform="translate(-1084 -10522) translate(1084 10522)"
                        d="M0 0H20V20H0z"
                    />
                </G>
                <G data-name="Group 91">
                    <G data-name="Group 90">
                        <Path
                            data-name="Path 50"
                            d="M16.667 11.667h-5v5H10v-5H5V10h5V5h1.667v5h5z"
                            transform="translate(-1084 -10522) translate(1088.528 10526.167) translate(-5 -5)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export function ScheduleIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 118" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 119"
                d="M11.99 2A10 10 0 1022 12 10 10 0 0011.99 2zM12 20a8 8 0 118-8 8 8 0 01-8 8zm-.22-13h-.06a.717.717 0 00-.72.72v4.72a.99.99 0 00.49.86l4.15 2.49a.715.715 0 10.73-1.23l-3.87-2.3V7.72a.717.717 0 00-.72-.72z"
                fill="#818caa"
            />
        </Svg>
    )
}

export function EyeOff(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={20.571}
            height={17.629}
            viewBox="0 0 20.571 17.629"
            {...props}
        >
            <Path
                data-name="Icon ionic-md-eye-off"
                d="M12.538 8.209a4.663 4.663 0 014.678 4.641 4.465 4.465 0 01-.335 1.7l2.732 2.709a10.975 10.975 0 003.209-4.407A11.078 11.078 0 008.806 6.538l2.02 2.006a4.625 4.625 0 011.712-.335zM3.187 5.68L5.321 7.8l.432.427a10.922 10.922 0 00-3.5 4.627 11.095 11.095 0 0014.38 6.176l.395.39 2.741 2.709 1.189-1.18L4.371 4.5zm5.169 5.128l1.451 1.437a2.63 2.63 0 00-.073.6 2.791 2.791 0 002.8 2.782 2.638 2.638 0 00.606-.073l1.451 1.437a4.654 4.654 0 01-6.735-4.15 4.586 4.586 0 01.5-2.033zm4.031-.721l2.947 2.924.018-.147a2.791 2.791 0 00-2.8-2.782z"
                transform="translate(-2.25 -4.5)"
                fill="#b2b2b2"
            />
        </Svg>
    )
}
