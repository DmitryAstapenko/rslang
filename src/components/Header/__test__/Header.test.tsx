import React from "react";
import Header from "../Header";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = () => shallow(<Header />);

describe("should render Header component", () => {
  let component:any;
  beforeEach(() => {
    component = setUp();
  });
  it("should contain div in Header", () => {
    const wrapper = component.find("div");
    expect(wrapper.length).toBe(1);
  });
  it("should render Header component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
