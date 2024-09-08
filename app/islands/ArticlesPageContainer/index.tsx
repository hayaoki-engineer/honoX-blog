import { FC, useEffect, useState } from "hono/jsx";
import { card, cards, titleClass } from "../../style.css";
// import { Article } from "../../lib/db";
import Toast from "../Toast";
import { z } from "zod";

// スキーマ作成
export const articleSchema = z.object({
  id: z.string(),
  title: z.string()
})

// 型定義
export type Article = z.infer<typeof articleSchema >

type Props = {
  articles: Article[];
  hasNext: boolean;
  currentPage: number;
  success: string | undefined;
};

const ArticlesPageContainer: FC<Props> = ({ articles, hasNext, currentPage, success }) => {
  const[showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (success === 'true') {
      setShowToast(true);
    }
  }, [success]);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div>
      {showToast && (
        <Toast
          message="Article created successfully!"
          onClose={handleCloseToast}
        />
      )}
      <h1 class={titleClass}>Articles</h1>
      <ul class={cards}>
        {articles.map((article) => (
          <li class={card} key={article.id}>
            <a href={`/article/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
      <div>
        {currentPage > 1 ? (
          <a href={`/articles?page=${currentPage - 1}`}>前のページ</a>
        ) : null}
      </div>
      <div>
        {hasNext ? (
          <a href={`/articles?page=${currentPage + 1}`}>次のページ</a>
        ) : null}
      </div>
    </div>
  );
};

export default ArticlesPageContainer;
