import { Box, chakra, Text } from '@chakra-ui/react';
import React from 'react';
import StyledText from '../StyledText/StyledText';

interface BalanceProps {
  balance: number;
  symbol: string;
}

const StyledBalanceContainer = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'start',
    padding: '20px',
    border: '1px solid #ececec',
    borderRadius: '10px',
    height: '200px',
    marginTop: '30px',
  },
});

const StyledBalance = chakra(Text, {
  baseStyle: {
    color: '#C24FB6',
    fontSize: 'xx-large',
    fontWeight: 700,
  },
});

const StyledBalanceAmmount = chakra(Box, {
  baseStyle: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
});

const Balance: React.FC<BalanceProps> = ({ balance, symbol }) => {
  return (
    <StyledBalanceContainer>
      <StyledBalance>Balance</StyledBalance>
      <StyledBalanceAmmount>
        <StyledText color={'gray.300'} text={symbol} />
        <StyledText text={balance} />
      </StyledBalanceAmmount>
    </StyledBalanceContainer>
  );
};

export default Balance;
