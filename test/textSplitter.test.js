import { textSplitter } from '../src/textSplitter'
import { describe, it, expect } from 'vitest'

const helloByLetters = '<span class="L" style="--letter: 0;">H</span>' +
  '<span class="L" style="--letter: 1;">e</span>' +
  '<span class="L" style="--letter: 2;">l</span>' +
  '<span class="L" style="--letter: 3;">l</span>' +
  '<span class="L" style="--letter: 4;">o</span>'

const worldByLetters = '<span class="L" style="--letter: 5;">w</span>' +
  '<span class="L" style="--letter: 6;">o</span>' +
  '<span class="L" style="--letter: 7;">r</span>' +
  '<span class="L" style="--letter: 8;">l</span>' +
  '<span class="L" style="--letter: 9;">d</span>' +
  '<span class="L" style="--letter: 10;">!</span>'

const helloWord = `<span class="W" style="--word: 0;">Hello</span>`
const worldWord = `<span class="W" style="--word: 1;">world!</span>`

const helloByWordsAndLetters = `<span class="W" style="--word: 0;">${helloByLetters}</span>`
const worldByWordsAndLetters = `<span class="W" style="--word: 1;">${worldByLetters}</span>`

const helloWorldByWords = `<span class="W" style="--word: 0;">Hello</span>` +
  ` <span class="W" style="--word: 1;">world!</span>`

describe('textSplitter', () => {
  it('should split text into words and letters', () => {
    const text = 'Hello world!'
    const result = textSplitter(text, {
      wordCls: 'W',
      letterCls: 'L',
      getWordStyle: (idx) => {
        return `--word: ${idx};`
      },
      getLetterStyle: (idx) => {
        return `--letter: ${idx};`
      }
    })
    expect(result).toBe(helloByWordsAndLetters + ' ' + worldByWordsAndLetters)
  })

  it('should split text into words', () => {
    const text = 'Hello world!'
    const result = textSplitter(text, {
      wordCls: 'W',
      getWordStyle: (idx) => {
        return `--word: ${idx};`
      }
    })
    expect(result).toBe(helloWorldByWords)
  })

  it('should split text into letters', () => {
    const text = 'Hello world!'
    const result = textSplitter(text, {
      letterCls: 'L',
      getLetterStyle: (idx) => {
        return `--letter: ${idx};`
      }
    })

    // probably remove idle spans in the future
    expect(result).toBe(`<span>${helloByLetters}</span> <span>${worldByLetters}</span>`)
  })

  it('should consider &nbsp; as a space', () => {
    const text = 'Hello&nbsp;world!'
    const result = textSplitter(text, {
      wordCls: 'W',
      getWordStyle: (idx) => {
        return `--word: ${idx};`
      }
    })
    expect(result).toBe(`${helloWord}&nbsp;${worldWord}`)
  })
})
