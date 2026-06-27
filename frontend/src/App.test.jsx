import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';

describe('App', () => {
  it('renders the app shell markup', () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain('Release checklist');
  });
});
