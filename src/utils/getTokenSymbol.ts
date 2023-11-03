// eslint-disable-next-line no-restricted-imports
import { Contract } from 'ethers';

export const getTokenSymbol = async (
  contract: Contract | null,
  setTokenSymbol: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  if (contract) {
    try {
      const symbol = await contract.symbol();
      setTokenSymbol(symbol);
    } catch (error) {
      console.error('Error updating token symbol:', error);
    }
  }
};
