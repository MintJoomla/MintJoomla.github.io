---
layout: doc
title:  "Automatic articles check-in"
date:   2013-01-01 12:30:30
tags: cron setup
intro: "How to set up cron task that will automatically check-in all articles for last 30 minutes"
---
It is often happens that users do not close their articles properly after edit. And others (moderators and admins) cannot edit those articles. There is a special cron task which you can use. It will check in all checked out articles later than 30 minuts.

It make sense to configure to run command at least once a 30 minuts.

You can use `curl` or `wget` command. For example.

    wget http://mysite.com/index.php?option=com_cobalt&task=cron.checkIn&secret=123456

Where `secret` is the secret word you set in Cobalt global configuration.

This will trigger script to automatically check in articles.