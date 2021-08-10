import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function () {
  // smoke test to ensure it doesn't crash when rendering
  render(<Carousel />);
});

it("matches snapshot", function () {
  const { container } = render(<Carousel />);
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="Photo by Richard Pasquarella on Unsplash"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="Photo by Richard Pasquarella on Unsplash"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="Photo by Pratik Patel on Unsplash"]')
  ).toBeInTheDocument();
});

it("should go to previous image when clicking left chevron", function(){
  const { container } = render(<Carousel />);

  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".fa-chevron-circle-left");
  fireEvent.click(leftArrow);

  expect(
    container.querySelector("small")
  ).toContainHTML("Image 1 of 3.");
  expect(
    container.querySelector('img[alt="Photo by Richard Pasquarella on Unsplash"]')
  ).toBeInTheDocument();

})

it("should hide chevrons on ends of list of images", function(){
  const { container, debug } = render(<Carousel />);

  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  const leftArrow = container.querySelector(".fa-chevron-circle-left");

  expect(
    container.querySelector(".fa-chevron-circle-left")
  ).not.toBeInTheDocument();

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(
    container.querySelector(".fa-chevron-circle-right")
  ).not.toBeInTheDocument();

})