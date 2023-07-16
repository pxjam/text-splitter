# Text Splitter

## Basic usage

```html
<p id="p">This is a <strong>HTML text</strong> that will be split into separate lines, words, and&nbsp;letters.</p>
```

```js
import { TextSplitter } from './src/text-splitter.js'

const el = document.getElementById('p')

const letters = textSplitter({
  text: el.innerHTML,
  wordCls: 'W',
  letterCls: 'L',
  getWordStyle: (idx) => `transform: translateY(${idx * 5}px)`,
  getLetterStyle: (idx) => `transform: translateX(${idx * 10}px)`
})

el.innerHTML = letters
```
