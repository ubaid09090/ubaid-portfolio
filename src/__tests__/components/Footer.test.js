// src/__tests__/components/Footer.test.js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../../components/common/Footer";

describe("Footer Component", () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
  };

  it("renders footer with brand name", () => {
    renderFooter();
    expect(screen.getByText("Ubaid")).toBeInTheDocument();
    expect(screen.getByText("Ullah")).toBeInTheDocument();
  });

  it("renders quick links", () => {
    renderFooter();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    renderFooter();
    expect(screen.getByText("Islamabad, Pakistan")).toBeInTheDocument();
    expect(screen.getByText("uk2011768@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("0319-7900803")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    renderFooter();
    const socialLinks = screen.getAllByRole("link");
    const githubLink = socialLinks.find((link) =>
      link.href.includes("github.com"),
    );
    const linkedinLink = socialLinks.find((link) =>
      link.href.includes("linkedin.com"),
    );

    expect(githubLink).toBeTruthy();
    expect(linkedinLink).toBeTruthy();
  });

  it("displays current year in copyright", () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString())),
    ).toBeInTheDocument();
  });
});
