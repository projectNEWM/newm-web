import { Stack, useMediaQuery } from "@mui/material";
import { FilledButton, TextInput } from "elements";
import { FunctionComponent, useEffect, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const currentInputRef = inputRef.current;
    const preventDefault = (event: Event) => event.preventDefault();

    currentInputRef?.addEventListener("invalid", preventDefault);

    return () =>
      currentInputRef?.removeEventListener("invalid", preventDefault);
  });

  const handleBlur = () => {
    setIsValid(!!inputRef.current?.validity.valid);
  };

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
          onBlur={ handleBlur }
          ref={ inputRef }
          errorMessage={ isValid ? "" : "Please enter a valid email address" }
        />

        <FilledButton
          disabled={ !isValid }
          name="subscribe"
          sx={ { maxHeight: "46px" } }
          type="submit"
          value="Subscribe"
        >
          Subscribe
        </FilledButton>
      </Stack>
    </form>
  );
};

export default MailchimpSubscribeForm;