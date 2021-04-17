import React from "react";
import BookHeader from "../BookHeader";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface IBookHeaderProps {
  name: string;
  group: number;
}
const setUp = (props:IBookHeaderProps) => shallow(<BookHeader {...props} />);

describe("should render BookHeader component", () => {
  let component:any;
  beforeEach(() => {
    const name: string = "";
    const group: number = 0;
    component = setUp({name, group});
  });
  it("should contain book-header", () => {
    const wrapper = component.find(".book-header");
    expect(wrapper.length).toBe(1);
  });
  it("should render BookHeader component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
