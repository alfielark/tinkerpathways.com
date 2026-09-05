import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Providers } from "./Providers";

async function renderChrome() {
  await act(async () => {
    render(
      <Providers>
        <div>page content</div>
      </Providers>,
    );
    await new Promise((r) => setTimeout(r, 50));
  });
}

describe("Providers persistent chrome", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders nav and footer around page content", async () => {
    await renderChrome();
    expect(screen.getByText("page content")).toBeInTheDocument();
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Tinker Pathways. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it("renders navigation items (desktop + mobile)", async () => {
    await renderChrome();
    // Each nav item appears in desktop nav + mobile menu, and some also
    // as footer links, so assert a minimum count
    expect(screen.getAllByText("Projects").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Team").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Trustees & Team")).toBeInTheDocument();
    expect(screen.getAllByText("Our Story").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText("Testimonies").length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Waitlist").length).toBeGreaterThanOrEqual(2);
  });

  it("renders CTA buttons", async () => {
    await renderChrome();
    expect(screen.getByText("Make a donation")).toBeInTheDocument();
    expect(screen.getByText("Volunteer your time")).toBeInTheDocument();
  });

  it("wraps page content in the view-transition group", async () => {
    await renderChrome();
    const content = screen.getByText("page content");
    expect(content.closest(".page-transition")).not.toBeNull();
  });

  it("renders the charity number", async () => {
    await renderChrome();
    expect(
      screen.getByText("Registered Charity No. 1218899"),
    ).toBeInTheDocument();
  });
});
