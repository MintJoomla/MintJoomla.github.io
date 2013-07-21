---
layout: doc
title:  "How to have Cobalt to send email alerts"
date:   2013-01-01 12:30:30
tags: cron setup
---
First of all, emails are not good. People does not like that. That is why every user in Joomla has choice to turn it off regardless your settings. Every use can decide either he wants to receive only notifications or also email alerts to be sent daily, weekly or monthly.

![ex](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/2012-11-06_12-16-39.png)

Cobalt does not send any emails automatically. That is because there may be thousands of emails generated every click. For example you added comment. Let's assume that 1000 users is subscribed/follow this article. Then before you get to the next page, you will have to wait till 1000 notification emails are sent. That can severely slow down Cobalt.

You have to configure your cron job to send email alerts.

The command that you can use is this.

    wget http://[site name]/index.php?option=com_cobalt&task=cron.sendAlert&secret=123456

Where `secret` is the secret word you set in Cobalt global configuration.

You have to set it to be run not less then once per 5 minutes for immediate alerts. Cobalt will automatically determine what to sent, immediate alerts or weekly once.