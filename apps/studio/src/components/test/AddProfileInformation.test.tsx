import { renderWithContext } from "../../common";
import { withFormik } from "@newm-web/utils";
import * as Formik from "formik";
import AddProfileInformation from "../createProfile/AddProfileInformation";

describe("<AddProfileInformation />", () => {
  describe("when the 'tags' prop is present", () => {
    describe("when the form is not valid", () => {
      it("displays the tags", () => {
        jest.spyOn(Formik, "useFormikContext").mockImplementation(
          () =>
            ({
              isValid: false,
              setFieldTouched: jest.fn(),
              handleSubmit: jest.fn(),
            } as any) // eslint-disable-line
        );

        const { queryByText } = renderWithContext(
          withFormik(
            <AddProfileInformation
              fieldName="example"
              prompt="example-prompt"
              tags={["hello", "world"]}
            />,
            {
              initialValues: { example: "" },
              onSubmit: jest.fn(),
            }
          )
        );

        expect(queryByText("hello")).toBeTruthy();
        expect(queryByText("world")).toBeTruthy();
      });
    });

    describe("when the form is valid", () => {
      it("does not display the tags", () => {
        jest.spyOn(Formik, "useFormikContext").mockImplementation(
          () =>
            ({
              isValid: true,
              setFieldTouched: jest.fn(),
              handleSubmit: jest.fn(),
              values: { example: "" },
            } as any) // eslint-disable-line
        );

        const { queryByText } = renderWithContext(
          withFormik(
            <AddProfileInformation
              fieldName="example"
              prompt="example-prompt"
              tags={["hello", "world"]}
            />,
            {
              initialValues: { example: "" },
              onSubmit: jest.fn(),
            }
          )
        );

        expect(queryByText("hello")).toBeFalsy();
        expect(queryByText("world")).toBeFalsy();
      });
    });
  });
});
