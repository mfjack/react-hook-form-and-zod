import { z } from "zod";

export const userRegisterSchema = z
    .object({
        name: z.string().min(1, "O campo nome precisa ser preenchido"),
        email: z
            .string()
            .min(1, "O campo email é obrigatório")
            .email("Email inválido")
            .regex(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                "Email inválido",
            ),
        password: z
            .string()
            .min(1, "O campo senha é obrigatório")
            .min(6, "A senha deve ter pelo menos 6 dígitos"),
        password_confirmation: z
            .string()
            .min(1, "O campo confirmação de senha é obrigatório")
            .min(6, "A confirmação de senha deve ter pelo menos 6 dígitos"),
        phone: z
            .string()
            .min(1, "O campo telefone é obrigatório")
            .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido."),
        cpf: z
            .string()
            .min(1, "O campo CPF é obrigatório")
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido."),
        zipcode: z
            .string()
            .min(1, "O campo CEP é obrigatório")
            .regex(/^\d{5}-\d{3}$/, "CEP inválido."),
        address: z.string().min(1, "O campo endereço é obrigatório"),
        city: z.string().min(1, "O campo cidade é obrigatório"),
        terms: z.boolean().refine((value) => value, {
            message: "Os termos de uso são obrigatórios",
        }),
    })
    .refine(
        (data) => {
            return data.password === data.password_confirmation;
        },
        {
            message: "As senhas devem ser iguais",
            path: ["password_confirmation"],
        },
    );

export interface UserRegister extends z.infer<typeof userRegisterSchema> {}
