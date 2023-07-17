# Text Splitter

A helper for splitting and wrapping each word/letter of text/html
with a span tag with custom class and computable styles.

It does not use DOM API, so it can be used outside
the browser (e.g. in Node.js for SSR).

## Basic usage

```shell
npm install @pxjam/text-splitter
```

```html
<p id="p">This is a <strong>HTML text</strong> that will be split into separate lines, words, and&nbsp;letters.</p>
```

```js
import { TextSplitter } from '@pxjam/text-splitter'

const el = document.getElementById('p')

const letters = textSplitter(el.innerHTML, {
  wordCls: 'W',
  letterCls: 'L',
  getWordStyle: (idx) => `transform: translateY(${idx * 5}px)`,
  getLetterStyle: (idx) => `transform: translateX(${idx * 10}px)`
})

el.innerHTML = letters
```

## Demo

https://pxjam.github.io/text-splitter/
