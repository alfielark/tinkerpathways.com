import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
    expect(screen.getByText("Pathways")).toBeDefined();
  });

  it("renders the CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Explore our programs")).toBeDefined();
    expect(screen.getByText("Join the waitlist")).toBeDefined();
  });
});
