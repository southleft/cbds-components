import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarIndicator } from './AvatarIndicator';

const meta: Meta<typeof AvatarIndicator> = {
  title: 'Components/AvatarIndicator',
  component: AvatarIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['green', 'grey', 'red'],
      description: 'The color type of the indicator',
      table: {
        defaultValue: { summary: 'grey' },
      },
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: 'The size of the indicator',
      table: {
        defaultValue: { summary: 'small' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};

// Type variants
export const Green: Story = {
  args: {
    type: 'green',
  },
};

export const Grey: Story = {
  args: {
    type: 'grey',
  },
};

export const Red: Story = {
  args: {
    type: 'red',
  },
};

// Size variants
export const ExtraSmall: Story = {
  args: {
    size: 'xsmall',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xlarge',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* All sizes for each type */}
      {(['green', 'grey', 'red'] as const).map((type) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ width: '60px', fontSize: '14px', color: '#666' }}>{type}:</span>
          {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <AvatarIndicator type={type} size={size} />
              <span style={{ fontSize: '11px', color: '#999' }}>{size}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
