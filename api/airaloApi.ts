import { APIRequestContext, expect } from '@playwright/test';
import { OrderResponse } from '../models/order-response.model';
import { TokenResponse } from '../models/token-response.model';
import { ESimResponse } from '../models/esim-response.model';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AiraloApi {
    constructor(private readonly request: APIRequestContext) {}

    async getToken(): Promise<string> {
        const response = await this.request.post("/v2/token", {
            headers: {
                Accept: "application/json"
            },
            form: {
                client_id: process.env.AIRALO_CLIENT_ID!,
                client_secret: process.env.AIRALO_CLIENT_SECRET!,
                grant_type: "client_credentials",
            },
        });

        expect(response.status()).toBe(200);

        const body = (await response.json()) as TokenResponse;
        return body.data.access_token;
    }

    async submitOrder(token: string): Promise<OrderResponse> {
        const response = await this.request.post("/v2/orders", {
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

        expect(response.status()).toBe(200);
        return (await response.json()) as OrderResponse;
    }

    async getEsim(token: string, iccid: string): Promise<ESimResponse> {
        await delay(1000);
        
        const response = await this.request.get(`/v2/sims/${iccid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },
            });

            expect(response.status()).toBe(200);

            return (await response.json()) as ESimResponse;
    }
}
