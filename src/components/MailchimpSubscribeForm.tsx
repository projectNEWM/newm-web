import { Stack, useMediaQuery } from "@mui/material";
import { FilledButton, TextInput } from "elements";
import { FunctionComponent, useState } from "react";
import theme from "theme";

interface MailchimpSubscribeFormProps {
  readonly u: string;
  readonly id: string;
  readonly fId: string;
  readonly hiddenInputName: string;
  readonly groupName?: string;
}

/**
 * Email subscription form based on generated Mailchimp template
 */
const MailchimpSubscribeForm: FunctionComponent<
  MailchimpSubscribeFormProps
> = ({ u, id, fId, hiddenInputName, groupName }) => {
  const [email, setEmail] = useState("");

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <form
      action={ `https://projectnewm.us1.list-manage.com/subscribe/post?u=${u}&amp;id=${id}&amp;f_id=${fId}` }
      method="post"
      target="_self"
    >
      { !!groupName && (
        <input
          style={ { display: "none" } }
          type="checkbox"
          value="4"
          name={ groupName }
          checked={ true }
        />
      ) }

      <div style={ { position: "absolute", left: "-5000px" } } aria-hidden="true">
        <input type="text" name={ hiddenInputName } tabIndex={ -1 } value="" />
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

export default MailchimpSubscribeForm;
