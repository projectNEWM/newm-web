import { renderWithContext } from "common";
import { fireEvent } from "@testing-library/react";
import { extendedApi } from "modules/session";
import GoogleLogin from "../GoogleLogin";

interface OnSuccessParams {
  readonly access_token: string;
}
interface UseGoogleLoginParams {
  readonly onSuccess: ({ access_token }: OnSuccessParams) => void;
}

// mock useAppDispatch so that it doesn't actually fire any Redux functionality
jest.mock("common", () => ({
  ...jest.requireActual("common"),
  useAppDispatch: () => jest.fn(),
}));

jest.spyOn(extendedApi.endpoints.googleLogin, "initiate");

jest.mock("@react-oauth/google", () => {
  return {
    ...jest.requireActual("@react-oauth/google"),
    // mock successful response
    useGoogleLogin({ onSuccess }: UseGoogleLoginParams) {
      return () => onSuccess({ access_token: "example-token" });
    },
  };
});

describe("<GoogleLogin />", () => {
  it("calls the API after successful response from Google", () => {
    const { getByLabelText } = renderWithContext(<GoogleLogin />);

    const button = getByLabelText("google authorization");
    fireEvent.click(button);

    expect(extendedApi.endpoints.googleLogin.initiate).toHaveBeenCalled();
  });
});
