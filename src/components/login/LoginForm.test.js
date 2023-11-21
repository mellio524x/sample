import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

test("Validates email format", async () => {
  // Given
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email");
  const sumbitBtn = screen.getByText("Sign in");
  // When
  userEvent.type(emailInput, "invalid-email@kol.c");
  fireEvent.click(sumbitBtn);
  // Then
  const updateMessage = await screen.findByText("Invalid email.");
  expect(updateMessage).toBeInTheDocument();
});

test("password longer than 8 characters", async () => {
  //Given
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const sumbitBtn = screen.getByText("Sign in");
  //When
  userEvent.type(emailInput, "email@gmail.com");
  userEvent.type(passwordInput, "1234");
  userEvent.click(sumbitBtn);
  //Then
  const updateMessage = await screen.findByText(
    "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number."
  );
  expect(updateMessage).toBeInTheDocument();
});

test("password no longer than 20 characters", async () => {
  //Given
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const sumbitBtn = screen.getByText("Sign in");
  //When
  userEvent.type(emailInput, "email@gmail.com");
  userEvent.type(passwordInput, "1234567890123456789Abcd");
  userEvent.click(sumbitBtn);
  //Then
  const updateMessage = await screen.findByText(
    "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number."
  );
  expect(updateMessage).toBeInTheDocument();
});

test("password contains at least uppercase", async () => {
  //Given
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const sumbitBtn = screen.getByText("Sign in");
  //When
  userEvent.type(emailInput, "email@gmail.com");
  userEvent.type(passwordInput, "1234abcd");
  userEvent.click(sumbitBtn);
  //Then
  const updateMessage = await screen.findByText(
    "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number."
  );
  expect(updateMessage).toBeInTheDocument();
});
test("password contains at least 1 lowercase", async () => {
  //Given
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const sumbitBtn = screen.getByText("Sign in");
  //When
  userEvent.type(emailInput, "email@gmail.com");
  userEvent.type(passwordInput, "1234ABCD");
  userEvent.click(sumbitBtn);
  //Then
  const updateMessage = await screen.findByText(
    "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number."
  );
  expect(updateMessage).toBeInTheDocument();
});
