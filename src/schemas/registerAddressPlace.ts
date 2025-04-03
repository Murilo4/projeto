import { z } from 'zod';

const addressSchema = z.object({
  addressName: z
    .string()
    .min(3, 'Nome do endereço deve ter pelo menos 3 caracteres')
    .max(100, 'Nome do endereço não pode ter mais de 100 caracteres'),
    cep: z
    .string()
    .min(8, 'CEP deve ter pelo menos 8 caracteres')
    .max(9, "CEP pode ter no máximo 9 caracteres")
    .regex(/^\d{5}-?\d{3}$/, 'CEP deve conter 8 caracteres, podendo incluir um hífen'),
  street: z
    .string()
    .min(3, 'Rua deve ter pelo menos 3 caracteres')
    .max(100, 'Rua não pode ter mais de 100 caracteres'),
  neighborhood: z
    .string()
    .min(3, 'Bairro deve ter pelo menos 3 caracteres')
    .max(100, 'Bairro não pode ter mais de 100 caracteres'),
  city: z
    .string()
    .min(3, 'Cidade deve ter pelo menos 3 caracteres')
    .max(100, 'Cidade não pode ter mais de 100 caracteres'),
  state: z
    .string()
    .min(2, 'Estado deve ter pelo menos 2 caracteres'),
  number: z
    .string()
    .min(1, 'Número não pode estar vazio')
    .max(10, 'Número não pode ter mais de 10 caracteres')
    .regex(/^\d+$/, 'Número deve conter apenas números'),
});

export default addressSchema;