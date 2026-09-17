// ============================================================
// ✏️ PROJETOS — EDITE APENAS ESTE ARQUIVO
// Para adicionar um projeto: copie o bloco abaixo, descomente,
// preencha e salve. A imagem deve ser enviada para a pasta
// img/projetos/ ou use uma URL https:// completa.
// ============================================================

export interface Project {
  titulo: string;
  descricao: string;
  imagem: string; // caminho relativo ou URL https:// completa
  link: string;   // abre em nova aba
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    titulo: "Febre Amarela",
    descricao: "Blog de informação em saúde — \"Informação que protege\". Projeto autoral de conteúdo e desenvolvimento web, do zero à publicação.",
    imagem: "https://s0.wp.com/mshots/v1/https%3A%2F%2Ffebreamarela.blog%2F?w=1280&h=800",
    link: "https://febreamarela.blog/",
    tags: ["Blog", "Conteúdo", "Web design"]
  },
  // {
  //   titulo: "Nome do Projeto",
  //   descricao: "Uma linha curta sobre o que foi criado.",
  //   imagem: "img/projetos/nome-da-imagem.webp", // ou uma URL https:// completa
  //   link: "https://link-do-projeto.com.br",     // abre em nova aba
  //   tags: ["Site institucional", "Design"]
  // },
];

export default PROJECTS;
