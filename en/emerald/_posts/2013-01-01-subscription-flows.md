---
layout: doc
title:  "Subscription Flows"
date:   2013-01-01 12:30:30
intro: "How user can subscribe and register."
tags: setup
---

Emerald has 3 main flows. But here are main things you have to know about Emerald.

1. **Emerald has no registration form**

   Users cannot register through Emerald. But it is integrated with Joomla core registration form and EasySocail registration. If you want integration with any other registration extension [just let us know](http://www.mintjoomla.com/support/community-forum/category-items/6-community-forum/52-emerald-9.html).

2. **Activate user if payment successful** There is an option to make user account automatically active after success payment. This works good as well as with SDR as with RDS.

   - Set user activation mode _Admin_ in user manager global settings.
   - Enable user activation in global Emerald parameters.

     ![](/assets/img/screenshots/em-active1.png) 

  It will not only activate user, but attempt to login user.

# SAR - Subscription After Registration

This is noraml flow. User register through standard Joomla registration form or any other registration extension. And later user subscribe, when he is ready or required. 

- **Required** - In the system emerald plugin you may set parameter _Require Subscription_. In this case after login, user will not be able to navigate any page untill he finish subscription. Any link will redirect him to subscription selection page.

  This method is good if there is not integration of Emearld with registration extension you use, and you want to simulate 2 step registration, when after registration, user go to plan selector.

- **On demand** - is one of the most popular method. It is hard to get user pay immediately. So first you grant them some priviliges as registered users. For instance you can post topic in the forum. And then you offer even more features for members. After users get used to your site, they more likely to purchase.     


# RDS - Registration During Subscription

There is nor registration form here. When user click Subscribe or user try to access restricted area, he ends up on payment confirmation page. He only enter email and click checkout. Account is created automaticaly, email with access details is sent and user immediately redirected to payment gateway.

Note, if you want to make live of the users simplier, you can turn off user activation in Joomla User manager parameters. Then user will be even logged in automatically. Also we have special parameter to activate user account on success payment in global Emerald parameters.

This is very cool. We think that if user paid, it does not matter if email is wrong. User can immediately login.

### How to activate

In the plan edit form you may find special parameter.

# SDR - Subscription During Registration

This is when Emerald add subscription selector field to registration form. But this is limited to Joomla core and EasySocial right now.

1. User select plan on registration form and click register button.
2. User redirected to payment gateway and process purchase.
3. User come back and his account already activated if purchase succeeded and user already logged in.

As simple as that!

There are number of things you have to know in order to configure Emerald for SDR.

### How to activate

For core Joomla registration edit Emerald plugin in users plugin group and enable plan selector. For EasySocial enable custom field in fields manager.

### Plan selector is session based

What it means that during registration, plan that was selected by user is saved in session and after registration is complete on the next page, Emerald's system plugin checks, and if session plan selection found, redirects user to payment gateway.

For user it is like click register button and PayPal is the next page. Very seamlessly and straightforward. But you have to understand what is happening to prevent unauthorized access.

What if user do not process with payment through gateway and just return to the site? Account is created, but there is no payment.

- Make sure Emerald's system plugin is published.
- Enable require subscription in Emerald's system plugin.

What this will do is always redirect user to purchase plan or plan selector page, until user gets active subscription.

## FAQ

### What if I set require user email confirmation. User will be redirected to payment not being yet active. Will payment fail?

No. Payment will be ok even for not active user. He will be able to use it as soon as account is confirmed. The same true for manual account activation.
 