import { createRoute } from "honox/factory";
import { getArticles } from "../../lib/db";
import Page from "../../islands/ArticlesPageContainer";
import ArticlesPageContainer from "../../islands/ArticlesPageContainer";

export default createRoute(async (c) => {
  const rows = 5;
  const page = Number.parseInt(c.req.query("page") ?? "1", 10);
  console.log("ページ", page);

  // サーバーサイドでデータを取得
  const res = await getArticles(rows, page);

  console.log("ページに必要なデータの数", res.articles.length);
  console.log("次のページが存在している", res.hasNext);

  const success = c.req.query("success") ?? null;
  console.log('成功状態', success)

  return c.render(
    <ArticlesPageContainer articles={res.articles} hasNext={res.hasNext} currentPage={page} success={success} />,
    {
      title: "Articles",
    }
  );
});
