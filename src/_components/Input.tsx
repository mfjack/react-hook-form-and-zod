import { ComponentProps } from "react";
import { cn } from "../_lib/utils";

interface InputProps extends ComponentProps<"input"> {
   errorMessage?: string;
}

const Input = ({ errorMessage, className, ...props }: InputProps) => {
   return (
      <div className="flex w-full flex-col">
         <input
            className={cn(
               "rounded-md border-2 p-2 focus:outline-none",
               className,
            )}
            type="text"
            placeholder="Nome Completo"
            {...props}
         />
         <p className="text-xs font-medium text-red-400">{errorMessage}</p>
      </div>
   );
};

export default Input;
