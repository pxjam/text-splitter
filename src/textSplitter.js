function wrapString(string, { cls, getStyle, idx }) {
  const classAttr = cls ? ` class="${cls}"` : ''
  const styleAttr = getStyle ? ` style="${getStyle(idx)}"` : ''
  return `<span${classAttr}${styleAttr}>${string}</span>`
}

export function textSplitter({ text, wordCls, letterCls, getWordStyle, getLetterStyle }) {
  const splitLetters = Boolean(letterCls || getLetterStyle)
  const regex = /<[^>]+>|[^<>\s-&]+|&\w+;|[-–—]|\s+/g

  let result = ''
  let wordIdx = 0
  let letterIdx = 0

  text.replace(regex, (match) => {
    if (match[0] === '<' || /&\w+;/.test(match)) {
      result += match
    } else if (/^\s+$/.test(match)) {
      result += ' '
    } else {
      let word = ''

      if (splitLetters) {
        const letters = match.split('')

        letters.forEach((letter) => {
          word += wrapString(letter, { cls: letterCls, getStyle: getLetterStyle, idx: letterIdx })
          letterIdx++
        })
      } else {
        word = match
      }

      result += wrapString(word, { cls: wordCls, getStyle: getWordStyle, idx: wordIdx })
      wordIdx++
    }
  })
  return result
}
