import { createRoute } from "honox/factory";
import { getArticles } from "../../lib/db";
import Page from "../../islands/ArticlesPageContainer";
import ArticlesPageContainer from "../../islands/ArticlesPageContainer";
import { deleteCookie, getCookie } from "hono/cookie";

export default createRoute(async (c) => {
  const rows = 5;
  const page = Number.parseInt(c.req.query("page") ?? "1", 10);
  console.log("ページ", page);

  // サーバーサイドでデータを取得
  const res = await getArticles(rows, page);

  const success = getCookie(c, "success");
  console.log("成功状態", success);

  // クッキーを削除して再表示を防止
  if (success) {
    deleteCookie(c, "success", { path: "/articles" });
  }

  return c.render(
    <ArticlesPageContainer
      articles={res.articles}
      hasNext={res.hasNext}
      currentPage={page}
      success={success}
    />,
    {
      title: "Articles",
    }
  );
});
