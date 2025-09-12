export namespace VposTypes {
	export interface Client {
		initPayment(
			request: InitPaymentRequest,
			options?: Options,
		): Promise<InitPaymentResponse>;
		getPaymentDetails(
			request: GetPaymentDetailsRequest,
			options?: Options,
		): Promise<GetPaymentDetailsResponse>;
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

	export type GetPaymentDetailsRequest = {
		/**
		 * Unique payment ID string
		 */
		paymentID: string;
	};

	export type GetPaymentDetailsResponse = {
		/**
		 * Transaction amount decimal
		 */
		amount?: number;
		/**
		 * Amount blocked on the client’s card decimal
		 */
		approvedAmount?: number;
		/**
		 * Transaction authorization code string
		 */
		approvalCode?: string;
		/**
		 * Masked card number string
		 */
		cardNumber?: string;
		/**
		 * Cardholder name string
		 */
		clientName?: string;
		/**
		 * Cardholder’s email address string
		 */
		clientEmail?: string;
		/**
		 * Transaction currency string
		 */
		currency?: string;
		/**
		 * Transaction date string
		 */
		dateTime?: string;
		/**
		 * Amount deposited to the merchant’s account decimal
		 */
		depositedAmount?: number;
		/**
		 * Information about the transaction string
		 */
		description?: string;
		/**
		 * Merchant ID string
		 */
		merchantId?: string;
		/**
		 * Additional data string
		 */
		opaque?: string;
		/**
		 * Unique ID of the transaction integer
		 */
		orderID?: number;
		/**
		 * Payment state string
		 */
		paymentState?: string;
		/**
		 * 5- MainRest (arca)
		 * 7- PayPal
		 * 6- Binding
		 */
		paymentType?: string;
		/**
		 * Operation response code(successful =00)
		 */
		responseCode: string;
		/**
		 * Unique code of the transaction string
		 */
		rrn?: string;
		/**
		 * Merchant’s terminalid string
		 */
		terminalId?: string;
		/**
		 * Description of the transaction string
		 */
		trxnDescription?: string;
		/**
		 * Status code of the payment
		 */
		orderStatus?: string;
		/**
		 * Amount transferred back to the card decimal
		 */
		refundedAmount?: number;
		/**
		 * Unique ID for binding transactions string
		 */
		cardHolderID?: string;
		/**
		 * Payment system identifier string
		 */
		mDOrderID?: string;
		/**
		 * Main code
		 */
		primaryRC?: string;
		/**
		 * Card expiration date string
		 */
		expDate?: string;
		/**
		 * IP address string
		 */
		processingIP?: string;
		/**
		 * Binding identifier string
		 */
		bindingID?: string;
		/**
		 * Action code string
		 */
		actionCode?: string;
		/**
		 * Exchange rate decimal
		 */
		exchangeRate?: number;
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
