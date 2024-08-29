import { createRoute } from "honox/factory";
import { getArticles } from "../../lib/db";
import Page from "../../islands/page";


export default createRoute(async (c) => {

  // サーバーサイドでデータを取得
  const articles = await getArticles();
  
  return c.render(
    <Page articles={articles} />, 
    {
      title: "Articles",
    }
  );
});