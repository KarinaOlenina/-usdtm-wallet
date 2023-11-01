import React from "react";
import { Button } from "@chakra-ui/react";

interface ConnectWalletButtonProps {
    onConnectClick: () => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onConnectClick }) => {
    return (
        <Button onClick={onConnectClick}>Connect Wallet</Button>
    );
};

export default ConnectWalletButton;
