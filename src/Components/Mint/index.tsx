import React, { useState } from "react";
import {Box, Button, chakra, Input} from "@chakra-ui/react";

interface MintProps {
    onMintClick: (mintAmount: string) => void;
}

const StyledButtonMint = chakra(Button, {
    baseStyle: {
        padding: '25px 35px 25px 35px',
        width: '200px',
        border: '1px solid #a4a4a4',
        borderRadius: '10px',
        background: '#3F51B8',
        color: '#ffffff',
        transition: 'background-color 0.3s',
        _hover: {
            background: '#5a6fe0',
        },
    },
});

const StyledMintContainer = chakra(Box, {
    baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:' 100%',
    },
});

const Mint: React.FC<MintProps> = ({ onMintClick }) => {
    const [mintAmount, setMintAmount] = useState("");

    const handleMintClick = () => {
        onMintClick(mintAmount);
        setMintAmount("");
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let inputAmount = event.target.value;
        inputAmount = inputAmount.replace(/[^0-9.]/g, '');
        inputAmount = inputAmount.replace(/(\..*)\./g, '$1');
        inputAmount = inputAmount.replace(/^0+/, '0');

        if (/^\./.test(inputAmount)) {
            inputAmount = inputAmount.substring(1);
        }
        setMintAmount(inputAmount);

        if (!inputAmount) {
            setMintAmount(inputAmount);
            return;
        }

        setMintAmount(inputAmount);
    };


    return (
        <StyledMintContainer>
            <Input
                padding={'25px 15px 25px 15px'}
                marginRight={'10px'}
                borderRadius={'10px'}
                placeholder="Enter mint amount"
                value={mintAmount}
                onChange={handleAmountChange}
            />
            <StyledButtonMint onClick={handleMintClick}>MINT</StyledButtonMint>
        </StyledMintContainer>
    );
};

export default Mint;
