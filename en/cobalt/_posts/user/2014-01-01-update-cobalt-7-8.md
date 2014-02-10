---
layout: doc
title: "Update Cobalt from 7 to 8"
date: 2013-01-01 18:00:00
tags: other
intro: "How to safely update from Joomla 2.5 to Joomla 3 series."
---

There are 2 main update methods.

1. Install new Joomla version and Cobalt and transfer everything to Cobalt.
2. Update your Joomla with cobalt from 2.5 to 3 and then update Cobalt.

### 1. New Joomla

I have found this way better. You have clean install and you are sure there are no old files left exigently.

1. Install new Joomla 3 series.
2. Install Cobalt pack and media pack.
3. Now you have to transfer all your users. For that start with SQL patch on your old Joomla 2.5 DB.

       ALTER TABLE `jos_users` ADD COLUMN `lastResetTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' AFTER `params`,
      		  ADD COLUMN `resetCount` int(11) NOT NULL DEFAULT '0' AFTER `lastResetTime`,
      		  ADD COLUMN `otpKey` varchar(1000) NOT NULL DEFAULT '' AFTER `resetCount`,
      		  ADD COLUMN `otep` varchar(1000) NOT NULL DEFAULT '' AFTER `otpKey`;
   
   This query will make users table the same as it is in J! 3. 
4. Remane table `#__js_res_field_miltilevelselect` to `#__js_res_field_multilevelselect`.
5. make sure that table prefixes are the same on both DBs. If not, you can use Akeeba admintools to mass change prefixes.
6. Now create dump of all `#__js_res_*` tables and `#__users`, `#__user_usersgroup_map`
7. Edit this dump file. At the very top you will find queries to create DB and use that DB. Something like that.
   
       CREATE DATABASE  IF NOT EXISTS `joomla_mint` /*!40100 DEFAULT CHARACTER SET utf8 */;
       USE `joomla_mint`;
       
   Make sure that DB names conform to DB name on your new Joomla.
8. Load this dump into new Joomla.
9. That is it. You may proceed to final steps. 


### 2. Update Joomla

This is probably worst method. Because when I was trying to update Joomal from `2.5.7` to latest `3.2.1` I could not. I always had a lot of errors. Even the fact that I am 10 years experienced full time Joomla developer, and I tried to apply SQL patches manually, and I edited update package to stop some processes, I had failed. 

But if you finally managed successfully update Joomla then you can proceed to the final steps.

### Final Steps 

1. Install latest Cobalt. Cobalt use it's own DB update mechanism. It is not based on standard Joomla SQL files update mechanism. That was not very reliable way. 
   
   On every build, Cobalt makes snapshot of current DB and save it in `JSON` files. And on install, Cobalt compare DB to snapshot and apply required changes. Thus you may be sure no matter what was changes during Cobalt development, after install latest version you have very current DB structure.
2. Edit sections, types, template parameters and even some fields to alter it's settings.

Note that most changed part of Cobalt 8 comparing ro Cobalt 7 is templates. First it is changed how templates store settings, so you need to edit all settings of templates. Second templates looks differ, so most probably you will have to restyle them.


