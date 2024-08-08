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
            // Realiza a requisição para a API
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
        <form
            className="flex h-screen flex-col items-center justify-center gap-4 p-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className="w-full">
                <Input
                    type="text"
                    placeholder="Nome Completo"
                    {...register("name")}
                />
                <p className="font-light text-red-400">
                    {errors.name?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
                />
                <p className="font-light text-red-400">
                    {errors.email?.message as string}
                </p>
            </label>

            <div className="relative w-full">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha"
                    {...register("password")}
                />
                <p className="font-light text-red-400">
                    {errors.password?.message as string}
                </p>
                <button
                    className="absolute right-3 top-3"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? (
                        <EyeOff size={20} color="#5c5c5c" strokeWidth={1.25} />
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
                />
                <p className="font-light text-red-400">
                    {errors.password_confirmation?.message as string}
                </p>
                <button
                    className="absolute right-3 top-3"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? (
                        <EyeOff size={20} color="#5c5c5c" strokeWidth={1.25} />
                    ) : (
                        <Eye size={20} color="#5c5c5c" strokeWidth={1.25} />
                    )}
                </button>
            </div>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="Celular"
                    {...registerWithMask("phone", "(99) 99999-9999")}
                />
                <p className="font-light text-red-400">
                    {errors.phone?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="CPF"
                    {...registerWithMask("cpf", "999.999.999-99")}
                />
                <p className="font-light text-red-400">
                    {errors.cpf?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="CEP"
                    {...registerWithMask("zipcode", "99999-999", {
                        onBlur: handleZipCode,
                    })}
                />
                <p className="font-light text-red-400">
                    {errors.zipcode?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="Endereço"
                    disabled
                    {...register("address")}
                />
                <p className="font-light text-red-400">
                    {errors.address?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="Cidade"
                    disabled
                    {...register("city")}
                />
                <p className="font-light text-red-400">
                    {errors.city?.message as string}
                </p>
            </label>

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
                <p className="font-light text-red-400">
                    {errors.terms?.message as string}
                </p>
            </label>

            <Button>Cadastrar</Button>
        </form>
    );
};

export default Form;
