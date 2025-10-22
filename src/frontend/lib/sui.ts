export function formatSui(balance: string): string {
  const n = Number(balance) / 1e9;
  return parseFloat(n.toFixed(3)).toString();
}
