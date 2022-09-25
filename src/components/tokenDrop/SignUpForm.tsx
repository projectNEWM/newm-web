import { Box, Stack, useMediaQuery } from "@mui/material";
import { FilledButton, TextInput } from "elements";
import { FunctionComponent, useState } from "react";
import theme from "theme";

const u = "3bf911620d8791d21fb973749";
const id = "52df6705d1";
const fId = "006275e2f0";

/**
 * Email subscription form based on generated Mailchimp template
 */
const SignUpForm: FunctionComponent = () => {
  const [email, setEmail] = useState("");

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <form
      action={ `https://projectnewm.us1.list-manage.com/subscribe/post?u=${u}&amp;id=${id}&amp;f_id=${fId}` }
      method="post"
      target="_self"
    >
      <input
        style={ { display: "none" } }
        type="checkbox"
        value="4"
        name="group[383765][4]"
        id="mce-group[383765]-383765-1"
        checked={ true }
      />

      <div style={ { position: "absolute", left: "-5000px" } } aria-hidden="true">
        <input
          type="text"
          name="b_3bf911620d8791d21fb973749_52df6705d1"
          tabIndex={ -1 }
          value=""
        />
      </div>

      <Stack direction={ isLargeScreen ? "row" : "column" } spacing={ 1.5 }>
        <TextInput
          type="email"
          name="EMAIL"
          value={ email }
          placeholder="Email address"
          onChange={ (e) => setEmail(e.target.value) }
          widthType={ isLargeScreen ? "default" : "full" }
          required={ true }
        />

        <FilledButton type="submit" value="Subscribe" name="subscribe">
          Subscribe
        </FilledButton>
      </Stack>
    </form>
  );
};

export default SignUpForm;
