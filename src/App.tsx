import React, {useEffect, useState} from "react";
import {ChakraProvider, Box, Grid, theme, chakra, Text} from "@chakra-ui/react";
import ConnectWalletButton from "./Components/ConnectWallet";
import Account from "./Components/Account";
import Balance from "./Components/Balance";
import Mint from "./Components/Mint";
import {ethers, JsonRpcSigner, parseEther} from "ethers";
import USDTM_ABI from '../src/abi/token-abi.json';
import SendTransactionModal from "./Components/SendTransactionModal/SendTransactionModal";


const AppWrapper = chakra(Box, {
  baseStyle: {
    background: 'linear-gradient(180deg, rgba(63,81,184,0.896796218487395) 0%, rgba(194,79,182,0.8995973389355743) 100%)',
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
  const [account, setAccount] = useState<JsonRpcSigner | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [contract, setContract] = useState< ethers.Contract | null>(null);
  const [signer, setSigner] = useState< ethers.JsonRpcSigner | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string>("TokenSymbol");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState<boolean>(false);
  const [connecting, setConnecting] = useState(false);

  const connectWalletHandler = async () => {
    setConnecting(true);
    if ((window as any).ethereum && (window as any).ethereum.isMetaMask) {
      try {
        setErrorMessage(null);
        const addressArray = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const newAddress = addressArray[0];
        localStorage.setItem("userAccount", newAddress);
        changeAccountHandler(newAddress);

        (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            changeAccountHandler(null);
            localStorage.removeItem("userAccount");
          }
        });
      } catch (err: any) {
        setErrorMessage("😥 " + err.message);
      } finally {
        setConnecting(false);
      }
    } else {
      setErrorMessage(" You must install MetaMask, a virtual Ethereum wallet, in your browser 🦊.");
    }
  };

  (window as any).ethereum.on("disconnect", (error: any) => {
    changeAccountHandler(null);
    localStorage.removeItem("userAccount");
  });

  const changeAccountHandler = (newAddress: any) => {
    setAccount(newAddress);
    updateEthers();
  };

  const updateEthers = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const tokenContractAddress = process.env.REACT_APP_DEV_TOKEN_CONTRACT_ADDRESS;

    let contract;

    if (tokenContractAddress) {
      contract = new ethers.Contract(tokenContractAddress, USDTM_ABI, signer);
      setContract(contract);
    } else {
      setErrorMessage("😥 The contract address was not found ")
    }

    setSigner(signer);
  }


  useEffect(() => {
    if (contract != null) {
      updateBalance();
      updateTokenSymbol();
    }
  }, [contract]);


  const updateBalance = async () => {
    let balanceBigN = await contract?.balanceOf(account);
    setBalance(Number(ethers.formatEther(balanceBigN)));
  };

  const updateTokenSymbol = async () => {
    setTokenSymbol(await contract?.symbol())
  };

  const handleMint = async (mintAmount: string) => {
    if (+mintAmount === 0) {
      setErrorMessage("😐 Please enter the desired amount");
      return;
    } else {
      setErrorMessage(null);
    }

    try {
      setTransactionModalOpen(true);
      const tx = await contract?.mint(account, parseEther(mintAmount));
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        setErrorMessage("😢 The transaction was canceled by the user");
      } else {
        setErrorMessage(null);
        updateBalance();
      }
    } catch (error) {
      setErrorMessage("😢 An error occurred while sending the transaction");
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
                      <ConnectWalletButton onConnectClick={connectWalletHandler} />
                      {connecting && (
                              <Text height={'20px'} color={"gray.300"} fontSize={'14px'}>Confirm connection in MetaMask...</Text>
                          )}
                      {errorMessage && (
                              <Text height={'20px'} color={"red.300"} fontSize={'14px'}>{errorMessage}</Text>
                          )}
                    </ModalWrapper>
            ) : (
                <ModalWrapper>
                  <Account account={account} />
                  <Balance balance={balance} symbol={tokenSymbol} />
                  {errorMessage ? (
                      <Text height={'20px'} color={"red.300"} fontSize={'14px'}>{errorMessage}</Text>
                  )
                  : (<Text height={'20px'} fontSize={'14px'}/>)}
                  <Mint onMintClick={handleMint} />
                </ModalWrapper>
            )}
          </Grid>
          <SendTransactionModal isOpen={isTransactionModalOpen} onClose={() => setTransactionModalOpen(false)} />
        </AppWrapper>
      </ChakraProvider>
  );
};

export default App;
