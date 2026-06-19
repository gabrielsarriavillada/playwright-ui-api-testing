import { test, expect } from '@playwright/test';

test("submit order and verify SIMs", async({ request }) => {
    const tokenResponse = await request.post("/v2/token", {
        headers: {
            Accept: "application/json"
        },
        form: {
            client_id: process.env.AIRALO_CLIENT_ID!,
            client_secret: process.env.AIRALO_CLIENT_SECRET!,
            grant_type: "client_credentials",
        },
    });

    const tokenBody = await tokenResponse.json();
    const token = tokenBody.data.access_token;

    const orderResponse = await request.post("/v2/orders", {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        form: {
            quantity: "6",
            package_id: "moshi-moshi-7days-1gb",
            type: "sim",
            description: `airalo-qa-${Date.now()}`,
        },
    });

    expect(orderResponse.status()).toBe(200);

    const orderBody = await orderResponse.json();

    expect(orderBody.meta.message).toBe("success");
    expect(orderBody.data.package_id).toBe("moshi-moshi-7days-1gb");
    expect(orderBody.data.quantity).toBe(6);
    expect(orderBody.data.type).toBe('sim');
    expect(orderBody.data.sims).toHaveLength(6);

    const sims = orderBody.data.sims;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const sim of sims) {
        await test.step(`verify eSIM ${sim.iccid}`, async () => {
            await delay(1000);
            expect(sim.iccid).toBeTruthy();
            expect(sim.lpa).toBeTruthy();
            expect(sim.matching_id).toBeTruthy();

            const eSimResponse = await request.get(`v2/sims/${sim.iccid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },
            });

            expect(eSimResponse.status()).toBe(200);

            const eSimBody = await eSimResponse.json();

            expect(eSimBody.meta.message).toBe("success");
            expect(eSimBody.data.iccid).toBe(sim.iccid);
        });
    }
});
