import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, User, Funnel } from "@phosphor-icons/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atomics/Chip",
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          "Chip component matching CBDS Figma design specifications. A compact label for tags, filters, selected values, and dismissible metadata. Provide `onClick` to make it a toggle, and `dismissible` to reveal a trailing close button. Use Button for primary actions instead.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Chip label text",
    },
    type: {
      control: "select",
      options: ["brand", "neutral"],
      description: "Semantic color type",
    },
    variant: {
      control: "select",
      options: ["fill", "outline"],
      description: "Visual style: fill (tinted background) or outline (bordered)",
    },
    size: {
      control: "select",
      options: ["small", "large"],
      description: "Size: small (24px) or large (32px)",
    },
    round: {
      control: "boolean",
      description: "Pill-shaped corners",
    },
    selected: {
      control: "boolean",
      description: "Selected (toggled-on) state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state — suppresses all interaction",
    },
    dismissible: {
      control: "boolean",
      description: "Show the trailing dismiss (X) button",
    },
    icon: {
      control: false,
      description: "Leading Phosphor icon. Ignored when `avatar` is provided.",
    },
    avatar: {
      control: false,
      description: "Leading avatar node. Takes precedence over `icon`.",
    },
    onDismiss: { action: "dismissed" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// A deterministic stand-in for a real avatar image — keeps Chromatic snapshots
// stable, which a remote placeholder service would not.
const sampleAvatar = (
  <span
    aria-hidden="true"
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #0e61ba, #7cc7f2)",
    }}
  />
);

// Default: Brand / Fill / Small
export const Default: Story = {
  args: {
    label: "Label",
    type: "brand",
    variant: "fill",
    size: "small",
  },
};

// Type variants
export const Brand: Story = {
  args: { label: "Label", type: "brand", variant: "fill" },
};

export const Neutral: Story = {
  args: { label: "Label", type: "neutral", variant: "fill" },
};

// Style variants
export const BrandOutline: Story = {
  args: { label: "Label", type: "brand", variant: "outline" },
};

export const NeutralOutline: Story = {
  args: { label: "Label", type: "neutral", variant: "outline" },
};

// Sizes
export const Small: Story = {
  args: { label: "Label", size: "small" },
};

export const Large: Story = {
  args: { label: "Label", size: "large" },
};

// Shape
export const Round: Story = {
  args: { label: "Label", round: true },
};

// States
export const Selected: Story = {
  args: { label: "Label", selected: true, onClick: () => {} },
};

export const Disabled: Story = {
  args: { label: "Label", disabled: true },
};

// Composition
export const WithLeadingIcon: Story = {
  args: { label: "Label", icon: Tag },
};

export const WithAvatar: Story = {
  args: { label: "Label", size: "large", round: true, avatar: sampleAvatar },
};

export const Dismissible: Story = {
  args: { label: "Label", dismissible: true },
};

export const ClickableAndDismissible: Story = {
  args: {
    label: "Label",
    dismissible: true,
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "When a chip is both clickable and dismissible, the body and the close button render as two sibling buttons — a nested button would be invalid HTML.",
      },
    },
  },
};

export const FilterBar: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Chip label="All" type="brand" round selected onClick={() => {}} />
      <Chip label="Active" type="brand" round onClick={() => {}} />
      <Chip label="Archived" type="brand" round onClick={() => {}} />
      <Chip label="Draft" type="brand" round onClick={() => {}} disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chips used as a single-select filter bar.",
      },
    },
  },
};

// Full matrix
export const AllVariants: Story = {
  render: () => {
    const heading: React.CSSProperties = {
      marginBottom: "12px",
      fontSize: "16px",
      fontWeight: 600,
    };
    const row: React.CSSProperties = {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap",
    };

    const sections: Array<{
      title: string;
      props: Partial<React.ComponentProps<typeof Chip>>;
    }> = [
      { title: "Brand / Fill", props: { type: "brand", variant: "fill" } },
      { title: "Brand / Outline", props: { type: "brand", variant: "outline" } },
      { title: "Neutral / Fill", props: { type: "neutral", variant: "fill" } },
      {
        title: "Neutral / Outline",
        props: { type: "neutral", variant: "outline" },
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {sections.map(({ title, props }) => (
          <div key={title}>
            <h3 style={heading}>{title}</h3>
            <div style={row}>
              <Chip {...props} label="Default" />
              <Chip {...props} label="Selected" selected />
              <Chip {...props} label="Disabled" disabled />
              <Chip {...props} label="Round" round />
              <Chip {...props} label="Icon" icon={Funnel} />
              <Chip {...props} label="Dismiss" dismissible />
              <Chip {...props} label="Large" size="large" />
              <Chip {...props} label="Avatar" size="large" avatar={sampleAvatar} />
            </div>
          </div>
        ))}

        <div>
          <h3 style={heading}>Interactive (hover to see hover state)</h3>
          <div style={row}>
            <Chip label="Brand fill" type="brand" variant="fill" onClick={() => {}} />
            <Chip label="Brand outline" type="brand" variant="outline" onClick={() => {}} />
            <Chip label="Neutral fill" type="neutral" variant="fill" onClick={() => {}} />
            <Chip label="Neutral outline" type="neutral" variant="outline" onClick={() => {}} />
            <Chip label="With avatar" type="brand" variant="fill" icon={User} onClick={() => {}} />
          </div>
        </div>
      </div>
    );
  },
};
