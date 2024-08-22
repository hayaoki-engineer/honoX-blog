import { css } from "hono/css";
import { createRoute } from "honox/factory";
import type { FC } from "hono/jsx";

const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const formClass = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const labelClass = css`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 0.5rem;
`;

const inputClass = css`
  width: 100%;
  padding: 0.5rem 0.25em;
  border-radius: 3px;
  border: 2px solid #ddd;
`;

const textareaClass = css`
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 3px;
  padding: 0.5rem;
  min-height: 10rem;
  resize: vertical;
`;

const buttonClass = css`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 999px;
`;

const Page: FC = () => {
  return (
    <div>
      <h1 class={titleClass}>Create an article</h1>
      <form class={formClass} method="post">
        <label class={labelClass}>
          Title
          <input name="title" class={inputClass} type="text" />
        </label>
        <label class={labelClass}>
          Content
          <textarea name="content" class={textareaClass} />
        </label>
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
})

export const POST = createRoute(async (c) => {
  const body = await c.req.formData();

  console.log("title:", body.get("title"));
  console.log("content:", body.get("content"));

  return c.redirect("/articles");
})
