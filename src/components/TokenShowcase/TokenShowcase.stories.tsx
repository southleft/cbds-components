import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenShowcase } from "./TokenShowcase";
import { TokenTest } from "./TokenTest";

const meta: Meta<typeof TokenShowcase> = {
  title: "Design System/Token Showcase",
  component: TokenShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The TokenShowcase component provides a comprehensive demonstration of all CBDS design tokens including:

- **Semantic Colors**: Brand, success, error, warning, neutral, accent, and info colors
- **Color Palettes**: Full primitive color scales for grey, blue, green, red, yellow, and indigo
- **Spacing Scale**: Complete spacing system from 0.125rem to 10rem  
- **Typography**: Font sizes, weights, and usage guidelines
- **Elevation**: Shadow styles for different UI layers
- **Interactive States**: Hover and focus states for buttons
- **Border Radius**: Corner radius scale for components
- **Component Sizes**: Standard component sizing scale
- **Theme Switching**: Toggle between light and dark themes

This component serves as both a design reference and integration verification tool.
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fcfeff' },
        { name: 'dark', value: '#0f1219' },
      ],
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete showcase of all CBDS design tokens with interactive theme switching.
 * This story demonstrates the design system's tokens in action and verifies 
 * that the CSS custom properties are properly loaded and working.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
The default TokenShowcase displays all design tokens with automatic theme detection 
based on system preferences. Click the theme toggle button to switch between light 
and dark modes and see how all tokens adapt seamlessly.

**Features:**
- Automatic system theme detection
- Interactive theme switching
- Hover effects on color swatches and buttons  
- Complete token coverage
- Responsive grid layout
        `,
      },
    },
  },
};

/**
 * TokenShowcase with custom styling to demonstrate extensibility
 */
export const WithCustomStyling: Story = {
  args: {
    className: "custom-showcase-styling",
  },
  parameters: {
    docs: {
      description: {
        story: `
This story shows how the TokenShowcase can be extended with custom styling
while maintaining full token integration.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <style>
          {`
            .custom-showcase-styling {
              border: 2px solid var(--cbds-border-brand-default);
              border-radius: var(--cbds-corner-radius-200);
              background: linear-gradient(
                135deg, 
                var(--cbds-bg-brand-weakest) 0%, 
                var(--cbds-bg-surface-primary) 100%
              );
            }
          `}
        </style>
        <Story />
      </div>
    ),
  ],
};

/**
 * TokenShowcase in a constrained container to show responsive behavior
 */
export const Responsive: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates how the TokenShowcase adapts to different container sizes
with responsive grid layouts that maintain readability and usability.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        border: '1px solid var(--cbds-border-secondary)',
        borderRadius: 'var(--cbds-corner-radius-100)'
      }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Quick verification that tokens are loaded
 */
export const TokenVerification: StoryObj = {
  render: () => <TokenTest />,
  parameters: {
    docs: {
      description: {
        story: `
Simple test component to verify that the design tokens are properly loaded and accessible.
If this renders with proper styling (colors, spacing, typography), the token integration is working.
        `,
      },
    },
  },
};