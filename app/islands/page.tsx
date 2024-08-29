import { FC } from "hono/jsx";
import { card, cards, titleClass } from "../style.css";
import { Article } from "../lib/db";

type Props = {
  articles: Article[],
  hasNext: boolean,
  currentPage: number
};

const Page: FC<Props> = ({ articles, hasNext, currentPage }) => {
  return (
    <div>
      <h1 class={titleClass}>Articles</h1>
      <ul class={cards}>
        {articles.map((article) => (
          <li class={card} key={article.id}>
            <a href={`/article/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
      <div>{currentPage > 1 ? <a href={`/articles?page=${currentPage - 1}`}>前のページ</a> : null}</div>
      <div>{hasNext ? <a href={`/articles?page=${currentPage + 1}`}>次のページ</a> : null}</div>
    </div>
  );
};

export default Page;
