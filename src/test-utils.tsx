import { ChakraProvider, theme } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import * as React from 'react';

const AllProviders = ({
  children,
}: {
  children?: React.ReactNode;
}): React.JSX.Element => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions): any =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
