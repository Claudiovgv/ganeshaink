import type { Category, Employee } from './api';

// Só usados quando a API está inacessível — os ids/slugs seguem a mesma
// convenção das 4 categorias base criadas na migração inicial.
const CAT_TATTOO: Category = { id: 2, name: 'Tatuagem', slug: 'tattoo', sortOrder: 1 };
const CAT_PIERCING: Category = { id: 3, name: 'Piercing', slug: 'piercing', sortOrder: 2 };
const CAT_BARBERSHOP: Category = { id: 1, name: 'Barbearia', slug: 'barbershop', sortOrder: 0 };
const CAT_NAILS: Category = { id: 4, name: 'Unhas', slug: 'nails', sortOrder: 3 };

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Ricardo Vieira',
    bio: 'Com 14 anos na Ganesha Ink, Ricardo é o rosto e a alma do estúdio. Tatuador e body piercer experiente, trabalha com uma vasta gama de estilos — do blackwork ao realismo, passando pelo fineline. Cada peça é criada a pensar na singularidade de quem a usa, com rigor, higiene e atenção ao detalhe. Ao longo dos anos tornou-se uma referência em Vale de Cambra pela dedicação à arte e à relação próxima com os clientes.',
    photoUrl: null,
    services: [
      { id: 1, name: 'Tatuagem', category: CAT_TATTOO, description: null, durationMin: 60, price: 0, requiresConsultation: true },
      { id: 2, name: 'Body Piercing', category: CAT_PIERCING, description: null, durationMin: 30, price: 0, requiresConsultation: true },
    ],
  },
  {
    id: 2,
    name: 'Eduardo Gomes',
    bio: 'Eduardo é o barbeiro da casa — preciso, cuidadoso e com um olho clínico para o que fica bem em cada rosto. Especializado em cortes modernos, degradês e acabamentos de barba, combina técnica clássica com tendências actuais. Para Eduardo, um bom corte não é só estética: é confiança.',
    photoUrl: null,
    services: [
      { id: 3, name: 'Corte de Cabelo', category: CAT_BARBERSHOP, description: null, durationMin: 30, price: 0, requiresConsultation: false },
      { id: 4, name: 'Barba', category: CAT_BARBERSHOP, description: null, durationMin: 20, price: 0, requiresConsultation: false },
    ],
  },
  {
    id: 3,
    name: 'Vera Ferreira',
    bio: 'Vera é a nail artist da Ganesha Ink — criativa, detalhista e sempre a par das últimas tendências. Trabalha com gel, acrílico e nail art personalizada, transformando as unhas numa extensão do estilo de cada cliente. Se tens uma ideia em mente, Vera dá-lhe vida.',
    photoUrl: null,
    services: [
      { id: 5, name: 'Manicure', category: CAT_NAILS, description: null, durationMin: 45, price: 0, requiresConsultation: false },
      { id: 6, name: 'Nail Art', category: CAT_NAILS, description: null, durationMin: 60, price: 0, requiresConsultation: false },
    ],
  },
];
