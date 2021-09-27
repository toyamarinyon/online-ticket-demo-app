export function isNumber(arg: string | number): arg is number {
  return !isNaN(arg as number)
}
