import { useState } from "react";
import Button from "../_components/Button";
import Input from "../_components/Input";

import { Eye, EyeOff } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegister, userRegisterSchema } from "../schema";
import toast from "react-hot-toast";

const Form = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });

    const registerWithMask = useHookFormMask(register);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleZipCode = async (e: React.FocusEvent<HTMLInputElement>) => {
        const zipcode = e.target.value;

        try {
            const response = await fetch(
                `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
            );

            const data = await response.json();

            setValue("address", data.street);
            setValue("city", data.city);
        } catch (error) {}
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await fetch(
                "https://apis.codante.io/api/register-user/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                const result = await response.json();

                for (const field in result.errors) {
                    setError(field as keyof UserRegister, {
                        type: "manual",
                        message: result.errors[field],
                    });
                }

                toast.error("Erro ao cadastrar usuário.");
                return;
            }

            toast.success("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro inesperado:", error);
            toast.error("Ocorreu um erro inesperado.");
        } finally {
            reset();
        }
    };
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <form
                className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 p-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    type="text"
                    placeholder="Nome Completo"
                    {...register("name")}
                    errorMessage={errors.name?.message as string}
                />

                <Input
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
                    errorMessage={errors.email?.message as string}
                />

                <div className="relative w-full">
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Senha"
                        {...register("password")}
                        errorMessage={errors.password?.message as string}
                    />
                    <button
                        className="absolute right-3 top-3"
                        type="button"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <EyeOff
                                size={20}
                                color="#5c5c5c"
                                strokeWidth={1.25}
                            />
                        ) : (
                            <Eye size={20} color="#5c5c5c" strokeWidth={1.25} />
                        )}
                    </button>
                </div>

                <div className="relative w-full">
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirmar Senha"
                        {...register("password_confirmation")}
                        errorMessage={
                            errors.password_confirmation?.message as string
                        }
                    />
                    <button
                        className="absolute right-3 top-3"
                        type="button"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <EyeOff
                                size={20}
                                color="#5c5c5c"
                                strokeWidth={1.25}
                            />
                        ) : (
                            <Eye size={20} color="#5c5c5c" strokeWidth={1.25} />
                        )}
                    </button>
                </div>

                <Input
                    type="text"
                    placeholder="Celular"
                    {...registerWithMask("phone", "(99) 99999-9999")}
                    errorMessage={errors.phone?.message as string}
                />

                <Input
                    type="text"
                    placeholder="CPF"
                    {...registerWithMask("cpf", "999.999.999-99")}
                    errorMessage={errors.cpf?.message as string}
                />

                <Input
                    type="text"
                    placeholder="CEP"
                    {...registerWithMask("zipcode", "99999-999", {
                        onBlur: handleZipCode,
                    })}
                    errorMessage={errors.zipcode?.message as string}
                />

                <Input
                    type="text"
                    placeholder="Endereço"
                    disabled
                    {...register("address")}
                    errorMessage={errors.address?.message as string}
                />

                <Input
                    type="text"
                    placeholder="Cidade"
                    disabled
                    {...register("city")}
                    errorMessage={errors.city?.message as string}
                />

                <label className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <Input
                            className="accent-slate-500"
                            type="checkbox"
                            {...register("terms")}
                        />
                        <p className="whitespace-nowrap">
                            Aceito os{" "}
                            <span className="cursor-pointer font-medium underline">
                                termos e condições
                            </span>
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-red-400">
                        {errors.terms?.message as string}
                    </p>
                </label>

                <Button>Cadastrar</Button>
            </form>
        </div>
    );
};

export default Form;
