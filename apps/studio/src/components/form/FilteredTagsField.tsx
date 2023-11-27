import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Field, FieldProps } from "formik";
import { Button } from "@newm.io/studio/elements";

interface FilteredTagsFieldProps {
  readonly name: string;
  readonly tags: ReadonlyArray<string>;
}

/**
 * Formik field component that displays tags based on the value of
 * the field. Pressing one of the tags will update the field with that value.
 */
const FilteredTagsField: FunctionComponent<FilteredTagsFieldProps> = ({
  name,
  tags,
}) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => {
      const filteredTags = tags.filter(filterTags(field.value));

      return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {filteredTags.map((tag) => (
            <Button
              key={tag}
              sx={{ m: 1 }}
              variant="outlined"
              width="compact"
              onClick={() => form.handleChange(name)(tag)}
            >
              {tag}
            </Button>
          ))}
        </Box>
      );
    }}
  </Field>
);

/**
 * If there is no query string, display all tags. Otherwise, only show tags
 * that match the query string. Once the query string exactly matches a
 * tag, hide the remaining tag.
 */
const filterTags = (query: string) => (tag: string) => {
  const emptyQuery = query.length === 0;
  const queryExactlyMatchesTag = tag === query;
  const tagIncludesQuery = tag.toLowerCase().includes(query.toLowerCase());

  return emptyQuery || (!queryExactlyMatchesTag && tagIncludesQuery);
};

export default FilteredTagsField;
