import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  argTypes: { 
    variant: { 
      control: "select", 
      options: ["default", "primary", "danger", "ghost"] 
    }, 
    size: { 
      control: "radio", 
      options: ["md", "sm"] 
    } 
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { 
  args: { children: "Button" } 
};

export const Primary: Story = { 
  args: { children: "Save", variant: "primary" } 
};

export const DangerSm: Story = { 
  args: { children: "Delete", variant: "danger", size: "sm" } 
};