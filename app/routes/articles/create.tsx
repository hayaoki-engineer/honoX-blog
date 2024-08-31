import { css } from "hono/css";
import { createRoute } from "honox/factory";
import type { FC } from "hono/jsx";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  buttonClass,
  errorClass,
  formClass,
  inputClass,
  labelClass,
  textareaClass,
  titleClass,
} from "../../style.css";
import { createArticle } from "../../lib/db";
import ArticlesPageContainer from "../../islands/ArticlesPageContainer";

const Article = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

type Data = {
  title: {
    value: string;
    error: string[] | undefined;
  };
  content: {
    value: string;
    error: string[] | undefined;
  };
};

type Props = {
  data?: Data;
};

const Page: FC<Props> = ({ data }) => {
  return (
    <div>
      <h1 class={titleClass}>Create an article</h1>
      <form class={formClass} method="post">
        <label class={labelClass}>
          Title
          <input
            name="title"
            class={inputClass}
            type="text"
            value={data?.title.value}
          />
        </label>
        {data?.title.error &&
          data.title.error.map((error) => <p class={errorClass}>{error}</p>)}
        <label class={labelClass}>
          Content
          <textarea
            name="content"
            class={textareaClass}
            value={data?.content.value}
          />
        </label>
        {data?.content.error &&
          data.content.error.map((error) => <p class={errorClass}>{error}</p>)}
        <button class={buttonClass} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default createRoute((c) => {
  return c.render(<Page />, {
    title: "Create an article",
  });
});

// POSTリクエストの処理
export const POST = createRoute(
  zValidator("form", Article, async (result, c) => {

    if (result.success) {
      // TODO DB に保存
      const { title, content } = result.data;
      await createArticle({ title, content });

      return c.redirect("/articles?success=true");
    }

    // バリデーションの結果
    const { title, content } = result.data;
    const data: Data = {
      title: {
        value: title,
        error: result.error.flatten().fieldErrors.title,
      },
      content: {
        value: content,
        error: result.error.flatten().fieldErrors.content,
      },
    };

    return c.render(<Page data={data} />, {
      title: "Create an article",
    });
  })
);
