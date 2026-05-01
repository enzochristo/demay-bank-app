import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function Card({ children, ...props }: CardProps) {
  return (
    <div className={twMerge(props.className)} >

      <div className="flex flex-col gap-1" > 
        {props.title && <h1 className="text-white">{props.title}</h1>}
        {props.description && <p className="text-white/60">{props.description}</p>}
      </div>

      <div>
        {children}
      </div>
      
    </div>
  );
}
