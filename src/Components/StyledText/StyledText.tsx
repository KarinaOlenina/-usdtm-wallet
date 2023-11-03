import { BoxProps, Text as ChakraText } from '@chakra-ui/react';
import React from 'react';

interface StyledTextProps extends BoxProps {
  text: string | number;
}

const StyledText: React.FC<StyledTextProps> = ({ text, ...rest }) => {
  return <ChakraText {...rest}>{text}</ChakraText>;
};

export default StyledText;
