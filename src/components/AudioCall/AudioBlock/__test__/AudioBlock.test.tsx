import React from "react";
import AudioBlock from "../AudioBlock";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface IAudioProps {
  audio: string;
  image: string;
  isAnswer: boolean;
  word: string;
}

const setUp = (props:IAudioProps) => shallow(<AudioBlock {...props} />);

describe("should render Score component", () => {
  let component:any;
  beforeEach(() => {
    const audio: string = "path-audio";
    const image: string = "path-image";
    const isAnswer: boolean = false;
    const word: string = "current-word";
    component = setUp({audio, image, isAnswer, word});
  });
  it("should contain audio block icon", () => {
    const wrapper = component.find(".audio-block-icon");
    expect(wrapper.length).toBe(1);
  });
  it("should render AudioBlock component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
