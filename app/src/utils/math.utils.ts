

export function Round(number: number, decimalPlaces: number) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(number * factorOfTen) / factorOfTen
}