// src/__tests__/components/Button.test.js
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/ui/Button";

describe("Button Component", () => {
  it("renders button with children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant by default", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("applies secondary variant when specified", () => {
    render(<Button variant="secondary">Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-gray-200");
  });

  it("applies danger variant when specified", () => {
    render(<Button variant="danger">Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-red-600");
  });

  it("applies success variant when specified", () => {
    render(<Button variant="success">Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-green-600");
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading prop is true", () => {
    render(<Button loading>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("applies different sizes", () => {
    const { rerender } = render(<Button size="sm">Click Me</Button>);
    let button = screen.getByText("Click Me");
    expect(button).toHaveClass("px-3", "py-1.5", "text-sm");

    rerender(<Button size="lg">Click Me</Button>);
    button = screen.getByText("Click Me");
    expect(button).toHaveClass("px-7", "py-3.5", "text-lg");
  });

  it("renders icon when provided", () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;
    render(<Button icon={MockIcon}>Click Me</Button>);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });
});
