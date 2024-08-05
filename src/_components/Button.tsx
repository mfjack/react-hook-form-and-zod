import { ComponentProps } from "react";
import { cn } from "../_lib/utils";

interface ButtonProps extends ComponentProps<"button"> {}

const Button = ({ className, children, ...props }: ButtonProps) => {
   return (
      <>
         <button
            className={cn(
               "w-full rounded-md bg-blue-500 p-2 text-white",
               className,
            )}
            {...props}
         >
            {children}
         </button>
      </>
   );
};

export default Button;
