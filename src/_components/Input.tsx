import { ComponentProps, forwardRef } from "react";
import { cn } from "../_lib/utils";

interface InputProps extends ComponentProps<"input"> {
    errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ errorMessage, className, ...props }, ref) => {
        return (
            <div className="flex w-full flex-col">
                <input
                    className={cn(
                        "rounded-md border-2 p-2 shadow-md focus:outline-none",
                        className,
                    )}
                    type="text"
                    placeholder="Nome Completo"
                    {...props}
                    ref={ref}
                />
                <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
            </div>
        );
    },
);

export default Input;
