import { z } from 'zod';

const addressSchema = z.object({
  addressName: z
    .string()
    .min(3, 'Nome do endereço deve ter pelo menos 3 caracteres')
    .max(100, 'Nome do endereço não pode ter mais de 100 caracteres'),
  cep: z
    .string()
    .length(8, 'CEP deve ter exatamente 8 caracteres')
    .regex(/^\d+$/, 'CEP deve conter apenas números'),
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
    .min(2, 'Estado deve ter pelo menos 2 caracteres')
    .max(2, 'Estado deve ter exatamente 2 caracteres')
    .regex(/^[A-Za-z]+$/, 'Estado deve conter apenas letras'),
  addressType: z
    .string()
    .refine((val) => ['residencial', 'comercial'].includes(val), 'Tipo de endereço deve ser "residencial" ou "comercial"'),
  number: z
    .string()
    .min(1, 'Número não pode estar vazio')
    .max(10, 'Número não pode ter mais de 10 caracteres')
    .regex(/^\d+$/, 'Número deve conter apenas números'),
});

export default addressSchema;