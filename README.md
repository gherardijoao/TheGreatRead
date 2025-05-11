# The Great Read - Plataforma Literária

![Screenshot da Aplicação](/src/assets/screenshot.png)

## Visão Geral

The Great Read é uma plataforma moderna para entusiastas de literatura, oferecendo uma experiência imersiva na descoberta e organização de livros. Desenvolvido com foco em clássicos literários, o projeto combina tecnologias modernas com uma interface intuitiva para criar uma jornada única de exploração literária.

## Funcionalidades

- **Busca Avançada:** Encontre livros por título, autor ou gênero
- **Sistema de Favoritos:** Salve seus livros preferidos no localStorage
- **Detalhes Completo:** Visualize informações detalhadas de cada obra
- **Modo Clássicos:** Filtre por obras clássicas e selecione idioma (PT/EN)
- **Estante Virtual:** Organize sua coleção pessoal de forma intuitiva
- **Design Responsivo:** Adaptação perfeita para todos os dispositivos

## Tecnologias Utilizadas

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Estilização:** Bootstrap 5 + SCSS + CSS-in-JS
- **Roteamento:** React Router DOM
- **Gerenciamento de Estado:** React Hooks
- **Persistência Local:** localStorage
- **APIs Integradas:** Google Books API

## Páginas e Componentes

### Principais Rotas

- **Home:**

  - Banner hero interativo
  - Busca inteligente
  - Seção de livros aleatórios
  - Sobre a plataforma

- **Clássicos:**

  - Filtragem por idioma (Português/Inglês)
  - Carregamento progressivo
  - Detecção automática de obras clássicas
  - Guias de leitura contextual

- **Minha Estante:**

  - Visualização de favoritos
  - Gestão de coleção pessoal
  - Empty states interativos
  - Sincronização automática com localStorage

- **Detalhes do Livro:**
  - Informações completas da obra
  - Sistema de avaliações
  - Metadados detalhados (ISBN, editora, etc)
  - Integração com Goodreads

### Componentes Reutilizáveis

- `BookCard`: Card interativo para exibição de livros
- `CustomButton`: Botão temático com hover animations
- `Header/Footer`: Layout consistente com navegação responsiva
- `BookDetails`: Modal dinâmico com gestão de estado

## Integração com APIs

### Google Books API

- Busca avançada com filtros personalizados
- Paginação inteligente
- Cache de resultados
- Tratamento de erros robusto

## Sistema de Estilos

As classes Bootstrap (className) definem o layout e estilos base, o SCSS/Custom: Adiciona temas e modificações globais enquanto o CSS inline faz ajustes específicos e personalizações

- **Bootstrap 5:** Grid system e componentes base
- **SCSS:**
  - Variáveis temáticas
  - Mixins responsivos
  - Organização modular
- **CSS-in-JS:**
  - Estilos dinâmicos
  - Animações performáticas
  - Theme switching preparado

## Como Executar

Clone o repositório ou baixe o arquivo zipado.

depois: "npm install" -> "npm run dev"

## Autores

**João Gherardi**

---
