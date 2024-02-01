import { fireEvent } from "@testing-library/react";
import { AppleAuthResponse } from "react-apple-signin-auth";
import { renderWithContext } from "../../common";
import { extendedApi } from "../../modules/session";
import AppleLogin from "../AppleLogin";

interface UseAppleLoginParams {
  readonly onSuccess: ({
    authorization: { id_token, code },
  }: AppleAuthResponse) => void;
}

// mock useAppDispatch so that it doesn't actually fire any Redux functionality
jest.mock("../../common", () => ({
  ...jest.requireActual("../../common"),
  useAppDispatch: () => jest.fn(),
}));

jest.spyOn(extendedApi.endpoints.appleLogin, "initiate");

jest.mock("react-apple-signin-auth", () => {
  return {
    ...jest.requireActual("react-apple-signin-auth"),
    // mock successful response

    appleAuthHelpers: {
      signIn: ({ onSuccess }: UseAppleLoginParams) => {
        onSuccess({
          authorization: {
            code: "example-code",
            id_token: "example_token",
          },
        });
      },
    },
  };
});

describe("<AppleLogin />", () => {
  it("calls the API after successful response from Apple", () => {
    const { getByLabelText } = renderWithContext(<AppleLogin />);

    const button = getByLabelText("apple authorization");
    fireEvent.click(button);

    expect(extendedApi.endpoints.appleLogin.initiate).toHaveBeenCalled();
  });
});
