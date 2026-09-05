import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Page from "./page";

describe("Home page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders without crashing", async () => {
    let container: HTMLElement | undefined;
    await act(async () => {
      const result = render(<Page />);
      container = result.container;
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(container).toBeDefined();
  });

  it("renders the hero heading", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    // Nav/footer live in Providers now, so target the page's own h1
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders all about section cards", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    // Card action links are unique on the page
    expect(screen.getByText("View projects")).toBeDefined();
    expect(screen.getByText("Meet the team")).toBeDefined();
    expect(screen.getByText("Read our story")).toBeDefined();
  });

  it("renders the hero highlight stats", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    // Values are unique; labels appear twice (sr-only term + visible label)
    expect(screen.getByText("12+")).toBeDefined();
    expect(screen.getByText("2+")).toBeDefined();
    expect(screen.getByText("4.9★")).toBeDefined();
    expect(
      screen.getAllByText("Partner schools").length
    ).toBeGreaterThanOrEqual(1);
  });

});
