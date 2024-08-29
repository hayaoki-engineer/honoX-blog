import { FC } from "hono/jsx";
import { card, cards, titleClass } from "../style.css";
import { Article } from "../lib/db";

type Props = {
  articles: Article[];
};

const Page: FC<Props> = ({ articles }) => {
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
    </div>
  );
};

export default Page;
