import { render } from "@testing-library/react";
import Footer from "../components/Footer";
import { expect, test } from "vitest";

test("Renders Footer Correctly ", () => {
  const tree = render(<Footer />);
  expect(tree).toMatchSnapshot();
});
