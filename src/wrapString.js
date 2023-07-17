export function wrapString(string, { cls, getStyle, idx }) {
  const classAttr = cls ? ` class="${cls}"` : ''
  const styleAttr = getStyle ? ` style="${getStyle(idx)}"` : ''
  return `<span${classAttr}${styleAttr}>${string}</span>`
}
