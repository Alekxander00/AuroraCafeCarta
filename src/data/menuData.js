import cupHeroModel from '../images/3D/taza de cafe logo 2.fbx?url'
import blackCupModel from '../images/3D/taza de cafe negro.fbx?url'
import cookiesModel from '../images/3D/cookies.fbx?url'
import sandwichModel from '../images/3D/sandwich.fbx?url'

import filterIllustration from '../images/Decorators/Filtro.png'
import coffeeBean from '../images/Decorators/GranoCafe.png'
import coffeeBeansGroup from '../images/Decorators/GrupoGranoCafe.png'
import auroraIcon from '../images/Decorators/IconoAurora.png'
import auroraLogo from '../images/Decorators/LogoAurora.png'
import coffeePlantTall from '../images/Decorators/PlantadeCafe.png'
import coffeePlantWide from '../images/Decorators/plantaCafe2.png'
import coffeePlantBranch from '../images/Decorators/PlantaCafe3.png'
import cupLineArt from '../images/Decorators/TazaCruvaDelgada.png'
import cupLargeArt from '../images/Decorators/tazaGrande.png'
import cupSideArt from '../images/Decorators/TazaLateral.png'

export const brandAssets = {
  auroraIcon,
  auroraLogo,
  coffeeBean,
  coffeeBeansGroup,
  coffeePlantTall,
  coffeePlantWide,
  coffeePlantBranch,
  cupLineArt,
  cupLargeArt,
  cupSideArt,
  filterIllustration,
}

export const navigationItems = [
  { href: '#specialty', label: 'Cafe' },
  { href: '#bakery', label: 'Panaderia' },
  { href: '#kitchen', label: 'Cocina' },
]

export const coverData = {
  eyebrow: 'Carta de mesa',
  title: 'Cafe de especialidad, panaderia fresca y cocina para quedarse un rato.',
  lead:
    'Una lectura clara para ver la carta por categorias, ubicar favoritos de la casa y pedir con calma desde la mesa.',
  facts: [
    { label: 'Horario', value: 'Lun - Sab / 7:00 - 8:00' },
    { label: 'Favoritos', value: 'Flat White / Roll / Toast' },
    { label: 'Casa', value: 'Aurora Blend' },
  ],
  serviceTags: ['Servicio en mesa', 'Preparado al momento', 'Opciones vegetales'],
  stage: {
    items: [
      {
        src: cupHeroModel,
        fit: 2.25,
        color: '#cfac7b',
        metalness: 0.12,
        roughness: 0.5,
        position: [0, -0.28, 0],
        rotation: [0.1, -0.68, 0.04],
        speed: 0.85,
        drift: 0.12,
      },
    ],
  },
}

export const menuPages = [
  {
    id: 'specialty',
    navLabel: 'Cafe',
    eyebrow: 'Carta 01',
    title: 'Cafe de especialidad',
    intro:
      'Espresso, bebidas con leche y metodos filtrados con descripciones cortas y precios faciles de ubicar.',
    decorations: [
      { src: filterIllustration, className: 'decor-filter' },
      { src: coffeeBeansGroup, className: 'decor-beans-top' },
      { src: cupLineArt, className: 'decor-cup-line' },
    ],
    groups: [
      {
        title: 'Espresso y leche',
        items: [
          {
            name: 'Espresso Aurora',
            description: 'Corto, dulce y con final a cacao.',
            price: '$8.500',
            tag: 'Blend de la casa',
          },
          {
            name: 'Flat White Aurora',
            description: 'Textura sedosa y balance entre cafe y leche.',
            price: '$11.000',
            tag: 'Favorito de barra',
          },
          {
            name: 'Cappuccino Clasico',
            description: 'Espuma aireada y tostado suave.',
            price: '$11.500',
            tag: 'Siempre pedido',
          },
          {
            name: 'Mocha Avellana',
            description: 'Chocolate oscuro con perfume tostado.',
            price: '$13.000',
            tag: 'Dulce y cremoso',
          },
        ],
      },
      {
        title: 'Filtrados y frios',
        items: [
          {
            name: 'V60 Huila',
            description: 'Panela, durazno y acidez limpia.',
            price: '$14.000',
            tag: 'Filtrado del dia',
          },
          {
            name: 'Chemex Narino',
            description: 'Aromatico, ligero y floral.',
            price: '$15.500',
            tag: 'Para compartir',
          },
          {
            name: 'Cold Brew Tonic',
            description: 'Frio, brillante y apenas citrico.',
            price: '$12.500',
            tag: 'Firma estacional',
          },
          {
            name: 'Affogato',
            description: 'Helado cremoso con espresso recien hecho.',
            price: '$14.500',
            tag: 'Postre rapido',
          },
        ],
      },
    ],
    featured: {
      label: 'Recomendado de barra',
      title: 'Flat White Aurora',
      body:
        'La taza mas redonda de la casa: cuerpo suave, leche sedosa y un final limpio que funciona bien a cualquier hora.',
      note: 'Ideal con financier o roll de canela.',
    },
    serviceTags: ['Leche vegetal +2.000', 'Shot extra +2.500', 'Descafeinado disponible'],
    stage: {
      items: [
        {
          src: blackCupModel,
          fit: 2.35,
          color: '#c59759',
          metalness: 0.1,
          roughness: 0.52,
          position: [0, -0.18, 0],
          rotation: [0.14, -0.58, 0.02],
          speed: 0.95,
          drift: 0.11,
        },
      ],
    },
  },
  {
    id: 'bakery',
    navLabel: 'Panaderia',
    eyebrow: 'Carta 02',
    title: 'Panaderia y dulce de barra',
    intro:
      'Piezas de horno y opciones dulces para acompanar el cafe sin recargar la lectura ni la mesa.',
    decorations: [
      { src: coffeePlantBranch, className: 'decor-plant-top-right' },
      { src: coffeeBean, className: 'decor-bean-single' },
      { src: cupSideArt, className: 'decor-cup-side' },
    ],
    groups: [
      {
        title: 'Horneado del dia',
        items: [
          {
            name: 'Croissant Mantequilla',
            description: 'Hojaldrado, dorado y con centro suave.',
            price: '$8.000',
            tag: 'Recien salido',
          },
          {
            name: 'Roll de Canela',
            description: 'Glaseado tenue y especia calida.',
            price: '$9.500',
            tag: 'Favorito de mesa',
          },
          {
            name: 'Pain au Chocolat',
            description: 'Laminado fino con chocolate oscuro.',
            price: '$10.000',
            tag: 'Clasico',
          },
        ],
      },
      {
        title: 'Dulce de barra',
        items: [
          {
            name: 'Cookie Triple Chocolate',
            description: 'Borde suave y centro mas untuoso.',
            price: '$7.500',
            tag: 'Para compartir',
          },
          {
            name: 'Brownie de Nuez',
            description: 'Cacao intenso y migas humedas.',
            price: '$8.500',
            tag: 'Denso y tibio',
          },
          {
            name: 'Financier de Almendra',
            description: 'Mantequilla tostada y miga delicada.',
            price: '$7.000',
            tag: 'Petit',
          },
        ],
      },
    ],
    featured: {
      label: 'Sugerencia de vitrina',
      title: 'Roll de Canela',
      body:
        'Dulzor medido, capas suaves y especia apenas marcada. Funciona muy bien con capuccino o con un filtrado liviano.',
      note: 'Pregunta por piezas del dia y salidas del horno.',
    },
    serviceTags: ['Horneado en lotes cortos', 'Disponible para llevar', 'Consulta por opcion del dia'],
    stage: {
      items: [
        {
          src: cookiesModel,
          fit: 2.15,
          color: '#b77942',
          metalness: 0.04,
          roughness: 0.74,
          position: [0.02, -0.15, 0],
          rotation: [0.08, -0.44, 0.08],
          speed: 1.05,
          drift: 0.14,
        },
      ],
    },
  },
  {
    id: 'kitchen',
    navLabel: 'Cocina',
    eyebrow: 'Carta 03',
    title: 'Cocina ligera y favoritos de mesa',
    intro:
      'Preparaciones saladas para brunch o media tarde, pensadas para leerse rapido y decidir sin ruido visual.',
    decorations: [
      { src: coffeePlantTall, className: 'decor-plant-bottom-left' },
      { src: coffeeBeansGroup, className: 'decor-beans-bottom' },
      { src: cupLargeArt, className: 'decor-cup-large' },
    ],
    groups: [
      {
        title: 'Salados de la casa',
        items: [
          {
            name: 'Toast Aurora',
            description: 'Ricotta batida, higos y miel especiada.',
            price: '$18.000',
            tag: 'Brunch',
          },
          {
            name: 'Sandwich Roast Beef',
            description: 'Focaccia, rugula y mostaza antigua.',
            price: '$21.000',
            tag: 'Mas pedido',
          },
          {
            name: 'Croque Vegetal',
            description: 'Queso suave, tomate confitado y hojas.',
            price: '$19.000',
            tag: 'Sin carne',
          },
        ],
      },
      {
        title: 'Para seguir la tarde',
        items: [
          {
            name: 'Yogurt & Granola',
            description: 'Fruta fresca, semillas y compota de casa.',
            price: '$14.000',
            tag: 'Ligero',
          },
          {
            name: 'Tostada de Aguacate',
            description: 'Pan artesanal, huevo y brotes.',
            price: '$17.500',
            tag: 'Todo el dia',
          },
          {
            name: 'Tarta de la Semana',
            description: 'Rotacion corta segun vitrina del dia.',
            price: '$11.000',
            tag: 'Pregunta por sabor',
          },
        ],
      },
    ],
    featured: {
      label: 'Elegido por la casa',
      title: 'Sandwich Roast Beef',
      body:
        'Una opcion completa para acompanar bebidas filtradas o cold brew: focaccia, hojas frescas y un cierre mas salino.',
      note: 'Tambien disponible con extra de queso.',
    },
    serviceTags: ['Brunch todo el dia', 'Opciones vegetarianas', 'Pide recomendacion al mesero'],
    stage: {
      items: [
        {
          src: sandwichModel,
          fit: 2.35,
          color: '#d8c099',
          metalness: 0.05,
          roughness: 0.66,
          position: [0.05, -0.18, 0],
          rotation: [0.18, 0.58, -0.02],
          speed: 0.92,
          drift: 0.1,
        },
      ],
    },
  },
]
