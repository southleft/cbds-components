import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "Button component matching CBDS Figma design specifications"
      }
    }
  },
  argTypes: { 
    variant: { 
      control: "select", 
      options: ["primary", "surface", "danger", "ghost"],
      description: "Visual style variant of the button (matches Figma variants)"
    }, 
    size: { 
      control: "radio", 
      options: ["small", "medium", "large"],
      description: "Size of the button (32px, 40px, 48px heights)" 
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the button full width"
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the button"
    },
    children: {
      control: "text",
      description: "Button text content"
    },
    iconLeft: {
      control: false,
      description: "Icon to display on the left side"
    },
    iconRight: {
      control: false,
      description: "Icon to display on the right side"
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button (Brand Primary from Figma)
export const Primary: Story = { 
  args: { 
    children: "Button",
    variant: "primary"
  } 
};

// Surface button variant
export const Surface: Story = { 
  args: { 
    children: "Button", 
    variant: "surface" 
  } 
};

// Danger button variant (Brand Danger from Figma)
export const Danger: Story = { 
  args: { 
    children: "Button", 
    variant: "danger" 
  } 
};

// Ghost button variant
export const Ghost: Story = { 
  args: { 
    children: "Button", 
    variant: "ghost" 
  } 
};

// Size variations
export const Small: Story = { 
  args: { 
    children: "Button", 
    size: "small"
  } 
};

export const Medium: Story = { 
  args: { 
    children: "Button", 
    size: "medium"
  } 
};

export const Large: Story = { 
  args: { 
    children: "Button", 
    size: "large"
  } 
};

// States
export const Disabled: Story = { 
  args: { 
    children: "Button", 
    disabled: true
  } 
};

// Full width
export const FullWidth: Story = { 
  args: { 
    children: "Button", 
    fullWidth: true
  } 
};

// All States Showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
          Button Variants (Matching Figma)
        </h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="surface">Surface</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
          Size Variations
        </h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Button size="small">Small (32px)</Button>
          <Button size="medium">Medium (40px)</Button>
          <Button size="large">Large (48px)</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
          Interactive States
        </h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#738094" }}>
              Hover, Focus, and Pressed states are interactive
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
          Full Width Option
        </h3>
        <Button fullWidth>Full Width Button</Button>
      </div>
      
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
          All Variants × All Sizes Grid
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "600px" }}>
          {/* Small size */}
          <Button variant="primary" size="small">Primary</Button>
          <Button variant="surface" size="small">Surface</Button>
          <Button variant="danger" size="small">Danger</Button>
          <Button variant="ghost" size="small">Ghost</Button>
          
          {/* Medium size */}
          <Button variant="primary" size="medium">Primary</Button>
          <Button variant="surface" size="medium">Surface</Button>
          <Button variant="danger" size="medium">Danger</Button>
          <Button variant="ghost" size="medium">Ghost</Button>
          
          {/* Large size */}
          <Button variant="primary" size="large">Primary</Button>
          <Button variant="surface" size="large">Surface</Button>
          <Button variant="danger" size="large">Danger</Button>
          <Button variant="ghost" size="large">Ghost</Button>
        </div>
      </div>
    </div>
  )
};