import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Button from "../components/Button";

describe("Renders with text", () => {
  it("Shows button", () => {
    const mockText = "Hola";
    render(<Button>{mockText}</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(mockText);
  });
});
