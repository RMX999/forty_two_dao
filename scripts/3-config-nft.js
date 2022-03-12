import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0x96a0369F950D2c116c1b7cb832FD2e42E7Ee9909");

(async() => {
    try {
        await bundleDrop.createBatch([{
            name: "42 NFT",
            description: "This NFT will give you access to 42 DAO!",
            image: readFileSync("scripts/assets/42nft.jpeg"),
        }, ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("Error cant create the new NFT", error);
    }
})()

/*
output :

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
✅ Successfully created a new NFT in the drop!

*/