import * as z from "zod";

export const registerPlace = z.object({
  placeName: z.string().min(3, "Nome completo é obrigatório"),
  description: z.string().min(3, "descrição é obrigatória"),
  type: z.string().min(3, "Tipo é obrigatório"),
  workStart: z.string(),
  workStop: z.string(),
  locationX: z.string(),
  locationY: z.string(),
  about: z.string().min(10, "informações relacionadas devem ter no mínimo 10 caracteres"),
  categories: z.string().min(3, "pelo menos um categoria é obrigatório"),
  photo: z.string()
})

export default registerPlace
