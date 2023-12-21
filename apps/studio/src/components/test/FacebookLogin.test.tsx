import { fireEvent } from "@testing-library/react";
import { renderWithContext } from "../../common";
import { extendedApi } from "../../modules/session";
import FacebookLogin from "../FacebookLogin";

// mock useAppDispatch so that it doesn't actually fire any Redux functionality
jest.mock("../../common", () => ({
  ...jest.requireActual("../../common"),
  useAppDispatch: () => jest.fn(),
}));

// mock successful Facebook auth response on click
jest.mock("@greatsumini/react-facebook-login", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockFacebookLogin = ({ onSuccess, render }: any) => {
    return render({ onClick: () => onSuccess({ accessToken: "MOCK" }) });
  };

  return MockFacebookLogin;
});

describe("<FacebookLogin />", () => {
  it("calls the API after successful response from Facebook", () => {
    jest.spyOn(extendedApi.endpoints.facebookLogin, "initiate");

    const { getByLabelText } = renderWithContext(<FacebookLogin />);

    const button = getByLabelText("facebook authorization");
    fireEvent.click(button);

    expect(extendedApi.endpoints.facebookLogin.initiate).toHaveBeenCalled();
  });
});
