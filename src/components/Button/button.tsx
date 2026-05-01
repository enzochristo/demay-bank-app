import { twMerge } from 'tailwind-merge'


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onlyIcon?: boolean;
    text ?: string;
}


export function Button({ ...props}: ButtonProps) {

    return (
        <button  
            {...props}
            className={twMerge(props.onlyIcon ? "p-2": "flex flex-row gap-2", props.className)}
        >
            {props.text}
            {props.children}
            
        </button>
    )
}