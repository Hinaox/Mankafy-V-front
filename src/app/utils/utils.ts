export function empty(str: string | number | undefined | null) {
  if (str === null || str === undefined) {
    return true;
  }

  str = '' + str;
  return str.trim() == '';
}
