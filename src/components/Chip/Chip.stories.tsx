import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Star, Bell, User, Gear } from '@phosphor-icons/react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    type: { control: 'select', options: ['brand', 'neutral'] },
    variant: { control: 'select', options: ['fill', 'outline'] },
    size: { control: 'select', options: ['small', 'large'] },
    iconLeft: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Label', type: 'brand', variant: 'fill', size: 'small' },
};

export const BrandFill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Default" type="brand" variant="fill" />
      <Chip label="Selected" type="brand" variant="fill" selected />
      <Chip label="Disabled" type="brand" variant="fill" disabled />
      <Chip label="Round" type="brand" variant="fill" round />
    </div>
  ),
};

export const BrandOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Default" type="brand" variant="outline" />
      <Chip label="Selected" type="brand" variant="outline" selected />
      <Chip label="Disabled" type="brand" variant="outline" disabled />
      <Chip label="Round" type="brand" variant="outline" round />
    </div>
  ),
};

export const NeutralFill: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Default" type="neutral" variant="fill" />
      <Chip label="Selected" type="neutral" variant="fill" selected />
      <Chip label="Disabled" type="neutral" variant="fill" disabled />
      <Chip label="Round" type="neutral" variant="fill" round />
    </div>
  ),
};

export const NeutralOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Default" type="neutral" variant="outline" />
      <Chip label="Selected" type="neutral" variant="outline" selected />
      <Chip label="Disabled" type="neutral" variant="outline" disabled />
      <Chip label="Round" type="neutral" variant="outline" round />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip label="Small" size="small" />
      <Chip label="Large" size="large" />
      <Chip label="Small Round" size="small" round />
      <Chip label="Large Round" size="large" round />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Star" iconLeft={Star} />
      <Chip label="Bell" iconLeft={Bell} type="neutral" />
      <Chip label="User" iconLeft={User} variant="outline" />
      <Chip label="Settings" iconLeft={Gear} type="neutral" variant="outline" />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Removable" dismissible onDismiss={() => alert('Dismissed!')} />
      <Chip label="With Icon" iconLeft={Star} dismissible />
      <Chip label="Outline" variant="outline" dismissible />
      <Chip label="Large" size="large" dismissible />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div>
        <h3 style={{ fontSize: '14px', color: 'var(--cbds-text-secondary)', marginBottom: '8px' }}>Brand Fill</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Chip label="Label" type="brand" variant="fill" />
          <Chip label="Label" type="brand" variant="fill" round />
          <Chip label="Label" type="brand" variant="fill" selected />
          <Chip label="Label" type="brand" variant="fill" selected round />
          <Chip label="Label" type="brand" variant="fill" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '14px', color: 'var(--cbds-text-secondary)', marginBottom: '8px' }}>Brand Outline</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Chip label="Label" type="brand" variant="outline" />
          <Chip label="Label" type="brand" variant="outline" round />
          <Chip label="Label" type="brand" variant="outline" selected />
          <Chip label="Label" type="brand" variant="outline" selected round />
          <Chip label="Label" type="brand" variant="outline" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '14px', color: 'var(--cbds-text-secondary)', marginBottom: '8px' }}>Neutral Fill</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Chip label="Label" type="neutral" variant="fill" />
          <Chip label="Label" type="neutral" variant="fill" round />
          <Chip label="Label" type="neutral" variant="fill" selected />
          <Chip label="Label" type="neutral" variant="fill" selected round />
          <Chip label="Label" type="neutral" variant="fill" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '14px', color: 'var(--cbds-text-secondary)', marginBottom: '8px' }}>Neutral Outline</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Chip label="Label" type="neutral" variant="outline" />
          <Chip label="Label" type="neutral" variant="outline" round />
          <Chip label="Label" type="neutral" variant="outline" selected />
          <Chip label="Label" type="neutral" variant="outline" selected round />
          <Chip label="Label" type="neutral" variant="outline" disabled />
        </div>
      </div>
    </div>
  ),
};
