---
layout: doc
title:  "Send email alerts"
date:   2013-01-01 12:30:30
tags: cron setup
intro: "How to configure Cobalt to send email alerts with notifications."
---

## Good practice

Sending immediate email alerts by default is not good practice for 2 reasons. 

1. People does not like that. Especially if you have active site, user can receive dozens of emails daily **your IP address can easily get in to spamers list and be blocked**.  

   That is why every user in Cobalt has a choice to turn it off regardless your section settings. Every user can decide either he wants to receive email alerts daily, weekly or monthly or do not receive any email alert at all.

   ![](/assets/img/screenshots/email-send-settings.png)

   The reason why we necessarily provide for user ability to stop receive emails, because until email alert has unsubscribe instruction at the bottom of the email, it is not considered to be spam. And we include this instruction automatically. 

2. There may be thousands of emails generated every click and affect performance. For example you added comment. Let's assume that 1000 users are subscribed/following this article. Then before you get to the next page, you will have to wait till 1000 notification emails are sent. That can severely slow down you site.

## How to configure

You have to configure your cron job to send email alerts.

The command that you can use is this.

    wget http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456

Where `[site name]` is the root of your Joomla instance and `secret` is the secret word you set in Cobalt global configuration.

![](/assets/img/screenshots/cron-secret.png)

You have to configure this cron task to be executed not less then once per 5 minutes for immediate alerts. Cobalt will automatically determine what to sent, immediate alerts or weekly once.