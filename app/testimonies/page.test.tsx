import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Page from "./page";

describe("Testimonies page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders the heading and placeholder disclaimer", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("What our community says")).toBeDefined();
    expect(
      screen.getByText(/illustrative placeholders — real testimonies coming soon/)
    ).toBeDefined();
  });

  it("badges every quote as a placeholder", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    const badges = screen.getAllByText("Illustrative placeholder");
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });

  it("renders the stats bar", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("Students reached")).toBeDefined();
    expect(screen.getByText("Active learners")).toBeDefined();
  });
});
