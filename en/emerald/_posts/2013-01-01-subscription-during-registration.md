---
layout: doc
title:  "Payed Accounts"
date:   2013-01-01 12:30:30
intro: "How to setup subscription during registration."
tags: setup
---

The new subscription during registration in the Emerald is seamless one click subscription solution. 

1. User select plan on registration form and click register button.
2. User redirected to payment gateway and process purchase.
3. User come back and his account already activated if purchase succeeded and user already logged in.

As simple as that!

There are number of things you have to know in order to configure Emerald for subscription during registration.

### 1. Emerald does not handle registration

Users cannot register through Emerald. But it is integrated with Joomla core registration form and EasySocail registration. If you want integration with any other registration extension [just let us know](http://www.mintjoomla.com/support/community-forum/category-items/6-community-forum/52-emerald-9.html).

- You have to enable it. For core Joomla registration edit Emerald plugin in users plugin group and enable plan selector. For EasySocial enable custom field in fields manager.

### 2. Plan selector is session based

What it means that during registration, plan that was selected by user is saved in session and after registration is complete on the next page, Emerald's system plugin checks, and if session plan selection found, redirects user to payment gateway.

For user it is like click register button and PayPal is the next page. Very seamlessly and straightforward. But you have to understand what is happening to prevent unauthorized access.

What if user do not process with payment through gateway and just return to the site? Account is created, but there is no payment.

- Make sure Emerald's system plugin is published.
- Enable require subscription in Emerald's system plugin.

What this will do is always redirect user to purchase plan or plan selector page, until user gets active subscription.

### 3. Activate user if payment successful

There is an option to make user account automatically active after success payment. 

- Set user activation mode _Admin_ in user manager global settings.
- Enable user activation in global Emerald parameters.

  ![](/assets/img/screenshots/em-active1.png) 

It will not only activate user, but attempt to login user.

## FAQ

### What if I set require user email confirmation. User will be redirected to payment not being yet active. Will payment fail?

No. Payment will be ok even for not active user. He will be able to use it as soon as account is confirmed. The same true for manual account activation.
 