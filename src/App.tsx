import React, { useState } from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import ConnectWalletButton from "./Components/ConnectWallet";
import Account from "./Components/Account";
import Balance from "./Components/Balance";
import Mint from "./Components/Mint";
import {ethers, JsonRpcSigner} from "ethers";


// const provider = new ethers.BrowserProvider((window as any).ethereum);

const App: React.FC = () => {
  const [account, setAccount] = useState<JsonRpcSigner | null>(null);
  const [balance, setBalance] = useState<number>(0);


  console.log(account);
  console.log(balance);

  const tokenContractAddress = "0xA2119EC01313AF5c4c1225698bA670437DbBac46"; // Адреса контракту, яку ви надали

  const handleConnectWallet = async () => {
    try {
      if (typeof (window as any).ethereum === "undefined") {
        throw new Error("MetaMask not detected!");
      }

      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const [selectedAccount] = await provider.listAccounts();

      const balance = await provider.getBalance(selectedAccount);

      // const abi = ["function balanceOf(address) view returns (uint256)"];
      // const tokenContract = new ethers.Contract(tokenContractAddress, abi, provider);
      //
      //
      // const balance = await tokenContract.balanceOf(account?.address);
      // console.log("USDTM Balance:", balance.toString());

      const etherBalance = ethers.formatEther(balance);

      setAccount(selectedAccount);
      setBalance(Number(etherBalance));
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleMint = () => {
    console.log("handleMint");
  };

  return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            {!account ? (
                <ConnectWalletButton onConnectClick={handleConnectWallet} />
            ) : (
                <div>
                  <Account account={account} />
                  <Balance balance={balance} />
                  <Mint onMintClick={handleMint} />
                </div>
            )}
          </Grid>
        </Box>
      </ChakraProvider>
  );
};

export default App;
