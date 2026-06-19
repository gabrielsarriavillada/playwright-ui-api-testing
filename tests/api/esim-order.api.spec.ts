import { test, expect } from '@playwright/test';
import { AiraloApi } from '../../api/airaloApi';

test("submit order and verify SIMs", async({ request }) => {
    const airalo = new AiraloApi(request);

    const token = await airalo.getToken();

    const orderBody = await airalo.submitOrder(token);

    expect(orderBody.meta.message).toBe("success");
    expect(orderBody.data.package_id).toBe("moshi-moshi-7days-1gb");
    expect(orderBody.data.quantity).toBe(6);
    expect(orderBody.data.type).toBe('sim');
    expect(orderBody.data.sims).toHaveLength(6);

    for (const sim of orderBody.data.sims) {
        await test.step(`verify eSIM ${sim.iccid}`, async () => {
            expect(sim.iccid).toBeTruthy();
            expect(sim.lpa).toBeTruthy();
            expect(sim.matching_id).toBeTruthy();

            const eSimBody = await airalo.getEsim(token, sim.iccid);

            expect(eSimBody.meta.message).toBe("success");
            expect(eSimBody.data.iccid).toBe(sim.iccid);
        });
    }
});
