import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2");

(async() => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "42 Student",
            description: "A DAO for 42 Students",
            image: readFileSync("scripts/assets/42nft.jpeg"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });
        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );
        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("Failed to deploy bundleDrop module", error);
    }
})()

/*
output: "Deploy"

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
✅ Successfully deployed bundleDrop module, address: 0x96a0369F950D2c116c1b7cb832FD2e42E7Ee9909
✅ bundleDrop metadata: {
  metadata: {
    name: '42 Student',
    description: 'A DAO for 42 Students',
    image: 'https://cloudflare-ipfs.com/ipfs/QmZTjpQq6LPY6nj3oNT3vnZCVP8jKbYt8byeV6ATWiKgB4/0',
    primary_sale_recipient_address: '0x0000000000000000000000000000000000000000'
  },
  address: '0x96a0369F950D2c116c1b7cb832FD2e42E7Ee9909',
  type: 11
}

*/