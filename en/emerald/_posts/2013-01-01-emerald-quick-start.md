---
layout: doc
title:  "<b>Emerald Quick Start</b>"
date:   2013-01-01 13:30:30
tags: setup
---

## 1. Overview

Emerald is a **Joomla Membership** extension. Another words it allows you to restrict some pages or actions on your website on payment base byt creating subscription plans.

Emerald is an oldest membership Joomla extension and very mature. It has almost any feature you need and may be configured to mach any subscription scenario.

Emerald has it's own unique algorithm that allows to restrict any 3d party extension without need of special integration.


## 2. Install

There are 5 emerald elements.

1. Emerald **component**.
2. Emerald **plugins** (system, user, content).
3. **Actions** - triggered after success subscription. Something like move user to additional group, run SQL query and so on.
4. **Rules** - although Emerald may restrict any extension without integration, rules are restriction adapters and may allow to create more advanced restriction rules.
5. Payment **gateways**.

You can install them separately. But Emerald is distributed in a form of installation package which will install all elements. In basic package you will get only free elements.

- Download Emerald package `pkg_emerald.j3.v.9.xx.zip`.
- Install it as usual Joomla extension.

## 3. Setup

### Publish plugins

Open plugin manager and search plugins by word "emerald". You wills see 3 plugins. Publish all of them.

![](/assets/img/screenshots/em-qs-publishplugins.png)

### Create menu elements

Got to Menu / Menus / User menu / Add new menu item

![](/assets/img/screenshots/em-qs-usermenu.png)

Chose Emerald / Control panel

![](/assets/img/screenshots/em-qs-menuelement.png)

And make this menu element accessible only for special.

Here is how it should be set up.

![](/assets/img/screenshots/em-qs-menuelementall.png)

And now save this menu element.

- For user menu create another element to _Subscription history_ for registered users.
- And another element of _Subscription plans_ to main menu with name **Join Now** for public users.

### Configure

Now open emerald configuration.

![](/assets/img/screenshots/em-qs-cnfmenu.png)

And set menu elements you've just created.

![](/assets/img/screenshots/em-qs-config.png)

And configure other options as you wish.

## 4. Emerald Management

Very important to understand that **emerald is a frontend extension**. It means that create plans, manage subscriptions, create coupons or any other actions that is classically used to be managed in backend, now moved to frontend.

I know, for some peopel at first it may sounds weired and senseless. But let me try to convince you that this is indeed the way to go.

1. Just start to use it and you will love it. In few minutes you will experience that managing from frontend is much more convenient. You do not need to jump between backend and frontend.
2. Think of possibilities this approach opens. With proper rights management (which is Emerald 10 roadmap) users will be able to create they own subscription plans and sell something on your site with their own subscriptions. This allows you to use membership site as SaaS or simply multi-vendor.

Now open your site frontend and login. Click _Emerald Control panel_ link in user menu we have just created earlier. You will land to Emerald control panel.

![](/assets/img/screenshots/em-qs-cp.png)

## 5. Create group

Before we create restriction plan we have to create group or you might think of it as plan category.

Click _Groups_ icon in control panel and then add button.

![](/assets/img/screenshots/em-qs-addgroup.png)

Enter group/category name and description. Description is what user will see before list of the plans of this group. You can enter here any useful general information about plans.

![](/assets/img/screenshots/em-qs-groupform.png)

You also can choose template for this group. There are 2 templates provided with emerald by default. You can read more about template in [How to customize templates](/en/emerald/emerald-templates/) article.

## 6. Create plan

The last step is to create restriction plan. this part may be bit complicated as plan contain many parameters and it may take time to learn them all. But you do not need them. You only need to know few main parameters.

In Emerald admin menu click _Plans_ and then _Add_ button..

![](/assets/img/screenshots/em-qs-adminmenu.png)

### General Settings Tab

1. Enter plan name and select group.
2. Enter plan price.
3. Set plan period.
4. Set currency and price formatting.

This is all we need to set on this tab. To learn all parameters, read [Plan parameters](/en/emerald/plan-parameters/) article.

![](/assets/img/screenshots/em-qs-plan1.png)

### Restrictions Tab

Now you have to add restriction rules. rules are bonded to components.

1. Select component you want to restrict.
2. Configure parameters.
3. Save rule.

![](/assets/img/screenshots/em-qs-plan2.png)

You may add as many rules to plan as you want. Even few rules for the same component.

Rules are based on adapters. If special adapter for chosen component is found, then it is used to control this rule. It adapter is not found universal restriction adapter is used. You may [develop your own adapter](/en/emerald/create-rule-adapter/) if you want some special restriction checks to be done.

### Actions Tab

Actions tab is not necessary for minimum setup but you can [learn everything about actions here](/en/emerald/plan-actions/).

### Payment Gateways Tab

Foe every plan you have to configure at leas one payment gateway unless your plan is free (price = 0).

1. Click on gateway name to unfold its properties.
2. Click _Enable_ parameter.
3. Configure according instruction.

![](/assets/img/screenshots/em-qs-gateway.png)

### Cross Plans Tab

This parameters are not necessary for minimum plan setup but you can [read all about those parameter in this article](/en/emerald/plan-parameters/).

### Alerts Tab

Here you can setup what email messages will be sent to user. One important note that if you want multilingual alerts you can use constants like for example `ALERT_PLAN_NAME_SUCCESS` in subject and message body and override those constants in Joomla language manager / Overrides.

You also have to configure cron task in order expire alerts to be sent. Cron is triggered through URL. You can set following cron task at least once a day.

    wget http://mysite.com/index.php?option=com_emerald&task=cron.send_expire_alerts&secret=123456

Where `secret` is a text that you set in Emerald global parameters.

## 7. Conclusion

Emerald is simple to learn and very straightforward extension but at the same time advanced with almost any feature you could dream about.

Enjoy!