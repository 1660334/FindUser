export function useUniqueId() {
  const num = Math.floor(Math.random() * 10000);
  return num;
}
