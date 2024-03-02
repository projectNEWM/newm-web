import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { IconButton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { TextInputField } from "@newm-web/elements";
import { Search as SearchIcon } from "@newm-web/assets";
import theme from "@newm-web/theme";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const validationSchema = Yup.object({
    searchTerm: Yup.string(),
  });

  const initialValues = {
    searchTerm,
  };

  const handleSearch = ({ searchTerm }: FormikValues) => {
    if (!searchTerm) return;

    router.push(`/search?searchTerm=${searchTerm}`);
  };

  return (
    <Formik
      enableReinitialize={ true }
      initialValues={ initialValues }
      validationSchema={ validationSchema }
      onSubmit={ handleSearch }
    >
      { () => (
        <Form style={ { maxWidth: "500px", width: "100%" } }>
          <Stack alignItems="center" direction="row">
            <TextInputField
              endAdornment={
                <IconButton
                  sx={ {
                    backgroundColor: theme.colors.black,
                    borderColor: theme.colors.grey400,
                    borderLeftWidth: theme.inputField.borderWidth,
                    borderRadius: 0,
                    borderStyle: "solid",
                    color: theme.colors.music,
                    padding: theme.inputField.padding,
                  } }
                  type="submit"
                >
                  <Typography paddingLeft={ 1 }>Search</Typography>
                </IconButton>
              }
              isOptional={ false }
              name="searchTerm"
              placeholder="Search artists or songs"
              startAdornment={
                <Stack fontSize={ "14px" } m={ 1 }>
                  <SearchIcon
                    style={ { fontSize: "16px", height: "16px", width: "16px" } }
                  />
                </Stack>
              }
              widthType="full"
            />
          </Stack>
        </Form>
      ) }
    </Formik>
  );
};
