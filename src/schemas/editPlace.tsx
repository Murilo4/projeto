import * as z from "zod";

export const editPlace = z.object({
  placeName: z.string().min(3, "Nome completo é obrigatório"),
  description: z.string().min(3, "descrição é obrigatória"),
  workStart: z.string(),
  workStop: z.string(),
  about: z.string().min(10, "informações relacionadas devem ter no mínimo 10 caracteres"),
})

export default editPlace
