import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the charity badge", () => {
    render(<Hero />);
    expect(screen.getByText("UK-registered charity")).toBeDefined();
  });

  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByText("Tinker Pathways")).toBeDefined();
  });

  it("renders the CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Explore our programs")).toBeDefined();
    expect(screen.getByText("Support our mission")).toBeDefined();
  });
});
