import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarType, ProgressBarSize } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Atomics/Progress Bar",
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          "ProgressBar component matching CBDS Figma design specifications. Supports three sizes, three semantic types (brand/success/error), and optional label, value, and supporting text rows. At 100%, success and error types swap the value text for a CheckCircle / WarningCircle icon.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (0–max)",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    type: {
      control: "select",
      options: ["brand", "success", "error"],
      description: "Semantic color type",
    },
    size: {
      control: "radio",
      options: ["large", "medium", "small"],
      description: "Track height variant",
    },
    label: { control: "text", description: "Label above the bar" },
    showValue: { control: "boolean", description: "Show value/percentage" },
    supportingText: { control: "text", description: "Supporting text below the bar" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const wrapperStyle: React.CSSProperties = {
  width: 320,
  fontFamily: "Inter, system-ui, sans-serif",
};

/* ------------------------------------ *\
  #BASIC VARIANTS
\* ------------------------------------ */

export const Default: Story = {
  args: {
    value: 25,
    label: "Label",
    supportingText: "Supporting text",
    type: "brand",
    size: "large",
  },
  render: (args) => (
    <div style={wrapperStyle}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: { value: 50, label: "Label", supportingText: "Supporting text", size: "medium" },
  render: Default.render,
};

export const Small: Story = {
  args: { value: 75, label: "Label", supportingText: "Supporting text", size: "small" },
  render: Default.render,
};

export const SuccessComplete: Story = {
  name: "Success (100%)",
  args: { value: 100, label: "Label", supportingText: "Supporting text", type: "success" },
  render: Default.render,
};

export const ErrorComplete: Story = {
  name: "Error (100%)",
  args: { value: 100, label: "Label", supportingText: "Supporting text", type: "error" },
  render: Default.render,
};

export const NoLabel: Story = {
  args: { value: 60, showValue: false, "aria-label": "Upload progress" },
  render: Default.render,
};

export const CustomValueFormat: Story = {
  args: {
    value: 3,
    max: 7,
    label: "Steps complete",
    formatValue: (v, max) => `${v} / ${max}`,
  },
  render: Default.render,
};

/* ------------------------------------ *\
  #ALL VARIANTS SHOWCASE
\* ------------------------------------ */

const progressValues = [25, 50, 75, 100];
const sizes: ProgressBarSize[] = ["large", "medium", "small"];

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        fontFamily: "Inter, system-ui, sans-serif",
        maxWidth: 1100,
      }}
    >
      {/* Brand × all sizes × all progress values */}
      <section>
        <h3 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Brand</h3>
        <div style={{ display: "grid", gridTemplateColumns: "100px repeat(4, 1fr)", gap: "20px 24px", alignItems: "center" }}>
          <span />
          {progressValues.map((p) => (
            <span key={p} style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)" }}>{p}%</span>
          ))}
          {sizes.map((s) => (
            <Row key={s} size={s} type="brand" />
          ))}
        </div>
      </section>

      {/* Success and Error — only meaningful at 100% per Figma */}
      <section>
        <h3 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Success (100%)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "100px repeat(3, 1fr)", gap: "20px 24px", alignItems: "center" }}>
          <span />
          {sizes.map((s) => (
            <span key={s} style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)", textTransform: "capitalize" }}>{s}</span>
          ))}
          <span style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)" }}>Complete</span>
          {sizes.map((s) => (
            <ProgressBar key={s} value={100} type="success" size={s} label="Label" supportingText="Supporting text" />
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Error (100%)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "100px repeat(3, 1fr)", gap: "20px 24px", alignItems: "center" }}>
          <span />
          {sizes.map((s) => (
            <span key={s} style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)", textTransform: "capitalize" }}>{s}</span>
          ))}
          <span style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)" }}>Complete</span>
          {sizes.map((s) => (
            <ProgressBar key={s} value={100} type="error" size={s} label="Label" supportingText="Supporting text" />
          ))}
        </div>
      </section>
    </div>
  ),
};

function Row({ size, type }: { size: ProgressBarSize; type: ProgressBarType }) {
  return (
    <>
      <span style={{ fontSize: 12, color: "var(--cbds-text-secondary, #738094)", textTransform: "capitalize" }}>{size}</span>
      {progressValues.map((p) => (
        <ProgressBar
          key={p}
          value={p}
          type={type}
          size={size}
          label="Label"
          supportingText="Supporting text"
        />
      ))}
    </>
  );
}
