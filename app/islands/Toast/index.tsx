import { useEffect } from "hono/jsx";

type Props = {
  message: string;
  onClose: () => void;
};

const Toast = ({ message, onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3秒後にトーストを閉じる
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
