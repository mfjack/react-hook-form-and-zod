import { useState } from "react";
import Button from "../_components/Button";
import Input from "../_components/Input";

import { useHookFormMask } from "use-mask-input";
import { Eye, EyeOff } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

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

            const result = await response.json();

            if (!response.ok) {
                for (const field in result.errors) {
                    setError(field, {
                        type: "manual",
                        message: result.errors[field],
                    });
                }
            } else {
                console.log(result);
            }
        } catch (error) {
            setError("server", {
                type: "manual",
                message: "Ocorreu um erro ao tentar registrar o usuário.",
            });
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
                    {...register("name", {
                        required: "O campo nome é obrigatório",
                        minLength: {
                            value: 3,
                            message: "O nome deve ter pelo menos 3 dígitos",
                        },
                    })}
                />
                <p className="font-light text-red-400">
                    {errors.name?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="email"
                    placeholder="E-mail"
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido",
                        },
                        required: "O campo email é obrigatório",
                    })}
                />
                <p className="font-light text-red-400">
                    {errors.email?.message as string}
                </p>
            </label>

            <div className="relative w-full">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha"
                    {...register("password", {
                        required: "O campo senha é obrigatório",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter pelo menos 6 dígitos",
                        },
                    })}
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
                    {...register("password_confirmation", {
                        required: "O campo confirmar a senha é obrigatório",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter pelo menos 6 dígitos",
                        },
                        validate(value, formValues) {
                            if (value === formValues.password) return true;

                            return "As senhas devem ser iguais";
                        },
                    })}
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
                    {...registerWithMask("phone", "(99) 99999-9999", {
                        pattern: {
                            value: /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345689]|7[13456789]|9[13456789])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
                            message: "Celular inválido",
                        },
                        required: "O celular é obrigatório",
                    })}
                />
                <p className="font-light text-red-400">
                    {errors.phone?.message as string}
                </p>
            </label>

            <label className="w-full">
                <Input
                    type="text"
                    placeholder="CPF"
                    {...registerWithMask("cpf", "999.999.999-99", {
                        pattern: {
                            value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                            message: "CPF inválido",
                        },
                        required: "O campo CPF é obrigatório",
                    })}
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
                        pattern: {
                            value: /^\d{5}\-\d{3}$/,
                            message: "CEP inválido",
                        },
                        required: "O campo CEP é obrigatório",
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
                    {...register("address", {
                        required: "O campo endereço é obrigatório",
                    })}
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
                    {...register("city", {
                        required: "O campo cidade é obrigatório",
                    })}
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
                        {...register("terms", {
                            required: "Os termos e condições devem ser aceitos",
                        })}
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
