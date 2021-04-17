import React from "react";
import AnswerBlock from "../AnswerBlock";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface IAnswerBlock {
  wordsTranslations: string[];
  onNextWord: () => void;
  wordTranslate: string;
  changeAnswerBlock: (flag: boolean) => void;
  isAnswer: boolean;
}

const setUp = (props:IAnswerBlock) => shallow(<AnswerBlock {...props} />);

describe("should render Score component", () => {
  let component:any;
  beforeEach(() => {
    const isAnswer: boolean = false;
    const wordsTranslations: string[] = ["один", "два", "три"];
    const wordTranslate = "один";
    const changeAnswerBlock = (flag: boolean) => {
      console.log(flag);
    };
    const onNextWord = () => {
      console.log("next word");
    };
    component = setUp({wordsTranslations, onNextWord, wordTranslate, changeAnswerBlock, isAnswer});
  });
  it("should contain list", () => {
    const wrapper = component.find(".answer-block-list");
    expect(wrapper.length).toBe(1);
  });
  it("should contain AnswerBlock", () => {
    const wrapper = component.find(".answer-block");
    expect(wrapper.length).toBe(1);
  });
});
