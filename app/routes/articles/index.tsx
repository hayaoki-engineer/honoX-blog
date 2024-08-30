import { createRoute } from "honox/factory";
import { getArticles } from "../../lib/db";
import Page from "../../islands/page";


export default createRoute(async (c) => {

  const rows = 5
  const page = Number.parseInt(c.req.query('page') ?? '1', 10)
  console.log('ページ', page)

  // サーバーサイドでデータを取得
  const res = await getArticles(rows, page);


  console.log('次のページが存在している', res.hasNext)
  
  return c.render(
    <Page articles={res.articles} hasNext={res.hasNext} currentPage={page} />, 
    {
      title: "Articles",
    }
  );
});