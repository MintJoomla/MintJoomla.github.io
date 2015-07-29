---
layout: doc
title: "Improve Cobalt performance"
date: 2013-07-22 18:00:00
tags: other
intro: "How to make Cobalt work faster."
---

Cobalt is the quickest CCK for Joomla for sure. I am glad that improving speed is not the greatest concern for all Cobalt users, because it is very good at it by default, even with all features turned on.

But if you want to ensure that it uses it's maximum performance capabilities, there are some tips that can help you to understand when and what can slow performance down.

## Rule of thumb

There is additional code behind almost every parameter. Some codes are simple, some may affect performance. The rule here is simple:

<div class="alert alert-success">Turn <b>OFF</b> everything you do not use. Turn <b>OFF</b> everything you use but you can live without if not active. Only use features you really need and can't renounce to.</div>

## Section parameter "Category count mode"

If it is set to smart count it uses additional `WHERE` in SQL query. _Fast count_ just count all records but _Smart count_ try to find only published, not hidden, not expired and so on. 

If in your section you use category records count and do not have unpublished records, and users cannot hide records and there are no expired records, simple use _Fast count_ mode. 

## Section parameter "Mark new records"

Although this sounds easy, there is complex algorithm behind. What articles user had not yet opened? What user? What if it is public user? This algorithm is based on user data, sometimes session and cookies. If you do not need to mark articles as unread, turn this off.

## Records `ctime` and `extime`

Every record has two important time marks. `ctime` - the first time to be shown in the list and `extime` - time of expiration. To implement that something like this is added to query.

	AND ctime < '2013-08-04 03:25:22'
	AND (extime = '0000-00-00 00:00:00' OR extime > '2013-08-04 03:25:22') 

But very often these features are not used in the section at all. You may turn 2 section parameters "Who can see future articles" and "Who can see expired articles" to _Public_. With these limiting condition on, the extra query will not be added.

## Order by fields

If you have a lot of articles in one section, then it is good to avoid if possible sorting them by field.

DB should first order all your articles in section and only then apply limit. This require to load all records to memory.

## Show restricted

Section has parameter "Who can see restricted". This allows to show list of articles that user do not have full access to.

To check these restrictions there is an additional query `WHERE` to the DB. So if it is not important that a user can see restricted articles in the list, allow everyone to see restricted articles in the list.



 
