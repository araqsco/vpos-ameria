import { VposHelpers } from "./helpers";
import { VposTypes } from "./types";

export const Vpos = new Proxy<VposTypes.Client>({} as VposTypes.Client, {
	get(_, key) {
		if (typeof key === "symbol") {
			throw new Error("Cannot get a symbol key");
		}
		return async (request: object, options?: VposTypes.Options) => {
			const config = VposHelpers.getConfig(options);
			const path = VposHelpers.capitalize(key);
			const body = JSON.stringify(
				VposHelpers.capitalizeObject({
					...request,
					username: config.username,
					password: config.password,
					clientId: config.clientID,
				}),
			);

			const response = await fetch(`${config.baseUrl}/api/VPOS/${path}`, {
				body,
				headers: {
					"Content-Type": "application/json",
				},
			}).then((response) => response.json());

			return VposHelpers.decapitalizeObject(response);
		};
	},
});

