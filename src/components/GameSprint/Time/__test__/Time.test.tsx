import React from "react";
import Time from "../Time";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface ITimeProps {
  finishGame: () => void;
}

const setUp = (props:ITimeProps) => shallow(<Time {...props} />);

describe("should render Score component", () => {
  let component:any;
  beforeEach(() => {
    const finishGame = () => {
      console.log("finish");
    };
    component = setUp({finishGame});
  });
  it("should contain current time", () => {
    const wrapper = component.find(".time-value");
    expect(wrapper.length).toBe(1);
  });
  it("should render Time component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
