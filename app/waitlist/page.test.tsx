import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Page from "./page";

describe("Waitlist page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders the heading and form fields", async () => {
    await act(async () => {
      render(<Page />);
    });
    expect(screen.getByText("Be first in line")).toBeDefined();
    expect(screen.getByLabelText(/Your name/)).toBeDefined();
    expect(screen.getByLabelText(/Email address/)).toBeDefined();
    expect(screen.getByLabelText(/I am a/)).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Join the waitlist" })
    ).toBeDefined();
  });

  it("shows a validation error for an invalid email", async () => {
    await act(async () => {
      render(<Page />);
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Your name/), {
        target: { value: "Ada" },
      });
      fireEvent.change(screen.getByLabelText(/Email address/), {
        target: { value: "not-an-email" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Join the waitlist" }));
    });
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("shows the success state on valid submit", async () => {
    await act(async () => {
      render(<Page />);
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Your name/), {
        target: { value: "Ada" },
      });
      fireEvent.change(screen.getByLabelText(/Email address/), {
        target: { value: "ada@example.com" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Join the waitlist" }));
    });
    expect(screen.getByText("You're on the list")).toBeDefined();
  });
});
