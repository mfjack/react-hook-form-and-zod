import { useState } from "react";
import Button from "./_components/Button";
import Input from "./_components/Input";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";

const Form = () => {
   const [passwordVisible, setPasswordVisible] = useState(false);

   const handlePasswordPassword = () => {
      setPasswordVisible(!passwordVisible);
   };

   return (
      <form className="flex h-screen flex-col items-center justify-center gap-4 p-5">
         <Input type="text" placeholder="Nome Completo" />

         <Input type="email" placeholder="E-mail" />

         <div className="relative w-full">
            <Input type={passwordVisible ? "text" : "password"} placeholder="Senha" />
            <button className="absolute right-3 top-3" type="button" onClick={handlePasswordPassword}>
               {passwordVisible ? <HiMiniEyeSlash size={20} /> : <IoEyeSharp size={20} />}
            </button>
         </div>

         <div className="relative w-full">
            <Input type={passwordVisible ? "text" : "password"} placeholder="Confirmar Senha" />
            <button className="absolute right-3 top-3" type="button" onClick={handlePasswordPassword}>
               {passwordVisible ? <HiMiniEyeSlash size={20} /> : <IoEyeSharp size={20} />}
            </button>
         </div>
         
         <Input type="text" placeholder="Celular" />
         <Input type="text" placeholder="CPF" />
         <Input type="text" placeholder="CEP" />
         <Input type="text" placeholder="Endereço" disabled />
         <Input type="text" placeholder="Cidade" disabled />

         <Button>Cadastrar</Button>
      </form>
   );
};

export default Form;
