import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function () {
  // smoke test to ensure it doesn't crash when rendering
  render(<Card />);
});

it("matches snapshot", function () {
  const { container } = render(<Card />);
  expect(container).toMatchSnapshot();
});
