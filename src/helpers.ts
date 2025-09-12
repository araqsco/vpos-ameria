import { VposTypes } from "./types";

export namespace VposHelpers {
	export type QueryParamsForBackUrl = {
		/**
		 * Unique ID of the transaction
		 */
		orderID: string;
		/**
		 * Operation response code (successful=00)
		 */
		responseCode: string;
		/**
		 * Unique payment ID
		 */
		paymentID: string;
		/**
		 * Additional data
		 */
		opaque: string;
	};

	export type Currency = "amd" | "eur" | "usd" | "rub";
	export function currencyIsoFromName(currency: Currency): string {
		return isoCurrency[currency];
	}

	const isoCurrency: Partial<Record<Currency, string>> = {
		amd: "051",
		eur: "978",
		usd: "840",
		rub: "643",
	};

	export type PaymentState =
		| "payment_started"
		| "payment_approved"
		| "payment_declined"
		| "payment_deposited"
		| "payment_refunded"
		| "payment_autoauthorized"
		| "payment_void";
	export type PaymentStateInfo = {
		code: PaymentState;
		message: string;
	};
	export function paymentStateFromCode(
		code: number,
	): PaymentStateInfo | undefined {
		const mapping: Partial<Record<number, PaymentStateInfo>> = {
			[0]: {
				code: "payment_started",
				message: "Order is registered but not paid",
			},
			[1]: {
				code: "payment_approved",
				message: "Amount of the order was preauthorized",
			},
			[6]: {
				code: "payment_declined",
				message: "Authorization declined",
			},
			[2]: {
				code: "payment_deposited",
				message: "Amount successfully authorized",
			},
			[4]: {
				code: "payment_refunded",
				message: "Amount of the transaction was refunded",
			},
			[5]: {
				code: "payment_autoauthorized",
				message: "Authorization via ACS of the issuer bank",
			},
			[3]: {
				code: "payment_void",
				message: "Authorization cancelled",
			},
		};

		return mapping[code];
	}

	export type Language = "en" | "ru" | "am";

	export function decapitalize(key: string) {
		if (!key) {
			return key;
		}

		return key[0].toLocaleLowerCase() + key.slice(1);
	}

	export function capitalize(key: string) {
		if (!key) {
			return key;
		}

		return key[0].toLocaleUpperCase() + key.slice(1);
	}

	export function capitalizeObject(input: object) {
		const capitalizedObjectEntries = Object.entries(input).map(
			([key, value]) => [capitalize(key), value],
		);
		return Object.fromEntries(capitalizedObjectEntries);
	}

	export function decapitalizeObject(input: object) {
		const capitalizedObjectEntries = Object.entries(input).map(
			([key, value]) => [decapitalize(key), value],
		);
		return Object.fromEntries(capitalizedObjectEntries);
	}

	export function getPaymentUrl(
		paymentID: string,
		language: Language,
		options?: VposTypes.Options,
	) {
		const config = getConfig(options);
		return `${config.baseUrl}/Payments/Pay?id=${encodeURIComponent(paymentID)}&lang=${language}`;
	}

	export function getConfig(
		options?: VposTypes.Options,
	): Required<VposTypes.Options> {
		const defaultUrl = "https://servicestest.ameriabank.am/VPOS";
		if (!options) {
			return {
				username: process.env.VPOS_AMERIA_USERNAME,
				password: process.env.VPOS_AMERIA_PASSWORD,
				clientID: process.env.VPOS_AMERIA_CLIENT_ID,
				baseUrl: process.env.VPOS_AMERIA_BASE_URL || defaultUrl,
			};
		}
		return {
			baseUrl:
				options.baseUrl ?? (process.env.VPOS_AMERIA_BASE_URL || defaultUrl),
			...options,
		};
	}
}
