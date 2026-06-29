import { ApnSettings, Meta } from "./order-response.model"

export interface ESimResponse {
    data: {
        id: number,
        created_at: string,
        iccid: string,
        lpa: string,
        imsis: null | string,
        matching_id: string,
        qrcode: string,
        qrcode_url: string,
        direct_apple_installation_url: string,
        voucher_code: null | string,
        airalo_code: null | string,
        apn_type: string,
        apn_value: string,
        is_roaming: boolean,
        confirmation_code: null | string,
        brand_settings_name: null | string,
        msisdn: null | string,
        apn: ApnSettings,
        sharing: Sharing
        recycled: boolean,
        recycled_at: null | string,
    },
    meta: Meta,
}

export interface Sharing {
    link: string,
    access_code: string,
}
