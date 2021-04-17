import React from "react";
import GameField from "../GameField";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface IGameFieldProps {
  currentWord: string;
  levelBonus: number;
  currentTranslate: string;
  onAnswerClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentChain: number;
}


const setUp = (props:IGameFieldProps) => shallow(<GameField {...props} />);

describe("should render Score component", () => {
  let component:any;
  beforeEach(() => {
    const currentWord: string = "main";
    const levelBonus: number = 0;
    const currentTranslate: string = "главный";
    const currentChain: number = 0;
    const onAnswerClick = (e : React.MouseEvent<HTMLButtonElement>) => {
      console.log(e);
    };
    component = setUp({levelBonus, currentWord, currentChain,currentTranslate,onAnswerClick});
  });
  it("should contain game-status block", () => {
    const wrapper = component.find(".game-status");
    expect(wrapper.length).toBe(1);
  });
  it("should render Score component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
