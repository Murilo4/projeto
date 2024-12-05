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
          imagens: ['/cidades/logo1.png', '/cidades/cio-da-terra2.png'],
          link: '/main-page',
        },
        {
          nome: "JOR-G BURG'S",
          estrelas: 5,
          descricao: 'Ambiente descontraído com música ao vivo',
          categorias: ['Bares', 'Petiscos'],
          horario: 'Fecha às 02:00',
          imagens: ['/cidades/logo2.png', '/cidades/jorsburger.png', '/cidades/logo2.png'],
          link: '/JorGBurgS',
        },
        {
          nome: 'Restaurante Família Gaia',
          estrelas: 5,
          descricao: 'Ótimo lugar para se ir com a família',
          categorias: ['Bebidas', 'Lanches', 'Almoço'],
          horario: 'Fecha às 00:00',
          imagens: ['/cidades/familia-gaia1.png', '/cidades/familia-gaia2.png'],
          link: '/main-page',
        },
        {
          nome: "Gasparini Restaurante e Pizzaria",
          estrelas: 3,
          descricao: 'Ambiente descontraído com música ao vivo',
          categorias: ['Bares', 'Petiscos'],
          horario: 'Fecha às 02:00',
          imagens: ['/cidades/gasparini-restaurante1.png', '/cidades/gasparini-restaurante2.png'],
          link: '/JorGBurgS',
        },
        {
          nome: 'Restaurante Cio da Terra Grill',
          estrelas: 4,
          descricao: 'Ótimo lugar para se ir com a família',
          categorias: ['Bebidas', 'Lanches', 'Almoço'],
          horario: 'Fecha às 01:00',
          imagens: ['/cidades/logo1.png', '/cidades/logo1.png', '/cidades/logo1.png'],
          link: '/main-page',
        },
      ],
      Hoteis: [
        {
          nome: 'Dan Inn Franca & Convenções',
          estrelas: 5,
          descricao: 'Conforto e tranquilidade no centro da cidade',
          categorias: ['Acomodações', 'Lazer'],
          horario: 'Recepção 24h',
          imagens: ['/cidades/dan-in.png', '/cidades/dan-in-2.png'],
          link: '/Dan-Inn-Franca',
        },
      ],
      Historia: [
        {
          info: 'Franca, localizada no interior do estado de São Paulo, tem uma rica história que remonta aos períodos coloniais. A cidade foi fundada oficialmente em 6 de agosto de 1864, mas sua origem remonta ao século XIX, quando a região era habitada por indígenas e explorada por bandeirantes, que eram conhecidos por suas expedições pelo interior do Brasil.Primeiros habitantes e fundação Antes de sua fundação, a área onde hoje se encontra a cidade de Franca era uma região de terras férteis, ocupada por tribos indígenas, como os Guarani. A fundação de Franca está ligada à expansão da pecuária e da agricultura, principalmente devido ao cultivo de café, que era o principal produto da região. Desenvolvimento e crescimento No século XIX, a cidade começou a se desenvolver rapidamente com a chegada de imigrantes, principalmente italianos, que se estabeleceram na região e contribuíram significativamente para o crescimento econômico local. A cidade se consolidou como um importante centro comercial e produtivo, com destaque para a indústria de calçados, que tornou Franca conhecida como a "capital do calçado". A indústria de calçados de Franca começou a se expandir no início do século XX, e até hoje a cidade é um dos maiores polos de produção de calçados do Brasil. Século XX e modernização Com o tempo, a cidade passou a se modernizar com a construção de infraestrutura, como estradas, pontes e escolas. O setor comercial e industrial se consolidou e a cidade se transformou em um dos maiores centros de comércio e produção da região. Franca também se destaca por sua forte presença cultural, com diversas festas tradicionais e eventos, como o Carnaval, a Festa do Peão de Boiadeiro e a Festa de Nossa Senhora da Conceição, padroeira da cidade. Essas festas são importantes para a preservação das tradições locais e atraem turistas de várias partes do país. Economia A economia de Franca, além de ser fortemente impulsionada pela indústria de calçados, também tem outras atividades econômicas, como a agricultura (principalmente café e cana-de-açúcar) e o comércio. A cidade se caracteriza por uma forte presença do setor terciário, com muitos comércios e serviços para a população. Cultura e atualidade Atualmente, Franca é uma cidade em constante crescimento, com um perfil de cidade média do interior paulista, caracterizada por uma boa qualidade de vida e um ambiente acolhedor para moradores e turistas. Além disso, a cidade tem investido em educação, cultura e saúde, mantendo-se como um polo de desenvolvimento e inovação, especialmente no setor industrial. A história de Franca reflete o crescimento de muitas cidades do interior paulista, que souberam se adaptar às mudanças econômicas e sociais ao longo dos anos, mantendo suas tradições, mas também buscando o progresso e o desenvolvimento. Em resumo, a cidade de Franca é um exemplo de como uma comunidade pode se desenvolver a partir de suas raízes históricas e culturais, enquanto se moderniza para enfrentar os desafios contemporâneos.',
          imagens: ['/mainPhotos/franca2.png', '/mainPhotos/Franca_02.jpg', '/mainPhotos/vistaaereaatual.jpg'],
        },
      ],
      Atrações: [
        {
          nome: 'Catedral Nossa Senhora da Conceição',
          descricao: 'A Catedral Nossa Senhora da Conceição, localizada no centro de Franca, é um importante marco religioso e histórico da cidade. Com arquitetura neoclássica e belos vitrais, destaca-se por sua imponência e riqueza de detalhes. É sede da Diocese de Franca e palco de celebrações, procissões e eventos culturais. Sua beleza e tradição atraem fiéis e turistas.',
          imagens: ['/cidades/catedral-franca-1.jpg'],
          link: '/catedral-Nossa-Senhora'
        },
        {
          nome: 'Relogio do Sol',
          descricao: 'O Relógio do Sol de Franca é um monumento histórico localizado na praça central da cidade, próximo à Catedral Nossa Senhora da Conceição. Instalado em 1875, é um dos marcos mais antigos de Franca e símbolo de sua história. Construído em pedra, o relógio utiliza a posição do sol para marcar as horas, sendo uma curiosidade científica e cultural. Além de sua funcionalidade, é valorizado por seu valor arquitetônico e por representar uma época em que esse tipo de instrumento era essencial. É um ponto turístico que encanta pela simplicidade e relevância histórica.',
          imagens: ['/mainPhotos/relogio-do-sol.png', '/mainPhotos/Relogio-do-sol-1940.jpg'],
          link: '/relogio-do-sol',
        }
      ],
      Cultura: [
          {
            nome: 'Casa de Cultura e do Artista Francano',
            descricao: 'criado para celebrar e incentivar a arte e a cultura local. Homenageia Abdias do Nascimento, importante ativista, poeta e artista brasileiro. O local promove exposições, apresentações teatrais, eventos musicais e oficinas artísticas, funcionando como um ponto de encontro para artistas e a comunidade.',
            imagens: ['/cidades/casa-da-cultura1.png', '/cidades/casa-da-cultura2.png'],
            link: '/casa-da-cultura'
          },
          {
            nome: 'Museu Histórico José Chiachiri',
            descricao: 'Instalado em um prédio histórico, o museu abriga um acervo diversificado, que inclui documentos, fotografias, objetos antigos e artefatos que contam a trajetória de Franca e sua população. O espaço oferece uma imersão na história local, abordando temas como a indústria calçadista, tradições religiosas e o cotidiano da região. É um ponto turístico ideal para quem deseja aprender mais sobre o passado da cidade e suas raízes culturais.',
            imagens: ['/cidades/museu1.png', '/cidades/museu2.png'],
            link: '/museu-jose-chiachiri'
          }
      ],
      Teatro: [
        {
          nome: 'Teatro Municipal de Franca',
          descricao: 'O teatro é um polo de difusão cultural, recebendo desde produções locais a apresentações de artistas renomados de âmbito estadual e nacional. Além disso, é frequentemente utilizado para eventos educacionais e encontros promovidos por escolas e instituições da cidade.Sua programação inclui peças de teatro, concertos, eventos de dança, festivais culturais e sessões para escolas, sendo um importante ponto de encontro para a comunidade artística e o público em geral.',
          imagens: ['/cidades/teatro-municipal1.png', '/cidades/teatro-municipal2.png'],
          link: '/teatro-municipal'
        },
        {
          nome: 'Teatro Judas Iscariotes',
          descricao: 'Embora seu foco seja, em grande parte, voltado para a comunidade local e para eventos ligados à fé, o teatro também recebe outras atividades culturais e artísticas, como shows, peças e apresentações de grupos da cidade. Ele é conhecido por sua atmosfera acolhedora e por seu importante papel na preservação de tradições religiosas e culturais em Franca.O Teatro Judas Iscariotes é um local de grande significância para a cidade, sendo um ponto de encontro para os moradores, especialmente em datas festivas e religiosas.',
          imagens: ['/cidades/teatro-judas1.png', '/cidades/teatro-judas2.png'],
          link: '/teatro-municipal'
        },
      ]

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
        },
      ],
      Historia: [
        {
          info: 'Rifaina, localizada no interior de São Paulo, tem uma história encantadora...',
          imagens: ['/historia_rifaina.png'],
        },
      ],
      Atrações: [
        {
          nome: 'Ilha do Sol',
          descricao: 'Uma atração natural, ideal para passeios de barco',
          imagens: ['/ilha_sol.png', '/ilha_sol2.png'],
          link: ''
        },
      ],
      Cultura: [

      ],
      Teatro: []
    },
  };

  export default data