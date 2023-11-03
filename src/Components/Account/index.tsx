import { Box, chakra, Text } from '@chakra-ui/react';
import React from 'react';

const Circle = chakra(Box, {
  baseStyle: {
    width: '30px',
    height: '30px',
    backgroundColor: 'gray.300',
    borderRadius: '50%',
    marginRight: '4px',
  },
});

const AccountAddress = chakra(Text, {
  baseStyle: {
    color: 'gray.300',
    marginLeft: '10px',
    fontWeight: 300,
  },
});

interface AccountProps {
  account: any;
}

function shortenAddress(address: string, chars = 6): string {
  if (!address) return '';
  const start = address.substring(0, chars);
  const end = address.substring(address.length - chars);
  return `${start}...${end}`;
}

const Account: React.FC<AccountProps> = ({ account }) => {
  const shortenedAccount = shortenAddress(account);
  return (
    <Box display="flex" alignItems="center">
      <Circle />
      <AccountAddress>{shortenedAccount}</AccountAddress>
    </Box>
  );
};

export default Account;
