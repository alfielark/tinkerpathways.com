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
    // Tinker Pathways appears in nav and h1 — check at least one exists
    const matches = screen.getAllByText("Tinker Pathways");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation items (desktop + mobile)", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    // Each nav item appears twice: desktop nav + mobile menu
    expect(screen.getAllByText("Our Mission").length).toBe(2);
    expect(screen.getAllByText("How It Works").length).toBe(2);
    expect(screen.getAllByText("About Us").length).toBe(2);
    expect(screen.getAllByText("Get Involved").length).toBe(2);
  });

  it("renders all about section cards", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Governance")).toBeDefined();
    expect(screen.getByText("Our Story")).toBeDefined();
  });

  it("renders CTA section buttons", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("Make a donation")).toBeDefined();
    expect(screen.getByText("Volunteer your time")).toBeDefined();
  });

  it("renders the stats bar", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("Students reached")).toBeDefined();
    expect(screen.getByText("Partner schools")).toBeDefined();
    expect(screen.getByText("Active learners")).toBeDefined();
    expect(screen.getByText("Average rating")).toBeDefined();
  });

  it("renders the charity number", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.getByText("Registered Charity No. 1218899")).toBeDefined();
  });

  it("renders the footer", async () => {
    await act(async () => {
      render(<Page />);
    });
    await new Promise((r) => setTimeout(r, 50));
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Tinker Pathways. All rights reserved.`)
    ).toBeDefined();
  });
});
