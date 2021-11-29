const { capitalizeFirstLetter } = require("./helper");

/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] ? this.words[i + 1] : null;

      if (chains[word]) {
        chains[word].push(nextWord);
      } else {
        chains[word] = [nextWord];
      }
    }
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let pickedWord = MarkovMachine.getWord(this.words);
    // let pickedWord = capitalizeFirstLetter(firstWord);
    let textList = [];

    while (numWords > 0 && pickedWord) {
      textList.push(pickedWord);
      let nextWords = this.chains[pickedWord];
      pickedWord = MarkovMachine.getWord(nextWords);
      numWords--;
    }

    return textList.join(" ");
  }

  // get word randomly form array
  static getWord(arr) {
    return arr[Math.trunc(Math.random() * arr.length)];
  }
}

// let m = new MarkovMachine("the cat in the hat");
// console.log(m.makeText());

module.exports = { MarkovMachine };
