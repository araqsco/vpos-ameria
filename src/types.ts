export namespace VposTypes {
	export interface Client {
		initPayment(
			request: InitPaymentRequest,
			options?: Options,
		): Promise<InitPaymentResponse>;
	}

	export type InitPaymentRequest = {
		/**
		 * ISO three digit code, look in VposHelpers
		 */
		currency: string;
		description: string;
		/**
		 * Unique ID of the transaction
		 */
		orderID: string;
		/**
		 * Payment amount
		 */
		amount: number;
		/**
		 * Address on the merchant’s server for returning after payment
		 */
		backUrl?: string;
		/**
		 * Additional data
		 */
		opaque?: string;
		/**
		 * Unique ID for binding transactions (is used when needs to do card binding, in other cases it is not required)
		 */
		cardHolderID?: string;
		/**
		 * Session duration in seconds. Cannot exceed 1200 seconds. If the parameter is not specified, the default value (1200 seconds - 20 minutes) will be used.
		 */
		timeout?: number;
	};

	export type InitPaymentResponse = {
		/**
		 * Unique payment ID string
		 */
		paymentID: string;
		/**
		 * Operation response code(successful = 1) integer
		 */
		responseCode: number;
		/**
		 * Description of operation response string
		 */
		responseMessage: string;
	};

	/**
	 * If `options` are not provided
	 * values are taken from environment
	 */
	export type Options = {
		/**
		 * defaults to AMERIA_VPOS_CLIENT_ID
		 */
		clientID: string;
		/**
		 * defaults to AMERIA_VPOS_USERNAME
		 */
		username: string;
		/**
		 * defaults to AMERIA_VPOS_PASSWORD
		 */
		password: string;
		/**
		 * defaults to AMERIA_VPOS_BASE_URL or "https://servicestest.ameriabank.am/VPOS"
		 */
		baseUrl?: string;
	};

}
