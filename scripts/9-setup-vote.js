import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0x331fC04d65B0D9b14e64415809dC21717e9EAA20");

const tokenModule = sdk.getTokenModule("0xde1C40fD7aEC52AD5C5763C0196E6635d63B954b");

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);

        console.log("Successfully gave vote module permissions to act on token module");
    } catch (error) {
        console.error("failed to grant vote module permissions on token module",
        error
        );
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );

        console.log("✅ Successfully transferred tokens to vote module");
    } catch (error) {
        console.error("failed to transfer tokens to vote module", error);
    }
})();

/*

output:

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
Successfully gave vote module permissions to act on token module
✅ Successfully transferred tokens to vote module

*/