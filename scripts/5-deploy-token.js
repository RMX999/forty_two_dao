import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2");

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "42 Governance Token",
            symbol: "FTT",
        });
        console.log("✅ Successfully deployed token module, address:", tokenModule.address,);
    } catch (error) {
        console.error("Failed to deploy token module", error);
    }
})();

/*
output:

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
✅ Successfully deployed token module, address: 0xde1C40fD7aEC52AD5C5763C0196E6635d63B954b

*/