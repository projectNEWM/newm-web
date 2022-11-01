import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "elements";

export default {
  component: Button,
  title: "Button",
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button { ...args } />;

export const Default = Template.bind({});
Default.args = {
  children: "Button Text",
};

export const Color: ComponentStory<typeof Button> = (args) => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button { ...args } color="company">
      Company
    </Button>
    <Button { ...args } color="crypto">
      Crypto
    </Button>
    <Button { ...args } color="magazine">
      Magazine
    </Button>
    <Button { ...args } color="music">
      Music
    </Button>
    <Button { ...args } color="partners">
      Partners
    </Button>
    <Button { ...args } color="white">
      White
    </Button>
  </div>
);

export const Variant: ComponentStory<typeof Button> = (args) => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button { ...args } variant="primary">
      Primary
    </Button>
    <Button { ...args } variant="secondary">
      Secondary
    </Button>
    <Button { ...args } variant="outlined">
      Outlined
    </Button>
  </div>
);

export const Width: ComponentStory<typeof Button> = (args) => (
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

export const Icon: ComponentStory<typeof Button> = (args) => (
  <div style={ { display: "flex", gap: "16px" } }>
    <Button
      { ...args }
      startIcon={
        <div
          style={ { height: "20px", width: "20px", backgroundColor: "yellow" } }
        ></div>
      }
    >
      Start Icon
    </Button>
    <Button
      { ...args }
      endIcon={
        <div
          style={ { height: "20px", width: "20px", backgroundColor: "yellow" } }
        ></div>
      }
    >
      End Icon
    </Button>
    <Button
      { ...args }
      startIcon={
        <div
          style={ { height: "20px", width: "20px", backgroundColor: "yellow" } }
        ></div>
      }
      endIcon={
        <div
          style={ { height: "20px", width: "20px", backgroundColor: "yellow" } }
        ></div>
      }
    >
      Both Icons
    </Button>
  </div>
);
