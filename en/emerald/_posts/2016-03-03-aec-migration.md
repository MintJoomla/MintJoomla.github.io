---
layout: doc
title:  "Migration from AEC Membership Manager"
date:   2016-03-03 12:30:30
tags: setup
intro: "Instruction how to migrate membership from AEC to Emerald."
---

When first version of Emerald (under name JContentSubscritpion) was released, there was not other membership extension apart from AEC. Emerald was first Joomla only extension and AEC cane to Joomla from Mamba. JContentSubscription was released even earlier that Joomla 1.0 stable.

And now look where we are, AEC EOT.

We know how frustrating it might be, when membership extension is not supported anymore. That happen to AkeebaSubscription recently. So we created special Emerald layer to simplify any migration. Based on this layer we can quickly create migration plugins. We already have one click migrations for:

- AEC
- AkeebaSubscription
- OSE membership
- OS Membership Pro
- Emerald 8
- Mighty Membership

Good news, we do not plan Emerald EOT (We even have Emerald 10 almost ready) and we have one click migration for you. And you now official oldest supported membership extension. We are doing this so long that Emerald have almost any possible feature. So you will not lose functionality.

## Migration proccess

1. Put your site offline.

2. Install Emerald. Follow [Quick Start][1] instruction.

3. Open Emerald control panel and select Import icon.

4. Now select AEC migrator (or any other). You have only one parameter there if we have to import only active subscriptions or all. It is good to import all if you want to keep history and it is good to import only active if you want a little cleanup.

5. Click _Import_ button

   That is it. Wait for a while and it is done. Everything ерфе is possible to migrate will be migrated.

   All migrations has limitations. It is not always possible to migrate everything. For example AEC stores all transactions under the same subscription and under the same invoice number. That is not how it works in Emerald. Every transaction has it's own invoice number. So we lose transactions during migration. 

6. Now, before you publish your site online you have to:

   - Edit Plan's group.
   - Edit plans. Look through all parameters and set what you want. All restrictions, email alerts and such. All subscriptions are imported with not activated status. So when user come to your site after publish, activation process will be triggered. So if you have any [actions][2], those will be triggered too.

7. If you had PayPal recurring payments, transactions already made will continue to send IPN requests to extend subscription to AEC. So we have to transfer those requests to Emerald. For that find `components/com_emerald/library/imports/aec/acctexp.php` and replace `components/com_acctexp/acctexp.php`. This will not only transfer IPN requests, but redirect users who open old links to new Emerald equvalets.

8. Now you are ready to publish your site.


[1]: http://docs.mintjoomla.com/en/emerald/emerald-quick-start
[2]: http://docs.mintjoomla.com/en/emerald/plan-actions