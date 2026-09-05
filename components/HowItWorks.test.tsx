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

  it("renders the main path plus its glow underlay", () => {
    render(<HowItWorks />);
    expect(document.querySelectorAll("svg path")).toHaveLength(2);
  });

  it("renders one halo ring per step without disturbing measurement", () => {
    render(<HowItWorks />);
    expect(
      document.querySelectorAll('span[class*="border-blue"]'),
    ).toHaveLength(3);
    expect(document.querySelectorAll("[class*='size-20']")).toHaveLength(3);
  });
});
