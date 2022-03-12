import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0x96a0369F950D2c116c1b7cb832FD2e42E7Ee9909");

(async() => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();

        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            mxQuantity: 50_000,
            maxQuantityPerTransaction: 1,
        });
        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch(error) {
        console.error("Failed to set claim condition", error);
    }
})()

/*
output :

Your app address is: 0xB3f56716AF7f428b4818ade0d21da2c9a8270cA2
✅ Successfully set claim condition on bundle drop: 0x96a0369F950D2c116c1b7cb832FD2e42E7Ee9909

*/