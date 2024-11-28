import { CertificateLevel } from '../types';

export const certificateLevels: CertificateLevel[] = [
  {
    id: 'apprentice',
    name: 'Aprendiz do Saber',
    description: 'Início da jornada de aprendizado, descobrindo novos conhecimentos.',
    minCertificates: 1,
    maxCertificates: 5,
    icon: 'scroll',
    color: '#4CAF50'
  },
  {
    id: 'explorer',
    name: 'Explorador Determinado',
    description: 'Avançando na exploração de diferentes áreas de conhecimento.',
    minCertificates: 6,
    maxCertificates: 15,
    icon: 'compass',
    color: '#2196F3'
  },
  {
    id: 'guardian',
    name: 'Guardião da Sabedoria',
    description: 'Consolidando conhecimentos e compartilhando com outros.',
    minCertificates: 16,
    maxCertificates: 30,
    icon: 'shield',
    color: '#9C27B0'
  },
  {
    id: 'master',
    name: 'Mestre Estrategista',
    description: 'Demonstrando habilidades avançadas e aplicando o aprendizado de forma estratégica.',
    minCertificates: 31,
    maxCertificates: 50,
    icon: 'sword',
    color: '#FF9800'
  },
  {
    id: 'lord',
    name: 'Senhor do Conhecimento',
    description: 'Excelência em múltiplas áreas, sendo referência dentro da comunidade de aprendizado.',
    minCertificates: 51,
    maxCertificates: 75,
    icon: 'crown',
    color: '#F44336'
  },
  {
    id: 'legendary',
    name: 'Lendário Mentor',
    description: 'Influenciando e guiando outros no caminho do conhecimento.',
    minCertificates: 76,
    maxCertificates: 100,
    icon: 'star',
    color: '#FFD700'
  },
  {
    id: 'titan',
    name: 'Titã da Sabedoria',
    description: 'Nível supremo de conhecimento e contribuição excepcional para a empresa.',
    minCertificates: 101,
    maxCertificates: Infinity,
    icon: 'diamond',
    color: '#E91E63'
  }
];