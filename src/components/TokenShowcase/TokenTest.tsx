import React from "react";

/**
 * Simple test component to verify tokens are properly loaded
 */
export const TokenTest: React.FC = () => {
  return (
    <div style={{
      padding: 'var(--tenet-spacing-400)',
      backgroundColor: 'var(--tenet-bg-surface-primary)',
      color: 'var(--tenet-text-primary)',
      fontFamily: 'var(--tenet-font-families-inter)',
      borderRadius: 'var(--tenet-corner-radius-100)',
      border: '1px solid var(--tenet-border-secondary)'
    }}>
      <h2 style={{ color: 'var(--tenet-text-brand-default)' }}>
        Token Integration Test
      </h2>
      <p>If you can see styled content here, the tokens are working!</p>
      <div style={{
        display: 'flex',
        gap: 'var(--tenet-spacing-200)',
        marginTop: 'var(--tenet-spacing-200)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--tenet-bg-brand-default)',
          borderRadius: 'var(--tenet-corner-radius-100)'
        }} />
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--tenet-bg-positive-default)',
          borderRadius: 'var(--tenet-corner-radius-100)'
        }} />
        <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--tenet-bg-danger-default)',
          borderRadius: 'var(--tenet-corner-radius-100)'
        }} />
      </div>
    </div>
  );
};