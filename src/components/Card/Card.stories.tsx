import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = { 
  title: "Primitives/Card", 
  component: Card 
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { 
  args: { 
    title: "Card title", 
    children: "Body text that uses muted foreground." 
  } 
};