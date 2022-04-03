import { renderWithContext } from "common";
import { fireEvent } from "@testing-library/react";
import { extendedApi } from "modules/session";
import FacebookLogin from "../FacebookLogin";

// mock useDispatch so that it doesn't actually fire any Redux functionality
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

// mock API call thunk
jest.mock("modules/session", () => ({
  ...jest.requireActual("modules/session"),
  extendedApi: {
    endpoints: {
      facebookLogin: {
        initiate: jest.fn(),
      },
    },
  },
}));

// mock successful Facebook auth response on click
jest.mock("react-facebook-login/dist/facebook-login-render-props", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockFacebookLogin = ({ callback, render }: any) => {
    return render({ onClick: () => callback({ accessToken: "MOCK" }) });
  };

  return MockFacebookLogin;
});

describe("<FacebookLogin />", () => {
  it("calls the API after successful response from Facebook", () => {
    const { getByLabelText } = renderWithContext(<FacebookLogin />);

    const button = getByLabelText("facebook authorization");
    fireEvent.click(button);

    expect(extendedApi.endpoints.facebookLogin.initiate).toHaveBeenCalled();
  });
});
