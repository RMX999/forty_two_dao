import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
    "0x331fC04d65B0D9b14e64415809dC21717e9EAA20",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
    "0xde1C40fD7aEC52AD5C5763C0196E6635d63B954b",
);

(async() => {
    try {
        const amount = 420_000;
        // Create proposal to mint 420,000 new token to the treasury.
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + " tokens into the treasury?", [{
                // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                // to send in this proposal. In this case, we're sending 0 ETH.
                // We're just minting new tokens to the treasury. So, set to 0.
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                    // We're doing a mint! And, we're minting to the voteModule, which is
                    // acting as our treasury.
                    "mint", [
                        voteModule.address,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                // Our token module that actually executes the mint.
                toAddress: tokenModule.address,
            }, ]
        );

        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        const amount = 6_900;
        // Create proposal to transfer ourselves 6,900 tokens for being awesome.
        await voteModule.propose(
            "Should the DAO transfer " +
            amount + " tokens from the treasury to " +
            process.env.WALLET_ADDRESS + " for being awesome?", [{
                // Again, we're sending ourselves 0 ETH. Just sending our own token.
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                    // We're doing a transfer from the treasury to our wallet.
                    "transfer", [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),

                toAddress: tokenModule.address,
            }, ]
        );

        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    } catch (error) {
        console.error("failed to create second proposal", error);
    }
})();

/*
output:

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
✅ Successfully created proposal to mint tokens
✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!
*/