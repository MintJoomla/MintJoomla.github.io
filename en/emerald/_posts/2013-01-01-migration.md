---
layout: doc
title:  "Migration from Emerald 8 or Mighty Membership"
date:   2013-07-01 12:30:30
tags: setup
---

Emerald 9 has completely new DB structure. Thus simple update of extension will work. You have to migrate. And Emerald 9 out of the box has migration plugin for Emerald 8 and Mighty Membership.

## Step 1

<div class="alert alert-error">This is most crucial step. Please make backup of your Joomla DB before you proceed.</div>

## Step 2

Create Joomla 3 website.

There are 2 methods to update your Joomla. One is update 1.5/2.5 to 3, and another one is setup new Joomla 3.x.

### Step 2a (update from old Joomla to Joomla 3)

Either you update from Joomla 1.5 or Joomla 2.5 the process is the same. Read [Joomla wiki](http://docs.joomla.org/How_do_I_upgrade_from_Joomla!_1.5_to_3.x%3F) for more details.

1. Unpublished and uninsltall all Emerald 8/Mighty Membership plugins.
2. If you update from Joomla 2.5 with Emerald 8 Delete `com_emerald` folders in `components` and `administrator/components` folders.
3. Update Joomla keeping all users in DB

If you updated Joomla then `_jcs_*` tables should be already in the DB. Just make sure those tables are there.

### Step 2a (install new Joomla 3)

1. Install new Joomla
2. Migrate your users from old Joomla to new. Make sure you keep the same user IDs.
3. Dump all `_jcs_*` tables on your old site DB and import into new DB. Make sure prefixes are the same.

### Step 2 Summary 

It does not matter what method you are using, you have to make sure:

1. All tables `_jcs_*` are in the same database where you are going to install Emerald 9.
2. Users from old site are all in new Joomla 3 DB with the same IDs.

This is all we need for success import.

## Step 3

When you updated to Joomla 3 series and it is up and running, and you can access backend and frontend, you may go and install **Emerald 9**. Install and set it up.

For more details on that read Emerald [quick start](/en/emerald/emerald-quick-start/).

## Step 4

Now open Emerald dashboard/control panel and you will find Import section there.

![](/assets/img/screenshots/em-imp-cp.png)

Open import and you will see _Emerald 8_ importer. This one works as good for Mighty membership since DB structure is the same for both.

![](/assets/img/screenshots/em-imp-emr.png)

How click import button.

![](/assets/img/screenshots/em-imp-last.png)

There is one parameter. If you do not want to import subscriptions that already ended you can turn it on. But we recommend to import all subscription for analytics purpose.

## Step 5

First edit group that was created by importer. At least one group have to be created for Emerald to function. Name it as you want.

Now you have to edit all your plans and configure it. Since DB is completely different, plans was created but empty. We cannot migrate plans options as it is stored in very special way.

Edit all plans and set price, period, restriction rules and configure gateways.

That is it. You have just finished hassle free migration.

