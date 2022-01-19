import { useState } from "react";

export function useUniqueId() {
  const [id] = useState(() => Math.floor(Math.random() * 10000));
  return id;
}
