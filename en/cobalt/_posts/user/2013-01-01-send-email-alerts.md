---
layout: doc
title:  "Send email alerts"
date:   2013-01-01 12:30:30
tags: cron setup
intro: "How to configure Cobalt to send email alerts with notifications."
---

## Good practice

Sending email alerts immediately by default is not a good practice for 2 reasons. 

1. People don't like it. Especially if you have an active site, a user can receive dozens of emails daily **your IP address can easily get into spammers lists and be blocked**.  

   That's why every user in Cobalt has a choice to turn off email notification regardless of your section settings. Every user can choose to receive email alerts daily, weekly or monthly or to not receive any email alert at all.

   ![](/assets/img/screenshots/email-send-settings.png)

   It is important to provide subscribers an opt-out to stop receiving emails. Your notifications won't be flagged as spam if they have an unsubscribe instruction at the bottom of the email. To prevent you for being blacklisted, this instruction is included automatically. 

2. There may be thousands of emails generated at each click, which will negatively affect your site's performance. Example: You post a comment to an article. Let us assume that 1000 users are subscribed/following this article. Then before getting to the next page, you will have to wait until 1000 notification emails are sent. This can severely slow down you site.

## How to configure

You have to configure a cron job in order to send email alerts.

The command that you can use is this.

    wget http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456

Sometimes `wget` command is not accessible or not installed. In this case you might want to use `curl` or `lynx` instead. Here are some examples.

    lynx -source http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456

    curl -c --url "http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456"

    curl -A "cobaltcron" "http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456"

Where `[site name]` is the root of your Joomla instance and `secret` is the secret word you set in Cobalt global configuration.

![](/assets/img/screenshots/cron-secret.png)

Please don't configure this cron task to be executed less then once per 5 minutes for immediate alerts. Cobalt will automatically determine what to sent, immediate alerts or weekly once.
