import { CidadeData } from '@/types/Restaurantes';

const data: {
    [cidade: string]: CidadeData;
  } = {
    Franca: {
      Restaurantes: [
        {
          nome: 'Restaurante Cio da Terra Grill',
          estrelas: 4,
          descricao: 'Ótimo lugar para se ir com a família',
          categorias: ['Bebidas', 'Lanches', 'Almoço'],
          horario: 'Fecha às 01:00',
          imagens: ['/logo1.png', '/logo1.png', '/logo1.png'],
          link: '/main-page',
          map: 'https://www.google.com/maps/embed?...',
        },
        {
          nome: "JOR-G BURG'S",
          estrelas: 5,
          descricao: 'Ambiente descontraído com música ao vivo',
          categorias: ['Bares', 'Petiscos'],
          horario: 'Fecha às 02:00',
          imagens: ['/logo2.png', '/logo2.png', '/logo2.png'],
          link: '/JorGBurgS',
          map: 'https://www.google.com/maps/embed?...',
        },
      ],
      Hoteis: [
        {
          nome: 'Hotel Franca Palace',
          estrelas: 4,
          descricao: 'Conforto e tranquilidade no centro da cidade',
          categorias: ['Acomodações', 'Lazer'],
          horario: 'Recepção 24h',
          imagens: ['/hotel1.png', '/hotel1.png', '/hotel1.png'],
          link: '/hotel-franca',
          map: 'https://www.google.com/maps/embed?...',
        },
      ],
      Historia: [
        {
          info: 'Franca, localizada no interior do estado de São Paulo, tem uma rica história que remonta aos períodos coloniais. A cidade foi fundada oficialmente em 6 de agosto de 1864, mas sua origem remonta ao século XIX, quando a região era habitada por indígenas e explorada por bandeirantes, que eram conhecidos por suas expedições pelo interior do Brasil.Primeiros habitantes e fundação Antes de sua fundação, a área onde hoje se encontra a cidade de Franca era uma região de terras férteis, ocupada por tribos indígenas, como os Guarani. A fundação de Franca está ligada à expansão da pecuária e da agricultura, principalmente devido ao cultivo de café, que era o principal produto da região. Desenvolvimento e crescimento No século XIX, a cidade começou a se desenvolver rapidamente com a chegada de imigrantes, principalmente italianos, que se estabeleceram na região e contribuíram significativamente para o crescimento econômico local. A cidade se consolidou como um importante centro comercial e produtivo, com destaque para a indústria de calçados, que tornou Franca conhecida como a "capital do calçado". A indústria de calçados de Franca começou a se expandir no início do século XX, e até hoje a cidade é um dos maiores polos de produção de calçados do Brasil. Século XX e modernização Com o tempo, a cidade passou a se modernizar com a construção de infraestrutura, como estradas, pontes e escolas. O setor comercial e industrial se consolidou e a cidade se transformou em um dos maiores centros de comércio e produção da região. Franca também se destaca por sua forte presença cultural, com diversas festas tradicionais e eventos, como o Carnaval, a Festa do Peão de Boiadeiro e a Festa de Nossa Senhora da Conceição, padroeira da cidade. Essas festas são importantes para a preservação das tradições locais e atraem turistas de várias partes do país. Economia A economia de Franca, além de ser fortemente impulsionada pela indústria de calçados, também tem outras atividades econômicas, como a agricultura (principalmente café e cana-de-açúcar) e o comércio. A cidade se caracteriza por uma forte presença do setor terciário, com muitos comércios e serviços para a população. Cultura e atualidade Atualmente, Franca é uma cidade em constante crescimento, com um perfil de cidade média do interior paulista, caracterizada por uma boa qualidade de vida e um ambiente acolhedor para moradores e turistas. Além disso, a cidade tem investido em educação, cultura e saúde, mantendo-se como um polo de desenvolvimento e inovação, especialmente no setor industrial. A história de Franca reflete o crescimento de muitas cidades do interior paulista, que souberam se adaptar às mudanças econômicas e sociais ao longo dos anos, mantendo suas tradições, mas também buscando o progresso e o desenvolvimento. Em resumo, a cidade de Franca é um exemplo de como uma comunidade pode se desenvolver a partir de suas raízes históricas e culturais, enquanto se moderniza para enfrentar os desafios contemporâneos.',
          imagens: ['/mainPhotos/franca2.png', '/mainPhotos/Franca_02.jpg'],
        },
      ],
      Atracoes: [
        {
          nome: 'Parque Ecológico do Morro do Diabo',
          descricao: 'Parque ecológico localizado no Morro do Diabo',
          imagens: ['/parque1.png', '/parque2.png'],
        },
      ],
    },
    Rifaina: {
      Restaurantes: [
        {
          nome: 'Restaurante Lagoa Azul',
          estrelas: 5,
          descricao: 'Ótima vista do lago com pratos à base de peixe',
          categorias: ['Peixes', 'Almoço'],
          horario: 'Fecha às 21:00',
          imagens: ['/restaurante_lagoa.png', '/restaurante_lagoa2.png'],
          link: '/restaurante-lagoa',
          map: 'https://www.google.com/maps/embed?...',
        },
      ],
      Hoteis: [
        {
          nome: 'Hotel Refúgio das Águas',
          estrelas: 5,
          descricao: 'Hotel aconchegante com vista para o lago',
          categorias: ['Acomodações', 'Relaxamento'],
          horario: 'Recepção 24h',
          imagens: ['/hotel_refugio.png'],
          link: '/hotel-refugio',
          map: 'https://www.google.com/maps/embed?...',
        },
      ],
      Historia: [
        {
          info: 'Rifaina, localizada no interior de São Paulo, tem uma história encantadora...',
          imagens: ['/historia_rifaina.png'],
        },
      ],
      Atracoes: [
        {
          nome: 'Ilha do Sol',
          descricao: 'Uma atração natural, ideal para passeios de barco',
          imagens: ['/ilha_sol.png', '/ilha_sol2.png'],
        },
      ],
    },
  };

  export default data