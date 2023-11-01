import React from "react";
import { Text } from "@chakra-ui/react";

interface BalanceProps {
    balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => {
    return (
        <div>
            <Text>Balance</Text>
            <Text>{balance}</Text>
        </div>
    );
};

export default Balance;
