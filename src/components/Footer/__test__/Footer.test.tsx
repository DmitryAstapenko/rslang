import React from "react";
import Footer from "../Footer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const setUp = () => shallow(<Footer />);

describe("should render Footer component", () => {
  let component:any;
  beforeEach(() => {
    component = setUp();
  });
  it("should contain logo in Footer", () => {
    const wrapper = component.find(".logo");
    expect(wrapper.length).toBe(1);
  });
  it("should contain Footer", () => {
    const wrapper = component.find(".footer");
    expect(wrapper.length).toBe(1);
  });
});
