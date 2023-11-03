import React from "react";
import {Button, chakra} from "@chakra-ui/react";

interface ConnectWalletButtonProps {
    onConnectClick: () => void;
}

const StyledButton = chakra(Button, {
    baseStyle: {
        padding: '25px 35px 25px 35px',
        border: '1px solid #a4a4a4',
        borderRadius: '20px',
        background: 'white',
        transition: 'color 0.3s',
        color: '#171717',
        _hover: {
            color: '#868686',
            background: 'white',
        },
    },
});

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onConnectClick }) => {
    return (
        <StyledButton onClick={onConnectClick}>🦊 Connect Wallet</StyledButton>
    );
};

export default ConnectWalletButton;
