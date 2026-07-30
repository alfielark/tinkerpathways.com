import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsBar } from "./StatsBar";

describe("StatsBar", () => {
  it("renders all four stats", () => {
    render(<StatsBar />);
    expect(screen.getByText("Students reached")).toBeDefined();
    expect(screen.getByText("Partner schools")).toBeDefined();
    expect(screen.getByText("Partner organisations")).toBeDefined();
    expect(screen.getByText("Average rating")).toBeDefined();
  });
});
