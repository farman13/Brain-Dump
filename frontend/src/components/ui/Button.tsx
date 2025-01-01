import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    onClick: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const VariantsStyle = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
}

const SizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6",
}
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export const Button = (props: ButtonProps) => {

    return (
        <button className={`${VariantsStyle[props.variant]} ${defaultStyles} ${SizeStyles[props.size]} 
        ${props.fullwidth ? "w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : ""}`}
            disabled={props.loading} onClick={props.onClick} >
            <div className="pr-2">{props.startIcon}</div>
            {props.text}
        </button>
    )
}
