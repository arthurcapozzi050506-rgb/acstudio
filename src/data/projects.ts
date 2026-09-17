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
  // {
  //   titulo: "Nome do Projeto",
  //   descricao: "Uma linha curta sobre o que foi criado.",
  //   imagem: "img/projetos/nome-da-imagem.webp", // ou uma URL https:// completa
  //   link: "https://link-do-projeto.com.br",     // abre em nova aba
  //   tags: ["Site institucional", "Design"]
  // },
];

export default PROJECTS;
