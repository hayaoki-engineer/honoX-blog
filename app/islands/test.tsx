import { FC } from "hono/jsx";

const TestPage: FC = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleClick}>Test Button</button>
    </div>
  );
};

export default TestPage;
