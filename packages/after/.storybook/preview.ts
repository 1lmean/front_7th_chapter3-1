import type { Preview } from '@storybook/react-vite'
import '../src/index.css' // Tailwind CSS 및 디자인 토큰 로드

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'oklch(1 0 0)' },
        { name: 'dark', value: 'oklch(0.129 0.042 264.695)' },
        { name: 'muted', value: 'oklch(0.968 0.007 247.896)' },
      ],
    },
  },
  // 다크모드 토글을 위한 데코레이터
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      return Story();
    },
  ],
  globalTypes: {
    theme: {
      description: '테마 전환',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;