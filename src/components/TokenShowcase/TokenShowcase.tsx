import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import styles from "./TokenShowcase.module.css";

export interface TokenShowcaseProps {
  className?: string;
}

/**
 * TokenShowcase component demonstrates all Tenet design tokens
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

  // Spacing values
  const spacingValues = [
    { name: '025', value: '0.125rem' },
    { name: '050', value: '0.25rem' },
    { name: '100', value: '0.5rem' },
    { name: '150', value: '0.75rem' },
    { name: '200', value: '1rem' },
    { name: '300', value: '1.5rem' },
    { name: '400', value: '2rem' },
    { name: '500', value: '2.5rem' },
    { name: '600', value: '3rem' },
    { name: '800', value: '4rem' },
    { name: '1000', value: '5rem' }
  ];

  // Typography examples
  const typographyExamples = [
    { name: 'Display Large', size: '4.5rem', weight: 'Bold', usage: 'Hero headings' },
    { name: 'Display Medium', size: '3.75rem', weight: 'Bold', usage: 'Page titles' },
    { name: 'Display Small', size: '3rem', weight: 'Bold', usage: 'Section titles' },
    { name: 'Heading 1', size: '2.25rem', weight: 'Bold', usage: 'Main headings' },
    { name: 'Heading 2', size: '2rem', weight: 'Semi Bold', usage: 'Sub headings' },
    { name: 'Heading 3', size: '1.75rem', weight: 'Semi Bold', usage: 'Sub sections' },
    { name: 'Heading 4', size: '1.5rem', weight: 'Semi Bold', usage: 'Component titles' },
    { name: 'Body Large', size: '1.125rem', weight: 'Regular', usage: 'Large body text' },
    { name: 'Body Medium', size: '1rem', weight: 'Regular', usage: 'Default body text' },
    { name: 'Body Small', size: '0.875rem', weight: 'Regular', usage: 'Secondary text' },
    { name: 'Caption', size: '0.75rem', weight: 'Regular', usage: 'Captions, labels' }
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
        <h1 className={styles.title}>Tenet Design Tokens</h1>
        <p className={styles.subtitle}>
          Complete showcase of the Tenet Design System tokens
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
                  const cssVar = `--tenet-${theme}-${palette.name.toLowerCase()}-${shade}`;
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
                style={{ height: `var(--tenet-spacing-${space.name})` }}
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
                {typo.name} • {typo.size} • {typo.weight}
              </div>
              <div 
                style={{ 
                  fontSize: typo.size,
                  fontWeight: typo.weight === 'Bold' ? 700 : typo.weight === 'Semi Bold' ? 600 : 400,
                  fontFamily: 'var(--tenet-font-families-inter)',
                  color: 'var(--tenet-text-primary)'
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--tenet-text-secondary)',
                marginTop: 'var(--tenet-spacing-050)'
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
                color: 'var(--tenet-text-secondary)',
                marginTop: 'var(--tenet-spacing-050)'
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
          marginTop: 'var(--tenet-spacing-200)',
          fontSize: '0.875rem',
          color: 'var(--tenet-text-secondary)'
        }}>
          Hover over buttons to see interactive states
        </p>
      </section>

      {/* Border Radius & Component Sizes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Radius & Sizes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--tenet-spacing-400)' }}>
          <div>
            <h3 style={{ color: 'var(--tenet-text-primary)', marginBottom: 'var(--tenet-spacing-200)' }}>
              Corner Radius
            </h3>
            <div style={{ display: 'grid', gap: 'var(--tenet-spacing-150)' }}>
              {['050', '100', '150', '200', '250', '300'].map((radius) => (
                <div key={radius} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--tenet-spacing-200)'
                }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'var(--tenet-bg-brand-default)',
                      borderRadius: `var(--tenet-corner-radius-${radius})`
                    }}
                  />
                  <span style={{ color: 'var(--tenet-text-secondary)' }}>
                    {radius} - {radius === '050' ? '0.25rem' : 
                              radius === '100' ? '0.5rem' :
                              radius === '150' ? '0.75rem' :
                              radius === '200' ? '1rem' :
                              radius === '250' ? '1.25rem' : '1.5rem'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--tenet-text-primary)', marginBottom: 'var(--tenet-spacing-200)' }}>
              Component Sizes
            </h3>
            <div style={{ display: 'grid', gap: 'var(--tenet-spacing-150)' }}>
              {[
                { name: 'xsmall', value: '1rem' },
                { name: 'small', value: '1.5rem' },
                { name: 'medium', value: '2rem' },
                { name: 'large', value: '2.5rem' },
                { name: 'xlarge', value: '3rem' }
              ].map((size) => (
                <div key={size.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--tenet-spacing-200)'
                }}>
                  <div
                    style={{
                      width: `var(--tenet-component-size-${size.name})`,
                      height: `var(--tenet-component-size-${size.name})`,
                      backgroundColor: 'var(--tenet-bg-positive-default)',
                      borderRadius: 'var(--tenet-corner-radius-050)'
                    }}
                  />
                  <span style={{ color: 'var(--tenet-text-secondary)' }}>
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