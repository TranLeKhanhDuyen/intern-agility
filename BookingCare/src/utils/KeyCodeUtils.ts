const KeyCodeUtils = {
  UP: 38,
  DOWN: 40,
  TAB: 9,
  ENTER: 13,
  E: 69,
  ESCAPE: 27,

  isNavigation: (e: number): boolean =>
    (e >= 33 && e <= 40) ||
    e === 9 ||
    e === 8 ||
    e === 46 ||
    e === 14 ||
    e === 13,

  isNumeric: (e: number): boolean =>
    (e >= 48 && e <= 57) || (e >= 96 && e <= 105),

  isAlphabetic: (e: number): boolean => e >= 65 && e <= 90,

  isDecimal: (e: number): boolean =>
    e === 190 || e === 188 || e === 108 || e === 110,

  isDash: (e: number): boolean => e === 109 || e === 189
};

export default KeyCodeUtils;
