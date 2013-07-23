---
layout: doc
title:  "Plan parameters"
date:   2013-01-01 12:30:30
tags: plan
---

Subscription plan has a lot of parameters and some of them may be very complex to understand.

## General Settings Tab

### Price

Param      | Description
-----------|--------------
Price      | Price of the plan.
Discount   | Fixed amount that will be discounted from the purchase first time. If you want to give plan for free first time set it the same as price and plan will be 0.


### Period

Param       | Description
------------|--------------
Period | Plan period length.
Period type | Plan period length unit.
How to calculate period | If user purchase plan second time you can attach new subscription to the end of previous, or start it immediately after purchase. Sometimes users try to update their subscriptions few days before old subscription expires.And it is good to attach next subscription to previous one. But sometimes there are limitation on how many times this subscription may be used and usage limit may be reached sooner than subscription expiration date. In this case user may want to purchase another subscriptions which should be activated immediately.
Start exactly on | Sometimes you sell subscriptions for special events. And you want that user subscription was activated on special date only. For example you have webcast on 1 January. You start sales in December but you want that subscription become active only on 1 January.
End exactly on | The same as above


### Limits

Param       | Description
------------|--------------
Total limit of purchases | How many times this plan may be purchased total.
Limit of purchases per user | How many times this plan may be purchased by one user.
Limit of purchases per user per period | How many times this plan may be purchased by one user per selected period.
Limit period | Limit period for parameter above.
Period in | Period unit for parameter above
Usage limit | How many times this subscription may be used. For example you restrict file download and you want that file mai be downloaded only 3 times.
Usage limit mode | How to calculate usage. it can calculate every assess on only unique access. For example you restrict file downloads. Unique access fill allow to download 3 files unlimited number of times. With count every access only total 3 downloads are allowed no matter of one file or 3 files.


### Grant

Param       | Description
------------|--------------
Grant to all users | Automatically assign this plan to every user that is already registered and to all who will register.
Grant to new users | Automatically assign this plan to every user who will register from the day of this plan creation.
Grant Success Page URL | redirect user to this URL after subscription successfully granted. May be Joomla static content page with congratulation text.


### Properties

Param       | Description
------------|--------------
Currency | Currency sign. Should be the same you set in payment gateway. This parameter only for formatting. It is not real set of currency for transactions.
Price format | How to format price. `Sign` will be replaced with `$` or what ever you enter to Currency parameter. And `00` will be replaced with price. It may format like this: `100 $`, `100$`, `$100`, `$ 100`.
Invisible | You can mke this plan invisible. It means that it will not appear in plan list for purchase but will eb still active. This is usually used when you create new plan and want old subscribers continue to use what they had purchased, bun no new purchases of old plan id made.
Invisible in history | It can also hide user subscription of this plan from the history page.
Multi user access | Multiple users access allows to share one subscription between few customers. [Read more about MUA](/en/emerald/multiple-user-access/).
Success purchase URL | Url to redirect user after successful subscription. Basically we try to remember what user was trying to access before suggested to subscribe and redirect user on that page. But if it is not set then this url is used. If this URL is not set, we redirect to subscription history where user can immediately see status of his purchase.


## Cross Plans Tab

### Price Affect

<div class="alert">This parameters does not work if plan discount parameter is set and it is first purchase.</div>

Param       | Description
------------|--------------
Plans | Select plan that will affect price of current plan if user already subscribed to that plan.
Recalculate price | How to recalculate. Either create discount as a sum of all purchases user already did or discount only for amount of biggest purchase.


### Require
Select plans to be required to purchase this plan

Param       | Description
------------|--------------
Plans to require | List of plans to be required before user can purchase this one.
Required | Set require mode. either require all of selected plans or one of selected.
Show plans with failed require check | Show list of plans that are required to purchase current plan in plan description.


### Period Calculation

Param       | Description
------------|--------------
Period cross plans | Selected plans will affect on create date of this plan's user subscription. Date of subscription start will be calculated with a glance of the latest expiration date of selected subscription and this subscription plan included.

### Deactivate plans

Param       | Description
------------|--------------
Plans to be deactivated | Select plans that will be deactivated automatically when purchase the current plan.

### Grant plans

Param       | Description
------------|--------------
Plans to be granted | Select plans that will be granted to user automatically when purchase the current plan.
Show plans list to be granted in frontend | You can show to subscriber the list of plans that will be granted in current plan description.


## Alerts Tab

Here you can setup what email messages will be sent to user. One important note that if you want multilingual alerts you can use constants like for example `ALERT_PLAN_NAME_SUCCESS` in subject and message body and override those constants in Joomla language manager / Overrides.

You also have to configure cron task in order expire alerts to be sent. Cron is triggered through URL. You can set following cron task at least once a day.

    wget http://mysite.com/index.php?option=com_emerald&task=cron.send_expire_alerts&secret=123456

Where `secret` is a text that you set in Emerald global parameters.

### Alerts

Param       | Description
------------|--------------
Send alerts on success subscription | Alert that is sent to user when subscription successfully activated.
Send alerts on fail subscription | Alert that is sent to user when subscription is created but by some reason is not yet activated. With some payment gateways it may take some time to approve purchase. Here you can write that user might what wait few minutes and only then contact administrator if he believe that his payment is ok.
Send alerts on subscription expire | Alert that is sent to user x days before subscription expires.
Send alerts on subscription canceled | Alert that is sent to user when admin unpublish/cancel user subscription.
Expire alert before | This is integer or coma separate. It sets how many days before subscription expires to send email alert. `5` - send 5 days before subscription expires. `5,3,1` - send 5 days and then 3 days and then 1 day before subscription expires.
Extra alert emails | Emails where to send administrator email alerts. Administrator alerts are sent only if this parameter is set. Otherwise no administrator alerts are sent.
Send alerts as | If you use text, then all HTML will be striped.

## Payment Gateways Tab

Read in details [about payment gateways](/en/emerald/payment-gateways/).

## Actions Tab

Read in details [about actions](/en/emerald/plan-actions/).
