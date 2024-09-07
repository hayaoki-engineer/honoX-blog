import { createRoute } from "honox/factory";
import { getArticles } from "../../lib/db";
import Page, { articleSchema, Article } from "../../islands/ArticlesPageContainer";
import ArticlesPageContainer from "../../islands/ArticlesPageContainer";
import { deleteCookie, getCookie } from "hono/cookie";
import { z } from "zod";

const mySchema = z.string()

export default createRoute(async (c) => {
  const rows = 5;
  const page = Number.parseInt(c.req.query("page") ?? "1", 10);
  console.log("ページ", page);

  // サーバーサイドでデータを取得
  const res = await getArticles(rows, page);
  console.log("resの中身", res.articles);

  const parsedArticles = res.articles
    .map((article: Article) => {
      const result = articleSchema.safeParse(article);
      
      if (result.success) {
        return result.data; // id と title のみ
      } else {
        console.error(result.error);
        return null; // エラーハンドリング
      }
    })
    .filter(Boolean); // nullを除外
  
  console.log('パース', parsedArticles);

  const success = getCookie(c, "success");
  console.log("成功状態", success);

  // クッキーを削除して再表示を防止
  if (success) {
    deleteCookie(c, "success", { path: "/articles" });
  }

  return c.render(
    <ArticlesPageContainer
      articles={parsedArticles}
      hasNext={res.hasNext}
      currentPage={page}
      success={success}
    />,
    {
      title: "Articles",
    }
  );
});
