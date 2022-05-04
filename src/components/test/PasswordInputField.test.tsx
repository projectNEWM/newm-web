import { screen } from "@testing-library/react";
import { renderWithContext, withFormik } from "common";
import * as Formik from "formik";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PasswordInputField from "../form/PasswordInputField";

describe("<PasswordInputField>", () => {
  jest.spyOn(Formik, "useFormikContext").mockImplementation(
    () =>
      ({
        isValid: false,
        setFieldTouched: jest.fn(),
        handleSubmit: jest.fn(),
      } as any)
  );

  const renderComponent = (propOverrides = {}) => {
    const props = {
      externalMaskPassword: undefined,
      handlePressEndAdornment: undefined,
      name: "password",
      placeholder: "password placeholder",
      showEndAdornment: undefined,
      ...propOverrides,
    };

    return renderWithContext(
      withFormik(<PasswordInputField { ...props } />, {
        initialValues: { name: "" },
        onSubmit: jest.fn(),
      })
    );
  };

  it("renders with defaults when only required name prop is given", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("password placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("VisibilityIcon")).toBeInTheDocument();
  });

  it("renders without the end adornment", () => {
    renderComponent({ showEndAdornment: false });

    expect(screen.queryByTestId("VisibilityIcon")).not.toBeInTheDocument();
  });

  it("is able to toggle password mask when clicked", () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("password placeholder");
    const maskIcon = screen.getByTestId("VisibilityIcon");

    expect(passwordInput).toHaveAttribute("type", "password");

    userEvent.click(maskIcon);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(maskIcon).not.toBeInTheDocument();
    expect(screen.getByTestId("VisibilityOffIcon")).toBeInTheDocument();
  });

  it("does not toggle mask when custom handler provided", () => {
    const mockHandlePressEndAdornment = jest.fn();
    renderComponent({ externalMaskPassword: true, handlePressEndAdornment: mockHandlePressEndAdornment });

    const maskIcon = screen.getByTestId("VisibilityIcon");

    expect(maskIcon).toBeInTheDocument();
    expect(mockHandlePressEndAdornment).not.toBeCalled();

    userEvent.click(maskIcon);

    expect(maskIcon).toBeInTheDocument();
    expect(mockHandlePressEndAdornment).toBeCalled();
  });
});
