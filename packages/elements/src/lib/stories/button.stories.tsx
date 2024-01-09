import { Meta, StoryFn } from "@storybook/react";
import Button from "../Button";

export default {
  component: Button,
  title: "Button",
} as Meta;

const Template: StoryFn = (args) => <Button { ...args } />;

export const Default = Template.bind({});
Default.args = {
  children: "Button Text",
};

export const Color: StoryFn = () => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button gradient="company">Company</Button>
    <Button gradient="crypto">Crypto</Button>
    <Button gradient="magazine">Magazine</Button>
    <Button gradient="music">Music</Button>
    <Button gradient="partners">Partners</Button>
  </div>
);

export const Variant: StoryFn = () => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outlined">Outlined</Button>
  </div>
);

export const Width: StoryFn = (args) => (
  <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
    <Button { ...args } width="icon">
      +
    </Button>
    <Button { ...args } width="compact">
      Compact
    </Button>
    <Button { ...args } width="default">
      Default
    </Button>
    <Button { ...args } width="full">
      Full
    </Button>
  </div>
);

export const Icon: StoryFn = (args) => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button
      { ...args }
      startIcon={
        <div
          style={ { backgroundColor: "yellow", height: "20px", width: "20px" } }
        ></div>
      }
    >
      Start Icon
    </Button>
    <Button
      { ...args }
      endIcon={
        <div
          style={ { backgroundColor: "yellow", height: "20px", width: "20px" } }
        ></div>
      }
    >
      End Icon
    </Button>
    <Button
      { ...args }
      endIcon={
        <div
          style={ { backgroundColor: "yellow", height: "20px", width: "20px" } }
        ></div>
      }
      startIcon={
        <div
          style={ { backgroundColor: "yellow", height: "20px", width: "20px" } }
        ></div>
      }
    >
      Both Icons
    </Button>
  </div>
);
