/* eslint-disable @typescript-eslint/no-non-null-assertion */

import IUserWordData from "../../types/user-words-types";

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class Game {
  currentWord: IUserWordData | undefined;

  private index: number;

  constructor(public wordsList: IUserWordData[]) {
    this.index = 0;
  }

  static summarize(string: string): string {
    return string.trim().toLowerCase();
  }

  nextWord(): IUserWordData {
    this.currentWord = this.wordsList[this.index];
    this.index += 1;
    return this.currentWord;
  }

  startsWith(value: string): boolean {
    return Game.summarize(this.currentWord!.word).startsWith(
      Game.summarize(value)
    );
  }

  isCorrect(value: string): boolean {
    return Game.summarize(value) === Game.summarize(this.currentWord!.word);
  }
}
