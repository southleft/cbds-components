import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import styles from "./TokenShowcase.module.css";

export interface TokenShowcaseProps {
  className?: string;
}

/**
 * TokenShowcase component demonstrates all CBDS design tokens
 * Shows colors, spacing, typography, elevations, and theme switching
 */
export const TokenShowcase: React.FC<TokenShowcaseProps> = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Set theme on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Color palettes data
  const colorPalettes = [
    {
      name: 'Grey',
      colors: ['100', '150', '200', '300', '400', '450', '500', '600', '700', '800', '900', '1000']
    },
    {
      name: 'Blue',
      colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    },
    {
      name: 'Green',
      colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    },
    {
      name: 'Red',
      colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    },
    {
      name: 'Yellow',
      colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    },
    {
      name: 'Indigo',
      colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
    }
  ];

  // Spacing values — matches Figma number primitive collection
  const spacingValues = [
    { name: '025', value: '2px' },
    { name: '050', value: '4px' },
    { name: '100', value: '8px' },
    { name: '150', value: '12px' },
    { name: '200', value: '16px' },
    { name: '300', value: '24px' },
    { name: '400', value: '32px' },
    { name: '500', value: '40px' },
    { name: '600', value: '48px' },
    { name: '800', value: '64px' },
    { name: '1000', value: '80px' },
    { name: '1200', value: '96px' },
    { name: '1600', value: '128px' },
    { name: '2000', value: '160px' }
  ];

  // Typography examples — uses actual CBDS semantic tokens from Figma
  const typographyExamples = [
    { name: 'Display XLarge', cssVar: '--cbds-display-font-xlarge', lineHeight: '--cbds-display-line-height-xlarge', weight: 'Bold', usage: 'Hero headings' },
    { name: 'Display Large', cssVar: '--cbds-display-font-large', lineHeight: '--cbds-display-line-height-large', weight: 'Bold', usage: 'Page titles' },
    { name: 'Display Medium', cssVar: '--cbds-display-font-medium', lineHeight: '--cbds-display-line-height-medium', weight: 'Bold', usage: 'Major sections' },
    { name: 'Display Small', cssVar: '--cbds-display-font-small', lineHeight: '--cbds-display-line-height-small', weight: 'Bold', usage: 'Section titles' },
    { name: 'Heading XLarge', cssVar: '--cbds-heading-font-xlarge', lineHeight: '--cbds-heading-line-height-xlarge', weight: 'Semi Bold', usage: 'Main headings' },
    { name: 'Heading Large', cssVar: '--cbds-heading-font-large', lineHeight: '--cbds-heading-line-height-large', weight: 'Semi Bold', usage: 'Sub headings' },
    { name: 'Heading Medium', cssVar: '--cbds-heading-font-medium', lineHeight: '--cbds-heading-line-height-medium', weight: 'Semi Bold', usage: 'Sub sections' },
    { name: 'Heading Small', cssVar: '--cbds-heading-font-small', lineHeight: '--cbds-heading-line-height-small', weight: 'Semi Bold', usage: 'Component titles' },
    { name: 'Body XLarge', cssVar: '--cbds-body-font-xlarge', lineHeight: '--cbds-body-line-height-xlarge', weight: 'Regular', usage: 'Large body text' },
    { name: 'Body Large', cssVar: '--cbds-body-font-large', lineHeight: '--cbds-body-line-height-large', weight: 'Regular', usage: 'Default body text' },
    { name: 'Body Medium', cssVar: '--cbds-body-font-medium', lineHeight: '--cbds-body-line-height-medium', weight: 'Regular', usage: 'Secondary text' },
    { name: 'Body Small', cssVar: '--cbds-body-font-small', lineHeight: '--cbds-body-line-height-small', weight: 'Regular', usage: 'Small text' },
    { name: 'Body XSmall', cssVar: '--cbds-body-font-xsmall', lineHeight: '--cbds-body-line-height-small', weight: 'Regular', usage: 'Captions, labels' },
  ];

  // Semantic color examples
  const semanticColors = [
    { name: 'brand', label: 'Brand' },
    { name: 'positive', label: 'Success' },
    { name: 'danger', label: 'Error' },
    { name: 'warning', label: 'Warning' },
    { name: 'neutral', label: 'Neutral' },
    { name: 'accent', label: 'Accent' },
    { name: 'info', label: 'Info' }
  ];

  // Elevation examples
  const elevations = [
    { name: 'small', label: 'Small', description: 'Cards, buttons' },
    { name: 'medium', label: 'Medium', description: 'Dropdowns, tooltips' },
    { name: 'large', label: 'Large', description: 'Modals, overlays' },
    { name: 'xlarge', label: 'X-Large', description: 'Floating panels' }
  ];

  return (
    <div className={clsx(styles.root, className)}>
      <header className={styles.header}>
        <h1 className={styles.title}>CBDS Design Tokens</h1>
        <p className={styles.subtitle}>
          Complete showcase of the CBDS Design System tokens
        </p>
        <button 
          className={styles.themeToggle} 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </header>

      {/* Semantic Colors */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Semantic Colors</h2>
        <div className={styles.semanticColors}>
          {semanticColors.map(({ name, label }) => (
            <div key={name} className={styles.semanticColor}>
              <div 
                className={clsx(
                  styles.semanticSwatch,
                  styles[`bg${name.charAt(0).toUpperCase()}${name.slice(1)}Default`]
                )}
              />
              <div className={styles.semanticLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Color Palettes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Color Palettes</h2>
        <div className={styles.colorsGrid}>
          {colorPalettes.map((palette) => (
            <div key={palette.name} className={styles.colorPalette}>
              <h3 className={styles.paletteTitle}>{palette.name}</h3>
              <div className={styles.colorSwatches}>
                {palette.colors.map((shade) => {
                  const cssVar = `--cbds-${theme}-${palette.name.toLowerCase()}-${shade}`;
                  return (
                    <div
                      key={shade}
                      className={styles.colorSwatch}
                      style={{ backgroundColor: `var(${cssVar})` }}
                    >
                      <div className={styles.colorInfo}>
                        {palette.name} {shade}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>
        <div className={styles.spacingGrid}>
          {spacingValues.map((space) => (
            <div key={space.name} className={styles.spacingBox}>
              <div className={styles.spacingLabel}>
                {space.name} ({space.value})
              </div>
              <div 
                className={styles.spacingDemo}
                style={{ height: `var(--cbds-spacing-${space.name})` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.typographyGrid}>
          {typographyExamples.map((typo, index) => (
            <div key={index} className={styles.typographyExample}>
              <div className={styles.typographyLabel}>
                {typo.name} • {typo.cssVar} • {typo.weight}
              </div>
              <div
                style={{
                  fontSize: `var(${typo.cssVar})`,
                  lineHeight: `calc(var(${typo.lineHeight}) * 1px)`,
                  fontWeight: typo.weight === 'Bold' ? 'var(--cbds-font-weight-bold)' : typo.weight === 'Semi Bold' ? 'var(--cbds-font-weight-semibold)' : 'var(--cbds-font-weight-regular)',
                  fontFamily: 'var(--cbds-font-family-primary)',
                  color: 'var(--cbds-text-primary)'
                } as React.CSSProperties}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--cbds-text-secondary)',
                marginTop: 'var(--cbds-spacing-050)'
              }}>
                {typo.usage}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Elevation</h2>
        <div className={styles.elevationGrid}>
          {elevations.map((elevation) => (
            <div 
              key={elevation.name}
              className={clsx(styles.elevationCard, styles[`elevation${elevation.label.replace(' ', '').replace('-', '')}`])}
            >
              <div className={styles.elevationLabel}>
                {elevation.name.toUpperCase()}
              </div>
              <div className={styles.elevationTitle}>
                {elevation.label}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--cbds-text-secondary)',
                marginTop: 'var(--cbds-spacing-050)'
              }}>
                {elevation.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive States */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Interactive States</h2>
        <div className={styles.interactiveDemo}>
          <button className={clsx(styles.interactiveButton, styles.interactiveBrand)}>
            Brand Button
          </button>
          <button className={clsx(styles.interactiveButton, styles.interactivePositive)}>
            Success Button
          </button>
          <button className={clsx(styles.interactiveButton, styles.interactiveDanger)}>
            Danger Button
          </button>
          <button className={clsx(styles.interactiveButton, styles.interactiveWarning)}>
            Warning Button
          </button>
        </div>
        <p style={{ 
          marginTop: 'var(--cbds-spacing-200)',
          fontSize: '0.875rem',
          color: 'var(--cbds-text-secondary)'
        }}>
          Hover over buttons to see interactive states
        </p>
      </section>

      {/* Border Radius & Component Sizes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Radius & Sizes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--cbds-spacing-400)' }}>
          <div>
            <h3 style={{ color: 'var(--cbds-text-primary)', marginBottom: 'var(--cbds-spacing-200)' }}>
              Corner Radius
            </h3>
            <div style={{ display: 'grid', gap: 'var(--cbds-spacing-150)' }}>
              {[
                { token: '050', px: '4px' },
                { token: '100', px: '8px' },
                { token: '150', px: '12px' },
                { token: '200', px: '16px' },
                { token: '250', px: '20px' },
                { token: '300', px: '24px' },
                { token: '1200', px: '96px' },
              ].map(({ token, px }) => (
                <div key={token} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--cbds-spacing-200)'
                }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'var(--cbds-bg-brand-default)',
                      borderRadius: `var(--cbds-corner-radius-${token})`
                    }}
                  />
                  <span style={{ color: 'var(--cbds-text-secondary)' }}>
                    {token} — {px}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--cbds-text-primary)', marginBottom: 'var(--cbds-spacing-200)' }}>
              Component Sizes
            </h3>
            <div style={{ display: 'grid', gap: 'var(--cbds-spacing-150)' }}>
              {[
                { name: 'xsmall', value: '16px' },
                { name: 'small', value: '24px' },
                { name: 'medium', value: '32px' },
                { name: 'large', value: '40px' },
                { name: 'xlarge', value: '48px' }
              ].map((size) => (
                <div key={size.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--cbds-spacing-200)'
                }}>
                  <div
                    style={{
                      width: `var(--cbds-component-size-${size.name})`,
                      height: `var(--cbds-component-size-${size.name})`,
                      backgroundColor: 'var(--cbds-bg-positive-default)',
                      borderRadius: 'var(--cbds-corner-radius-050)'
                    }}
                  />
                  <span style={{ color: 'var(--cbds-text-secondary)' }}>
                    {size.name} - {size.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenShowcase;