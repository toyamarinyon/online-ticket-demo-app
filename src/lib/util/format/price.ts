export function priceFormat(number: number) {
  const formatter = new Intl.NumberFormat('ja-JP')
  return formatter.format(number)
}
