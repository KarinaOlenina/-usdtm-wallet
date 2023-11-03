// eslint-disable-next-line no-restricted-imports
import { Contract, ethers } from 'ethers';

export const getBalance = async (
  contract: Contract | null,
  account: string | null,
  setBalance: React.Dispatch<React.SetStateAction<number>>
): Promise<void> => {
  if (contract && account) {
    try {
      const balanceBigN = await contract.balanceOf(account);
      const balance = parseFloat(ethers.formatEther(balanceBigN));
      setBalance(balance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  }
};
