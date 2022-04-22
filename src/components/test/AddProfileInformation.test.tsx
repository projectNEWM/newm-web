import { renderWithContext, withFormik } from "common";
import * as Formik from "formik";
import AddProfileInformation from "../AddProfileInformation";

describe("<AddProfileInformation />", () => {
  describe("when the 'tags' prop is present", () => {
    describe("when errors are present", () => {
      it("displays the tags", () => {
        jest.spyOn(Formik, "useFormikContext").mockImplementation(
          () =>
            ({
              errors: { example: "example error messge" },
              handleblur: jest.fn(),
            } as any)
        );

        const { queryByText } = renderWithContext(
          withFormik(
            <AddProfileInformation
              fieldName="example"
              nextRoute="/example-route"
              prompt="example-prompt"
              tags={ ["hello", "world"] }
            />,
            {
              initialValues: { example: "" },
              onSubmit: jest.fn(),
              validateOnMount: true,
            }
          )
        );

        expect(queryByText("hello")).toBeTruthy();
        expect(queryByText("world")).toBeTruthy();
      });
    });

    describe("when errors are not present", () => {
      it("does not display the tags", () => {
        jest.spyOn(Formik, "useFormikContext").mockImplementation(
          () =>
            ({
              errors: {},
              handleblur: jest.fn(),
            } as any)
        );

        const { queryByText } = renderWithContext(
          withFormik(
            <AddProfileInformation
              fieldName="example"
              nextRoute="/example-route"
              prompt="example-prompt"
              tags={ ["hello", "world"] }
            />,
            {
              initialValues: { example: "" },
              onSubmit: jest.fn(),
              validateOnMount: true,
            }
          )
        );

        expect(queryByText("hello")).toBeFalsy();
        expect(queryByText("world")).toBeFalsy();
      });
    });
  });
});
