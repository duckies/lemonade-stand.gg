export function pad(num: number, length: number) {
  return num.toString().padStart(length, "0");
}

export function toLocalISOString(date: Date) {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1, 2);
  const day = pad(date.getUTCDate(), 2);
  const hour = pad(date.getUTCHours(), 2);
  const minute = pad(date.getUTCMinutes(), 2);
  const second = pad(date.getUTCSeconds(), 2);

  const tzo = -date.getTimezoneOffset();
  const sign = tzo < 0 ? "-" : "+";
  const tzoHours = pad(Math.floor(Math.abs(tzo) / 60), 2);
  const tzoMinutes = pad(Math.abs(tzo) % 60, 2);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${tzoHours}:${tzoMinutes}`;
}
