import React from "react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders app", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
});
