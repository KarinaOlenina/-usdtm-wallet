import { Box, chakra, ChakraProvider, Grid, theme } from '@chakra-ui/react';
// eslint-disable-next-line no-restricted-imports
import { ethers, parseEther } from 'ethers';
import React, { useEffect, useState } from 'react';

import USDTM_ABI from '../src/abi/token-abi.json';
import Account from './Components/Account';
import Balance from './Components/Balance';
import ConnectWalletButton from './Components/ConnectWallet';
import Mint from './Components/Mint';
import SendTransactionModal from './Components/SendTransactionModal/SendTransactionModal';
import StyledText from './Components/StyledText/StyledText';
import { connectWallet } from './utils';

const AppWrapper = chakra(Box, {
  baseStyle: {
    background:
      'linear-gradient(180deg, rgba(63,81,184,0.896796218487395) 0%, rgba(194,79,182,0.8995973389355743) 100%)',
  },
});

const ModalWrapper = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    margin: 'auto',
    padding: '30px',
    width: '750px',
    height: '465px',
    background: 'white',
    borderRadius: '20px',
  },
});

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string>('TokenSymbol');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTransactionModalOpen, setTransactionModalOpen] =
    useState<boolean>(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnectWallet = (): void => {
    connectWallet(
      setAccount,
      setErrorMessage,
      setConnecting,
      changeAccountHandler
    );
  };

  const changeAccountHandler = (newAddress: any): void => {
    setAccount(newAddress);
    updateEthers();
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem('userAccount');
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, [account]);

  const updateEthers = async (): Promise<void> => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const tokenContractAddress =
      process.env.REACT_APP_DEV_TOKEN_CONTRACT_ADDRESS;

    let contract;

    if (tokenContractAddress) {
      contract = new ethers.Contract(tokenContractAddress, USDTM_ABI, signer);
      setContract(contract);
    } else {
      setErrorMessage('😥 The contract address was not found ');
    }
  };

  const updateBalance = async (): Promise<void> => {
    const balanceBigN = await contract?.balanceOf(account);
    setBalance(Number(ethers.formatEther(balanceBigN)));
  };

  const updateTokenSymbol = async (): Promise<void> => {
    setTokenSymbol(await contract?.symbol());
  };

  useEffect(() => {
    if (contract != null) {
      updateBalance();
      updateTokenSymbol();
    }
  }, [contract]);

  const handleMint = async (mintAmount: string): Promise<void> => {
    if (+mintAmount === 0) {
      setErrorMessage('😐 Please enter the desired amount');
      return;
    } else {
      setErrorMessage(null);
    }

    try {
      setTransactionModalOpen(true);
      const tx = await contract?.mint(account, parseEther(mintAmount));
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        setErrorMessage('😢 The transaction was canceled by the user');
      } else {
        setErrorMessage(null);
        await updateBalance();
      }
    } catch (error) {
      setErrorMessage('😢 An error occurred while sending the transaction');
    } finally {
      setTransactionModalOpen(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <AppWrapper textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          {!account ? (
            <ModalWrapper justifyContent={'center'} alignItems={'center'}>
              <ConnectWalletButton onConnectClick={handleConnectWallet} />
              {connecting && (
                <StyledText
                  height={'20px'}
                  color={'gray.300'}
                  fontSize={'14px'}
                  text={'Confirm connection in MetaMask...'}
                />
              )}
              {errorMessage && (
                <StyledText
                  height={'20px'}
                  color={'red.300'}
                  fontSize={'14px'}
                  text={errorMessage}
                />
              )}
            </ModalWrapper>
          ) : (
            <ModalWrapper>
              <Account account={account} />
              <Balance balance={balance} symbol={tokenSymbol} />
              {errorMessage ? (
                <StyledText
                  height="20px"
                  color="red.300"
                  fontSize="14px"
                  text={errorMessage}
                />
              ) : (
                <StyledText height={'20px'} fontSize={'14px'} text={''} />
              )}
              <Mint onMintClick={handleMint} />
            </ModalWrapper>
          )}
        </Grid>
        <SendTransactionModal
          isOpen={isTransactionModalOpen}
          onClose={() => setTransactionModalOpen(false)}
        />
      </AppWrapper>
    </ChakraProvider>
  );
};

export default App;
