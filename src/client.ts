import { VposHelpers } from "./helpers";
import { VposTypes } from "./types";

export const Vpos = new Proxy<VposTypes.Client>({} as VposTypes.Client, {
	get(_, key) {
		if (typeof key === "symbol") {
			throw new Error("Cannot get a symbol key");
		}
		return async (request: object, options?: VposTypes.Options) => {
			const config = getConfig(options);
			const path = VposHelpers.capitalize(key);
			const body = JSON.stringify(
				VposHelpers.capitalizeObject({
					...request,
					username: config.username,
					password: config.password,
					clientId: config.clientID,
				}),
			);

			const response = await fetch(`${config.baseUrl}/${path}`, {
				body,
				headers: {
					"Content-Type": "application/json",
				},
			}).then((response) => response.json());

			return VposHelpers.decapitalizeObject(response);
		};
	},
});

function getConfig(options?: VposTypes.Options): Required<VposTypes.Options> {
	if (!options) {
		return {
			username: process.env.VPOS_AMERIA_USERNAME,
			password: process.env.VPOS_AMERIA_PASSWORD,
			clientID: process.env.VPOS_AMERIA_CLIENT_ID,
			baseUrl:
				process.env.VPOS_AMERIA_BASE_URL ||
				"https://servicestest.ameriabank.am/VPOS/api/VPOS",
		};
	}
	return {
		baseUrl:
			options.baseUrl ??
			(process.env.VPOS_AMERIA_BASE_URL ||
				"https://servicestest.ameriabank.am/VPOS/api/VPOS"),
		...options,
	};
}
