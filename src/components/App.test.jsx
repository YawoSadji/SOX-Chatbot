import React from "react";
import "@testing-library/jest-dom";
import App from "../App";
import { render, screen } from "@testing-library/react";

test("renders app", () => {
  render(<App />);
  expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
});
