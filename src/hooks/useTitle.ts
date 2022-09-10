import { useEffect, useState } from "react";

export default function useTitle() {
  const [title, setTtitle] = useState("Pong");
  useEffect(() => {
    document.title = title;
  }, [title]);
  return setTtitle;
}
