---
layout: doc
title:  "Automatic articles check-in cron task"
date:   2013-01-01 12:30:30
---
It is often happens that users do not close their articles properly. And others cannot edit those articles. There is a special cron tast which you can use. It will check in all checked out articles later than 30 minuts.

It make sense to configure to run command at least once a 30 minuts.

You can use `curl` or `wget` command. For example.

    wget http://mysite.com/index.php?option=com_cobalt&task=cron.checkIn&secret=123456

Where `secret` is the secret word you set in Cobalt global configuration.

This will trigger script to automatically check in articles.