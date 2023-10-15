import React from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { Home } from './pages';

export default function App() {
  return (
    <NextUIProvider>
      <Home />
    </NextUIProvider>
  );
}


