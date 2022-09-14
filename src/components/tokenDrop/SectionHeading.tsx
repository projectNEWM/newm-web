import { Typography } from "elements";
import { FunctionComponent, ReactNode } from "react";

interface SectionHeadingProps {
  readonly children: ReactNode;
}

const SectionHeading: FunctionComponent<SectionHeadingProps> = ({
  children,
}) => {
  return (
    <Typography variant="subtitle2" fontWeight={ 600 }>
      { children }
    </Typography>
  );
};

export default SectionHeading;
