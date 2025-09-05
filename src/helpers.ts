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
}
