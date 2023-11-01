import React from "react";
import { Text } from "@chakra-ui/react";
import {JsonRpcSigner} from "ethers";

interface AccountProps {
    account: JsonRpcSigner;
}

const Account: React.FC<AccountProps> = ({ account }) => {
    return (
        <div>
            <Text>Account</Text>
            <Text>{account.address}</Text>
        </div>
    );
};

export default Account;
