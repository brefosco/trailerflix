import Tabs from "../components/InfoTabs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";

describe("Renders correctly", () => {
  it("Renders table", () => {
    render(<Tabs />);
    const priceTable = screen.getByRole("table");
    expect(priceTable).toBeVisible();
  });

  it("Changes to different tab", async () => {
    render(<Tabs />);
    const user = userEvent.setup();
    const cancelTabTitle = screen.getByTestId("cancel-title");
    await user.click(cancelTabTitle);
    const cancelTabContent = screen.getByAltText("available for all platforms");
    expect(cancelTabContent).toBeVisible();
  });
});
