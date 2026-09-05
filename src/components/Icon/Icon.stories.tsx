import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import {
  House,
  MagnifyingGlass,
  Gear,
  User,
  Bell,
  Heart,
  Star,
  WarningCircle,
  CheckCircle,
  XCircle,
  Info,
  CaretDown,
  CaretUp,
  CaretRight,
  ArrowRight,
  Plus,
  Minus,
  X,
  Trash,
  PencilSimple,
  Eye,
  EyeSlash,
  Copy,
  Download,
  Upload,
  FunnelSimple,
  SortAscending,
  DotsThreeVertical,
} from '@phosphor-icons/react';

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
CBDS Icon component wrapping [Phosphor Icons](https://phosphoricons.com/) — the same icon set used in the CBDS Figma UI Kit.

**Usage:**
\`\`\`tsx
import { Icon } from '../components/Icon';
import { House } from '@phosphor-icons/react';

<Icon icon={House} size="medium" weight="regular" />
\`\`\`

**Sizes** map to CBDS icon-size tokens: xsmall (12px), small (16px), medium (20px), large (24px), xlarge (32px), 2xlarge (48px).

**Weights** control the visual style: \`regular\` for outline, \`fill\` for solid, plus \`bold\`, \`light\`, \`thin\`, and \`duotone\`.

Browse all 1,500+ icons at [phosphoricons.com](https://phosphoricons.com/).
        `,
      },
    },
  },
  argTypes: {
    icon: { table: { disable: true } },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'fill', 'bold', 'light', 'thin', 'duotone'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: House,
    size: 'medium',
    weight: 'regular',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {(['xsmall', 'small', 'medium', 'large', 'xlarge', '2xlarge'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Icon icon={Star} size={size} />
          <div style={{ fontSize: '11px', color: 'var(--cbds-text-secondary)', marginTop: '4px' }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      {(['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const).map((weight) => (
        <div key={weight} style={{ textAlign: 'center' }}>
          <Icon icon={Heart} size="xlarge" weight={weight} />
          <div style={{ fontSize: '11px', color: 'var(--cbds-text-secondary)', marginTop: '4px' }}>{weight}</div>
        </div>
      ))}
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => {
    const icons = [
      { component: House, label: 'House' },
      { component: MagnifyingGlass, label: 'MagnifyingGlass' },
      { component: Gear, label: 'Gear' },
      { component: User, label: 'User' },
      { component: Bell, label: 'Bell' },
      { component: Heart, label: 'Heart' },
      { component: Star, label: 'Star' },
      { component: Plus, label: 'Plus' },
      { component: Minus, label: 'Minus' },
      { component: X, label: 'X' },
      { component: CaretDown, label: 'CaretDown' },
      { component: CaretUp, label: 'CaretUp' },
      { component: CaretRight, label: 'CaretRight' },
      { component: ArrowRight, label: 'ArrowRight' },
      { component: PencilSimple, label: 'PencilSimple' },
      { component: Trash, label: 'Trash' },
      { component: Eye, label: 'Eye' },
      { component: EyeSlash, label: 'EyeSlash' },
      { component: Copy, label: 'Copy' },
      { component: Download, label: 'Download' },
      { component: Upload, label: 'Upload' },
      { component: FunnelSimple, label: 'FunnelSimple' },
      { component: SortAscending, label: 'SortAscending' },
      { component: DotsThreeVertical, label: 'DotsThreeVertical' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px' }}>
        {icons.map(({ component, label }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px', borderRadius: '8px', border: '1px solid var(--cbds-border-secondary)' }}>
            <Icon icon={component} size="large" />
            <span style={{ fontSize: '10px', color: 'var(--cbds-text-secondary)', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>
    );
  },
};

export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Icon icon={CheckCircle} size="large" weight="fill" color="var(--cbds-icon-positive-default)" />
      <Icon icon={WarningCircle} size="large" weight="fill" color="var(--cbds-icon-warning-default)" />
      <Icon icon={XCircle} size="large" weight="fill" color="var(--cbds-icon-danger-default)" />
      <Icon icon={Info} size="large" weight="fill" color="var(--cbds-icon-info-default)" />
    </div>
  ),
};
