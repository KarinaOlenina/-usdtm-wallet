import React from "react";
import { Button } from "@chakra-ui/react";

interface MintProps {
    onMintClick: () => void;
}

const Mint: React.FC<MintProps> = ({ onMintClick }) => {
    return (
        <Button onClick={onMintClick}>Mint</Button>
    );
};

export default Mint;
