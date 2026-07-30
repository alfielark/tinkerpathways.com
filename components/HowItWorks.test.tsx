import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("renders the section heading", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("From first idea to first launch"),
    ).toBeInTheDocument();
  });

  it("renders the section label", () => {
    render(<HowItWorks />);
    expect(screen.getByText("How it works")).toBeInTheDocument();
  });

  it("renders all three step numbers", () => {
    render(<HowItWorks />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders all three step titles", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText(
        /Students discover core ideas through interactive notebooks/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/students design and build their own agentic systems/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Projects go live/),
    ).toBeInTheDocument();
  });

  it("renders an SVG element for the connecting path", () => {
    render(<HowItWorks />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
