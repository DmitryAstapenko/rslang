import React from "react";
import Score from "../Score";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface IScoreProps {
  score: number;
}

const setUp = (props:IScoreProps) => shallow(<Score {...props} />);

describe("should render Score component", () => {
  let component:any;
  beforeEach(() => {
    const score: number = 100;
    component = setUp({score});
  });
  it("should contain Score block", () => {
    const wrapper = component.find(".game-sprint-score");
    expect(wrapper.length).toBe(1);
  });
  it("should render Score component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
