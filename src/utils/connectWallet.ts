import React from 'react';

export const connectWallet = async (
  setAccount: React.Dispatch<React.SetStateAction<string | null>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setConnecting: React.Dispatch<React.SetStateAction<boolean>>,
  changeAccountHandler: (newAddress: string | null) => void
): Promise<void> => {
  setConnecting(true);
  if ((window as any).ethereum && (window as any).ethereum.isMetaMask) {
    try {
      setErrorMessage(null);
      const addressArray = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      const newAddress = addressArray[0];
      localStorage.setItem('userAccount', newAddress);
      changeAccountHandler(newAddress);

      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          console.log('disconnect');
          setAccount(null);
          localStorage.removeItem('userAccount');
        }
      });
    } catch (err: any) {
      setErrorMessage('😥 ' + err.message);
    } finally {
      setConnecting(false);
    }
  } else {
    setErrorMessage(
      ' You must install MetaMask, a virtual Ethereum wallet, in your browser 🦊.'
    );
  }
};
