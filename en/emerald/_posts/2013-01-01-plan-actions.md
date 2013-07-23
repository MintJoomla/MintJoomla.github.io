---
layout: doc
title:  "Plan actions"
date:   2013-01-01 12:30:30
tags: plan
---

## Overview

Actions are the codes that are triggered when user subscription was activated and when user subscription expires.

It is important to understand that in fact actions are triggered not at the moment on user subscription activation but at the moment of user first time use it.

For example let's say you created user subscription for user _Joe_. None of the actions will be triggered at that moment. But when _Joe_ login Emerald will check if there are active subscriptions that did not trigger their actions, then Emerald runs those actions.

Why? Because we want user to be logged in at the moment we run actions. For example it is affiliate integration action which sends query to affiliate application. In most cases affiliate apps relay on cookies. Thus to subtract commission we have to pass cookies along the way and this is possible only if action will be triggered on _Joe's_ browser.

## Add actions

To add action to plan.

1. Edit subscription plan and open Actions tab
2. Select action you need.
3. Fill the form.
4. Save.

![](/assets/img/screenshots/em-qs-plan3.png)

## Actions list

This is a list of all available actions and what they can do.

Action           | Description
-----------------|------------
**User Group**   | Move user to Joomla desired group. Note that subscription plans are already considered as user groups. You need this action only if you use Joomla core ACL to add additional restrictions.
SQL Query        | Runs custom SQL queries on subscription activated and disactivated events.
AMIGOS           | Integrates with [AMIGOS Affiliate Tracking](http://dioscouri.com/joomla-extensions/amigos-affiliate-tracking)
iDevAffiliate    | Integrates with [iDevAffiliate](http://www.idevdirect.com/)
Google Analytics | Add tracking code and let Google Analytics to register goal and amount paid. Then you will see your sale reports in [Google Analytics](http://www.google.com/analytics/)
Hook URL         | Send `POST` request to given URL with purchase details.
Custom JavaScript| Any piece of javascript code. There are a lot of applications that integrates with simple placing JS code on the page.

## Custom Action

You might want to create your own action. Then read [this article](http://localhost:4000/en/emerald/create-action).
