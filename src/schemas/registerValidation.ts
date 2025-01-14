import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  confirmEmail: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os emails não coincidem",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export default registerSchema
