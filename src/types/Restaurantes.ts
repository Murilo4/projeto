export interface Restaurante {
  nome: string;
  estrelas: number;
  descricao: string;
  categorias: string[];
  horario: string;
  imagens: string[];
  link: string;
  map: string;
}

export interface Historia {
  info: string;
  imagens: string[];
}

export interface Atracao {
  nome: string;
  descricao: string;
  imagens: string[];
}

export interface CidadeData {
  Restaurantes: Restaurante[];
  Hoteis: Restaurante[];
  Historia: Historia[];
  Atracoes: Atracao[];
}