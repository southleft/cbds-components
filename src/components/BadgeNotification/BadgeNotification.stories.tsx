import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Envelope } from "@phosphor-icons/react";
import { BadgeNotification } from "./BadgeNotification";
import type {
  BadgeNotificationSize,
  BadgeNotificationStyle,
  BadgeNotificationType,
} from "./BadgeNotification";
import { Icon } from "../Icon/Icon";

const meta: Meta<typeof BadgeNotification> = {
  title: "Atomics/Badge Notification",
  component: BadgeNotification,
  parameters: {
    docs: {
      description: {
        component:
          "BadgeNotification component matching CBDS Figma design specifications. A compact count or status marker for a parent element — a nav item, a tab, an avatar, an icon button. Six semantic types, three styles, and four sizes; the two smallest sizes are bare dots. Position it against its parent and let the parent own the accessible name.",
      },
    },
  },
  argTypes: {
    count: { control: "text", description: "Count or short status value" },
    max: { control: "number", description: "Caps a numeric count — above it renders `{max}+`" },
    type: {
      control: "select",
      options: ["alert", "success", "brand", "neutral", "warning", "accent"],
      description: "Semantic color type",
    },
    variant: {
      control: "select",
      options: ["fill", "tonal", "outline"],
      description: "Visual style: fill (solid), tonal (weak tint) or outline (bordered)",
    },
    size: {
      control: "select",
      options: ["large", "medium", "small", "xsmall"],
      description: "large (24px) and medium (16px) carry a count; small (8px) and xsmall (4px) are dots",
    },
    label: { control: "text", description: "Accessible text when the badge stands alone" },
    live: { control: "boolean", description: "Announce label changes politely" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TYPES: BadgeNotificationType[] = [
  "alert",
  "success",
  "brand",
  "neutral",
  "warning",
  "accent",
];
const STYLES: BadgeNotificationStyle[] = ["fill", "tonal", "outline"];
const SIZES: BadgeNotificationSize[] = ["large", "medium", "small", "xsmall"];

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: 12,
  color: "var(--cbds-text-secondary, #55606f)",
  minWidth: 120,
};

/* ------------------------------------ *\
  #BASIC VARIANTS
\* ------------------------------------ */

export const Default: Story = {
  args: { count: 8, type: "alert", variant: "fill", size: "large" },
};

export const Tonal: Story = {
  args: { count: 8, type: "brand", variant: "tonal", size: "large" },
};

export const Outline: Story = {
  args: { count: 8, type: "success", variant: "outline", size: "large" },
};

export const Dot: Story = {
  name: "Dot (small)",
  args: { type: "alert", variant: "fill", size: "small" },
};

export const CappedCount: Story = {
  name: "Capped count",
  args: { count: 1240, max: 99, type: "alert", variant: "fill", size: "large" },
  parameters: {
    docs: {
      description: {
        story: "A numeric `count` above `max` renders as `99+` so the badge never grows unbounded.",
      },
    },
  },
};

/* ------------------------------------ *\
  #MATRIX
\* ------------------------------------ */

export const AllVariants: Story = {
  name: "All variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ ...labelStyle, fontSize: 13 }}>{size}</strong>
          {STYLES.map((variant) => (
            <div key={variant} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={labelStyle}>{variant}</span>
              {TYPES.map((type) => (
                <BadgeNotification
                  key={type}
                  type={type}
                  variant={variant}
                  size={size}
                  count={8}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ------------------------------------ *\
  #IN CONTEXT
\* ------------------------------------ */

export const OnIconButton: Story = {
  name: "On an icon button",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The button owns the accessible name (`aria-label=\"Notifications, 8 unread\"`), so the badge stays hidden from assistive technology.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <button
        type="button"
        aria-label="Notifications, 8 unread"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          padding: 0,
          border: "none",
          borderRadius: "var(--cbds-corner-radius-050, 4px)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <Icon icon={Bell} size="large" />
        <BadgeNotification
          count={8}
          size="medium"
          style={{ position: "absolute", top: 2, right: 2 }}
        />
      </button>

      <button
        type="button"
        aria-label="Inbox, unread messages"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          padding: 0,
          border: "none",
          borderRadius: "var(--cbds-corner-radius-050, 4px)",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <Icon icon={Envelope} size="large" />
        <BadgeNotification
          type="brand"
          size="small"
          style={{ position: "absolute", top: 6, right: 6 }}
        />
      </button>
    </div>
  ),
};

export const Standalone: Story = {
  name: "Standalone (labeled)",
  args: { count: 8, type: "alert", label: "8 unread messages", live: true },
  parameters: {
    docs: {
      description: {
        story:
          "With no parent to name it, `label` gives the badge its own accessible text and `live` announces updates politely.",
      },
    },
  },
};
