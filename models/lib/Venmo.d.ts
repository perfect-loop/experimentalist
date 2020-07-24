export declare module Venmo {
    interface IPaymentMethodAsset {
        detail?: string;
        detail_network_logo?: string;
        thumbnail: string;
    }
    interface IFee {
        variable_percentage: number;
        fixed_amount?: string;
    }
    export type PaymentRole = "default" | "backup" | "none";
    export interface IPaymentMethod {
        id: string;
        name: string;
        top_up_role: string;
        used_in_scheduled_repayment?: boolean;
        default_transfer_destination: string;
        last_four?: string;
        peer_payment_role: PaymentRole;
        type: string;
        image_url?: string;
        assets?: IPaymentMethodAsset;
        fee?: IFee;
    }
    export interface IVenmoUser {
        username: string;
        profile_picture_url: string;
        id: string;
        date_joined: string;
        about: string;
        display_name: string;
        email?: string;
        last_name?: string;
        first_name?: string;
    }
    export {};
}
