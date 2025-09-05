import { VposTypes } from "./types";

export namespace VposHelpers {
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
		const params = new URLSearchParams();
		params.set("id", paymentID);
		params.set("lang", language);

		return `${config.baseUrl}/Payments/Pay?${params}`;
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
