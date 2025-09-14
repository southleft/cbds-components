import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming';

const lightTheme = create({
  base: 'light',
  brandTitle: 'CBDS Components',
  brandUrl: '/',
  brandImage: '/cbds-dark.svg',
  brandTarget: '_self',
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'CBDS Components',
  brandUrl: '/',
  brandImage: '/cbds-light.svg',
  brandTarget: '_self',
});

// Set initial theme
addons.setConfig({
  theme: darkTheme,
});

// Listen for theme changes from the toolbar
let currentTheme = 'light';

const channel = addons.getChannel();
channel.on('globalsUpdated', ({ globals }) => {
  if (globals.theme && globals.theme !== currentTheme) {
    currentTheme = globals.theme;
    addons.setConfig({
      theme: currentTheme === 'dark' ? darkTheme : lightTheme,
    });
  }
});
