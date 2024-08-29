import { css } from "hono/css";

export const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const formClass = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const labelClass = css`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 0.5rem;
`;

export const inputClass = css`
  width: 100%;
  padding: 0.5rem 0.25em;
  border-radius: 3px;
  border: 2px solid #ddd;
`;

export const textareaClass = css`
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 3px;
  padding: 0.5rem;
  min-height: 10rem;
  resize: vertical;
`;

export const buttonClass = css`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 999px;
`;

export const errorClass = css`
  color: red;
  font-size: 0.75rem;
`;

export const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const card = css`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1rem;
  width: 100%;
  list-style: none;
`;