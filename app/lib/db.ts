import fs from "fs/promises";

export type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const createArticle = async ({
  title,
  content,
}: Pick<Article, "title" | "content">) => {
  const articlesJSON = await fs.readFile("./data/articles.json", {
    encoding: "utf-8",
  });
  
  const articles: Article[] = JSON.parse(articlesJSON);
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();
  const updated_at = created_at;
  const article: Article = { id, title, content, created_at, updated_at };
  articles.push(article);
  await fs.writeFile("./data/articles.json", JSON.stringify(articles));

  return article;
};
