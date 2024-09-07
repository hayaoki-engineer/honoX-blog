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

// 記事の取得とページネーション
export const getArticles = async (rows: number, page: number) => {
  const articlesJSON = await fs.readFile("./data/articles.json", {
    encoding: "utf-8",
  });

  const articles = JSON.parse(articlesJSON);
  // 求めるページのデータ数 + 1
  const limit = rows + 1;
  // 取得するデータの開始位置
  const offset = (page - 1) * rows; 

  // ページに必要なデータを取得
  const paginatedArticles = articles.slice(offset, offset + limit);
  // 次のページが存在するかチェック
  const hasNext = paginatedArticles.length === limit;

  return {
    // 最後の要素を削除して返す
    articles: hasNext ? paginatedArticles.slice(0, -1) : paginatedArticles,
    hasNext,
  };
};