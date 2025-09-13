# VPOS SDK for Ameria API

> This package defines types and helpers to be used for VPOS integration

# Environment

| environment variable  | provided by the bank |
| --------------------- | -------------------- |
| VPOS_AMERIA_USERNAME  | yes                  |
| VPOS_AMERIA_PASSWORD  | yes                  |
| VPOS_AMERIA_CLIENT_ID | yes                  |

> Use `VPOS_AMERIA_BASE_URL` environment variable to change the base URL of the requests
> By default it is [https://servicestest.ameriabank.am/VPOS]

# Examples

> Request a payment for 10,000 AMD

```ts
// Credentials will be fetched from environment
const response = await Vpos.initPayment({
  description: "Payment for a dress you are buying", // This will be displayed on paymenet page
  currency: VposHelpers.currencyIsoFromName("amd"), // You can use VposHelpers to easily map enums
  amount: 10_000,
  orderID: order, // Uniquely generated orderID to identify the payment later
  backUrl: `${host}/payment/callback`, // Client will be redirected to this page
});

// It will create the URL that client needs to be redirected to
const url = VposHelpers.getPaymentUrl(response.paymentID, "en");
```

# Contributing

We wrote the types according to the documentation, however, it may have some mismatches.
If you find any, were are happy to merge PRs.
