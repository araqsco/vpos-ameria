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
		confirmPayment(
			request: ConfirmPaymentRequest,
			options?: Options,
		): Promise<GenericResponse>;
		/**
		 * Payments may be:
		 *   - **single-stage**: when the payment amount is immediately withdrawn from the buyer’s account
		 *   - **two-stage**: when the payment amount is first blocked on the buyer’s account and then at the second stage is withdrawn from the account
		 * > In case of two-stage payment, it is necessary to send “Confirmation” request for performing the second stage and withdrawing the amount from the buyer’s (cardholder’s) account. To cancel the payment and to return the amount back to the buyer’s (cardholder’s) account it is necessary to send “CancelPayment” request.
		 */
		cancelPayment(
			request: CancelPaymentRequest,
			options?: Options,
		): Promise<GenericResponse>;
		refundPayment(
			request: RefundPaymentRequest,
			options?: Options,
		): Promise<GenericResponse>;
		makeBindingPayment(
			request: MakeBindingPaymentRequest,
			options?: Options,
		): Promise<MakeBindingPaymentResponse>;
		deactivateBinding(
			request: DeactivateBindingRequest,
			options?: Options,
		): Promise<DeactivateBindingResponse>;
		activateBinding(
			request: ActivateBindingRequest,
			options?: Options,
		): Promise<ActivateBindingResponse>;
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
		paymentType?: number;
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

	export type ConfirmPaymentRequest = {
		/**
		 * Payment ID
		 */
		paymentID: string;
		/**
		 * Confirmed amount
		 */
		amount: number;
	};

	export type CancelPaymentRequest = {
		/**
		 * Payment ID
		 */
		paymentID: string;
	};

	export type RefundPaymentRequest = {
		/**
		 * Payment ID
		 */
		paymentID: string;
		/**
		 * Amount to be returned to the buyer’s (cardholder’s) account
		 * This amount shall not exceed the transaction amount.
		 */
		amount: number;
	};

	export type MakeBindingPaymentRequest = {
		/**
		 * Use ISO code
		 */
		currency: string;
		/**
		 * Description of the transaction
		 */
		description: string;
		/**
		 * Unique code of the transaction: integer
		 */
		orderID: number;
		/**
		 * Payment amount: decimal
		 */
		amount: number;
		/**
		 * Additional data string
		 */
		opaque?: string;
		/**
		 * Unique ID for binding transactions
		 */
		cardHolderID: string;
		/**
		 * Shop URL
		 */
		backURL: string;
		/**
		 * 5- MainRest (arca)
		 * 7- PayPal
		 * 6- Binding
		 */
		paymentType: number;
	};

	export type MakeBindingPaymentResponse = {
		/**
		 * Payment ID string
		 */
		paymentID?: string;
		/**
		 * Transaction amount: decimal
		 */
		amount?: number;
		/**
		 * Amount blocked on the client’s card: decimal
		 */
		approvedAmount?: number;
		/**
		 * Transaction authorization code
		 */
		approvalCode?: string;
		/**
		 * Masked card number
		 */
		cardNumber?: string;
		/**
		 * Cardholder name
		 */
		clientName?: string;
		/**
		 * Transaction currency, ISO code
		 */
		currency?: string;
		/**
		 * Transaction date
		 */
		dateTime?: string;
		/**
		 * Amount deposited to the merchant’s account: decimal
		 */
		depositedAmount?: number;
		/**
		 * Information about the transaction
		 */
		description?: string;
		/**
		 * Payment system identifier
		 */
		mDOrderID?: string;
		/**
		 * Merchant ID
		 */
		merchantId?: string;
		/**
		 * Additional data
		 */
		opaque?: string;
		/**
		 * Unique ID of the transaction: integer
		 */
		orderID?: number;
		/**
		 * Payment state
		 */
		paymentState?: string;
		/**
		 * 5- MainRest (arca)
		 * 7- PayPal
		 * 6- Binding
		 */
		paymentType?: number;
		/**
		 * Main code string
		 */
		primaryRC?: string;
		/**
		 * Operation response code (successful=00) string
		 */
		responseCode?: string;
		/**
		 * IP address string
		 */
		processingIP?: string;
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
		 * Payment status code: integer
		 */
		orderStatus?: number;
		/**
		 * Amount transferred back to the card: decimal
		 */
		refundedAmount?: number;
		/**
		 * Unique ID for binding transactions string
		 */
		cardHolderID?: string;
		/**
		 * Binding ID string
		 */
		bindingID?: string;
		/**
		 * Action code string
		 */
		actionCode?: string;
	};

	export type DeactivateBindingRequest = {
		/**
		 * 5- MainRest (arca)
		 * 7- PayPal
		 * 6- Binding
		 */
		paymentType: number;

		/**
		 * Unique ID for binding transactions string Yes
		 */
		cardHolderID: string;
	};

	export type DeactivateBindingResponse = {
		/**
		 * Operation response code (successful=00)
		 */
		responseCode: string;
		/**
		 * Description of operation response string
		 */
		responseMessage?: string;
		/**
		 * Unique ID per card
		 */
		cardHolderID?: string;
	};

	export type ActivateBindingRequest = {
		/**
		 * 5- MainRest (arca)
		 * 7- PayPal
		 * 6- Binding
		 */
		paymentType: number;

		/**
		 * Unique ID for binding transactions string Yes
		 */
		cardHolderID: string;
	};

	export type ActivateBindingResponse = {
		/**
		 * Operation response code (successful=00)
		 */
		responseCode: string;
		/**
		 * Description of operation response string
		 */
		responseMessage?: string;
		/**
		 * Unique ID per card
		 */
		cardHolderID?: string;
	};

	export type GenericResponse = {
		/**
		 * Operation response code (successful=00)
		 */
		responseCode: string;
		/**
		 * Description of operation response string
		 */
		responseMessage?: string;
		/**
		 * Additional data string
		 */
		opaque?: string;
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
