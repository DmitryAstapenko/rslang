import React from "react";
import LinksGames from "../LinksGames";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

interface ILinksGamesProps {
  group: number;
  page: number;
  filter: string;
  wordsPerPage: number;
  count: number;
}

const setUp = (props:ILinksGamesProps) => shallow(<LinksGames {...props} />);

describe("should render LinksGames component", () => {
  let component:any;
  beforeEach(() => {
    const group: number = 0;
    const page: number = 0;
    const filter: string = "";
    const wordsPerPage: number = 10;
    const count: number = 10;
    component = setUp({group, page, filter, wordsPerPage, count});
  });
  it("should contain LinksGames component", () => {
    const wrapper = component.find(".links-game");
    expect(wrapper.length).toBe(1);
  });
});
