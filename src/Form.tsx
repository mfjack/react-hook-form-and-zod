import { useState } from "react";
import Button from "./_components/Button";
import Input from "./_components/Input";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { withMask } from "use-mask-input";

const Form = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [address, setAddress] = useState({ street: "", city: "" });

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

            setAddress({
                street: data.street,
                city: data.city,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="flex h-screen flex-col items-center justify-center gap-4 p-5">
            <Input type="text" placeholder="Nome Completo" required />
            <Input type="email" placeholder="E-mail" />

            <div className="relative w-full">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha"
                    required
                />
                <button
                    className="absolute right-3 top-3"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? (
                        <HiMiniEyeSlash size={20} />
                    ) : (
                        <IoEyeSharp size={20} />
                    )}
                </button>
            </div>

            <div className="relative w-full">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    required
                />
                <button
                    className="absolute right-3 top-3"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? (
                        <HiMiniEyeSlash size={20} />
                    ) : (
                        <IoEyeSharp size={20} />
                    )}
                </button>
            </div>

            <Input
                type="text"
                placeholder="Celular"
                ref={withMask("(99) 99999-9999")}
                required
            />
            <Input
                type="text"
                placeholder="CPF"
                ref={withMask("999.999.999-99")}
                required
            />
            <Input
                type="text"
                placeholder="CEP"
                onBlur={handleZipCode}
                ref={withMask("99999-999")}
                required
            />
            <Input
                type="text"
                placeholder="Endereço"
                disabled
                value={address.street}
            />
            <Input
                type="text"
                placeholder="Cidade"
                disabled
                value={address.city}
            />

            <Button>Cadastrar</Button>
        </form>
    );
};

export default Form;
