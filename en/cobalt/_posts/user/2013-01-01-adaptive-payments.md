---
layout: doc
title:  "PayPal Adaptive Payments"
date:   2013-01-01 12:30:30
tags: e-commerce
intro: "Who you can get commission of every sale in your multiple vendor shop."
---

Adaptive payments handles payments between a sender of a payment and one or more receivers of the payment. By simple words adaptive payment will allow you in your multivendor shop to get % off each sale on your site through Cobalt CCK.

## Key Concepts

Adaptive Payments has operations that enable the sending and receiving of payments involving two or more parties. Each Adaptive Payments API transaction includes a sender and one or more receivers of the payment. Each transaction also includes the application owner, called the "API Caller," who is an invisible third party that provides the transaction flow and is the entity that makes the API calls. In most scenarios, payment transactions are initiated by the buyer (in a send type of payment arrangement) or by the seller (in a pay type of payment arrangement).

You are an application owner, such as a merchant that owns a website, the owner of a widget on a social networking site, the provider of a payment application on mobile phones, and so on. Your application is the caller of Adaptive Payments API operations.

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/AP_overview.jpg)

## In depth

You may be both the application owner and a receiver. For example, as the owner of a website, you are the receiver of payments from the senders who are your customers. The following diagram shows the relationship between a sender, you as a receiver, and PayPal:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/AdapPymntRolesApp_A.gif)

You are not required to be a receiver. For example, if you own a shopping cart, you are not required to receive payments directly. You can facilitate payments between the sender and receivers that provide the actual goods. The following diagram shows the relationship between a sender, you as an application owner that directs payments to receivers, and PayPal:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/AdapPymntRolesApp_B.gif)

And last diagram shows the relationship between a sender, you as an application owner that directs payments to receivers, and PayPal in a chained payment:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/AdapPymntRolesApp_C.gif)

## Payment Types

PayPal adaptive payment supports 3 payment types. _Simple_, _Parallel_ and _Chained_. Cobalt uses only _Parallel_ and _Chained_ types. In a Chained type you may chose who will be primary receiver you you seller.

### Parellel

A parallel payment is a payment from a sender that is split directly among 2 receivers (Paypal supports up to 6). 

 The following example shows a sender paying 3 receivers in a single parallel payment:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/KindsAdapPymnt_B.gif)

In Cobalt parallel payment is made to Seller for product and commission to shop owner.

### Chained

In a chained payment, the sender pays the primary receiver an amount, from which the primary receiver pays secondary receivers. It is an extension of a typical payment from a sender to a receiver, in which a receiver, known as the primary receiver, passes part of the payment to other receivers, who are called secondary receivers.

<div class="box-info">The sender only knows about the primary receiver, not the secondary receivers. The secondary receivers only know about the primary receiver, not the sender.</div>

> **Note:** The API caller must get permission from PayPal to use chained payments. See how to get started.

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/KindsAdapPymnt_C.gif)

There is most one primary receiver (application owner/you) and 1* secondary receivers (someone who sells on your site). 

<small>* If we create shopping cart in Cobalt 9 it will sent payments to different sellers of all purchased products and not only one receiver. Right now there is only **Buy Now** option in [Cobalt SSI][ssi].</small>

## Payments for Digital Goods

In addition adaptive payment accept special parameter `paymentType=DIGITALGOODS`. I did not find information how it makes all different but there are obviously some advantages. I think especially if dispute is raised. 

## Fees

There are no set-up costs, monthly minimums, cancellation charges, or monthly fees.  Transaction fees are calculated as follows.

Monthly sales | Your fee per transaction | Examples
---|---|---
$0 – $3,000 | 2.9% + $0.30 | $3.20 fee on a $100 sale
$3,000+ – $10,000 | 2.5% + $0.30* | $2.80 fee on a $100 sale
$10,000+ | 2.2% + $0.30* | $2.50 fee on a $100 sale
$100,000+ | For details, call 800-514-4920. | 

The prices apply to domestic payments in U.S. Dollars. 

### International availability and fees
You can use Adaptive Payments in any country where [PayPal is accepted][pa].

You can hold multiple currency balances in your PayPal account or convert a currency balance at competitive rates. There are fees for currency conversion and to receive payments from another country.

For details, see [Transaction fees for cross-border payments][tf].

### Fees schemes

Cobalt supports all  of them.

#### Sender Pays the Fee

The sender can pay a fee for a simple payment or a parallel payment. The following example shows fees being paid by the sender of a parallel payment, based on the assessment for each receiver:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/FeePymntConfig_A.gif)

#### Receiver Pays the Fee in a Parallel Payment

If the receivers pay the fee in a parallel payment, each receiver pays a portion of the fee, based on their assessment. The following example shows the receivers paying the fees:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/FeePymntConfig_B.gif)

#### Each Receiver Pays the Fee in a Chained Payment

If the receivers pay the fee in a chained payment, each receiver pays a portion of the fee, based on their assessment. The following example shows the receivers paying the fees:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/FeePymntConfig_C.gif)

#### Primary Receiver Pays the Fee in a Chained Payment

If only the primary receiver pays the fee in a chained payment, other receivers pay no fees. The fees paid by the primary receiver, however, are based upon the total fees assigned to all receivers. The following example shows only the primary receiver, identified as the merchant, paying all fees:

![](https://www.paypalobjects.com/webstatic/en_US/developer/docs/ap/FeePymntConfig_D.gif)

## How to get started

### Configure PayPal

- Check your account status. Login to PayPal. Go to your PayPal Profile and click My settings. Confirm that your “Account type” is either **Premier** or **Business**, or upgrade your account.

- Check your **API settings**. Click My selling tools. Expand “Selling online” if needed and check “API access.” Click Update and Add or edit API permission or View API signature.

- To get your application live, follow the submission steps outlined in [Going Live with Your Application][gl]. When you submit your application to PayPal for review, the application is quickly scanned for the requests to PayPal operations. If no "advanced" operations are found, PayPal issues an App ID for the production servers at the time you submit the application. If your application uses "advanced" PayPal operations, or if your application implements a complex business model, you can expect the review to take approximately 10 – 15 days. 

### Configure Cobalt

In PayPal parameters in any [SSI][ssi] based field you will see new parameters group. As for the moment of this article publish there are only 3 SSI fields. [Pay to download][ssi1], [Pay voucher][ssi2] to sell any serial numbers and [Pay to access][ssi3] to sell access to full article view. And we plan Tangible, Donation and Event.

![](http://serhioromano.s3.amazonaws.com/mintjoomla/KB/adaptivepayment.png)

Let me describe what those parameters are.

- **Enable adaptive payments** -  Enable or disable adaptive payments.

- **Adaptive method** - There are 3 main adaptive payment schemes. 
	 
	Note that in _Chained_ method, the sender only knows about the primary receiver, not the secondary receivers. The secondary receivers only know about the primary receiver, not the sender. 
	
	- **Parallel** - When payment is made parallel to seller and site owner  at the same time.
	- **Changed you are primary receiver** - When you receive all amount, keep commission and send rest to seller.
	- **Changed seller is primary receiver** - When seller receive whole amount and then transfer commission to site owner.

- **You interest in %** - Your interest in %. May be something from 1 to 99. 

- **You interest per transaction** - This is addition to % or only interest. This will be commissioned as fixed amount per transaction.

- **Minimum purchase amount** - Sometimes it is senseless to take commission on orders lower  than 1 USD or may be used as part of promotion. For example you do not take commissions on orders lower than 2 USD.

- **Who pays fees** - Cobalt supports all possible schemes of who will pay transaction fees . One important note is that `SENDER` may pay fees only in _person-to-person_ Payment types thus only with _Parallel_ transaction types.
  
	- `SENDER` – Sender pays all fees (for personal, implicit simple/parallel payments; do not use for chained or unilateral payments)
	- `PRIMARYRECEIVER` – Primary receiver pays all fees (chained payments only)
	- `EACHRECEIVER `– Each receiver pays their own fee (default, personal and unilateral payments)
	- `SECONDARYONLY` – Secondary receivers pay all fees (use only for chained payments with one secondary receiver) 

	Please see Fees paragraph for more details.

- **Payment type** -  The type of the payment.  Note that _person-to-person_ works only with _Parallel_ transaction types.

	- `GOODS` – This is a payment for non-digital goods
	- `SERVICE` – This is a payment for services (default)
	- `PERSONAL` – This is a person-to-person payment
	- `CASHADVANCE` – This is a person-to-person payment for a cash advance
	- `DIGITALGOODS `– This is a payment for digital goods

- **You PayPal email** - This is your payPal email where you will receive your commission and the same PayPal account that enables API credential bellow.
- **API** - all API settings including **API User Id**, **API Password**, **API Signature** and **API Application Id** you get when approve your application or site with Cobalt with PayPal. 

## Conclusion

Without any commission system inside the Cobalt you get great commission system based on PayPal. You get commission of every sale and your customers see their purchases like to single global seller. PayPal adaptive payments API in Cobalt is the next step of Cobalt multivendor [SSI][ssi].

[ssi1]: http://www.mintjoomla.com/download-fields/item/23-e-commerce-fields/76-pay-to-download.html
[ssi2]: http://www.mintjoomla.com/download-fields/item/23-e-commerce-fields/77-sell-vouchers.html
[ssi3]: http://www.mintjoomla.com/download-fields/item/23-e-commerce-fields/137-field-pay-to-access.html
[pa]: http://www.paypal.com/cgi-bin/webscr?cmd=_display-approved-signup-countries-outside
[tf]: https://www.paypal.com/cgi-bin/webscr?cmd=_display-xborder-fees-outside&countries=
[ssi]: http://www.mintjoomla.com/blog/item/53-what-is-ssi-in-depth.html
[gl]: https://www.x.com/developers/paypal/documentation-tools/going-live-with-your-application

