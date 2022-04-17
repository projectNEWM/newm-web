import { renderWithContext } from "common";
import { fireEvent } from "@testing-library/react";
import { extendedApi } from "modules/session";
import GoogleLogin from "../GoogleLogin";

// mock useDispatch so that it doesn't actually fire any Redux functionality
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

// mock API call thunk
jest.mock("modules/session", () => ({
  extendedApi: {
    endpoints: {
      googleLogin: {
        initiate: jest.fn(),
      },
    },
  },
}));

// mock successful Google auth response on click
jest.mock("react-google-login", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockGoogleLogin = ({ onSuccess, render }: any) => {
    return render({ onClick: () => onSuccess({ accessToken: "MOCK" }) });
  };

  return MockGoogleLogin;
});

describe("<GoogleLogin />", () => {
  it("calls the API after successful response from Google", () => {
    const { getByLabelText } = renderWithContext(<GoogleLogin />);

    const button = getByLabelText("google authorization");
    fireEvent.click(button);

    expect(extendedApi.endpoints.googleLogin.initiate).toHaveBeenCalled();
  });
});
