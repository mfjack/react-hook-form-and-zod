import Button from "./_components/Button";
import Input from "./_components/Input";

const Form = () => {
   return (
      <form className="flex h-screen flex-col items-center justify-center gap-4 p-5">
         <Input type="text" placeholder="Nome Completo" />
         <Input type="email" placeholder="E-mail" />
         <Input type="password" placeholder="Senha" />
         <Input type="password" placeholder="Confirmar Senha" />
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
