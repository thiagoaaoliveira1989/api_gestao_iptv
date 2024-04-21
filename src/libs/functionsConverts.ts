export function detectDateFormat(dateStr: string): string {
  // Verifica se o formato é AAAA-MM-DD
  const yyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;
  if (yyyyMmDd.test(dateStr)) {
    return `${dateStr}T00:00:00.000Z`;
  }
  const ddMmYyyy = /^\d{2}-\d{2}-\d{4}$/;
  if (ddMmYyyy.test(dateStr)) {
    const parts = dateStr.split('-');
    const correctedDate = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`;
    return correctedDate;
  }

  throw new Error('Formato de data inválido');
}
