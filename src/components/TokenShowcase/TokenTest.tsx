import React from "react";

/**
 * Simple test component to verify tokens are properly loaded
 */
export const TokenTest: React.FC = () => {
  return (
    <div style={{
      padding: 'var(--cbds-spacing-400)',
      backgroundColor: 'var(--cbds-bg-surface-primary)',
      color: 'var(--cbds-text-primary)',
      fontFamily: 'var(--cbds-font-family-primary)',
      borderRadius: 'var(--cbds-corner-radius-100)',
      border: '1px solid var(--cbds-border-secondary)'
    }}>
      <h2 style={{ color: 'var(--cbds-text-brand-default)' }}>
        Token Integration Test
      </h2>
      <p>If you can see styled content here, the tokens are working!</p>
      <div style={{
        display: 'flex',
        gap: 'var(--cbds-spacing-200)',
        marginTop: 'var(--cbds-spacing-200)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--cbds-bg-brand-default)',
          borderRadius: 'var(--cbds-corner-radius-100)'
        }} />
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--cbds-bg-positive-default)',
          borderRadius: 'var(--cbds-corner-radius-100)'
        }} />
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--cbds-bg-danger-default)',
          borderRadius: 'var(--cbds-corner-radius-100)'
        }} />
      </div>
    </div>
  );
};