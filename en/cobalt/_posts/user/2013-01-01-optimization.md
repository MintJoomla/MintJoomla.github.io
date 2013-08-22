---
layout: doc
title: "Improve Cobalt performance"
date: 2013-07-02 18:00:00
tags: other
intro: "How to have Cobalt to work quicker."
---

Cobalt is quickest CCK for Joomla for sure. I am glad that improving speed is not greatest concern for all Cobalt users, because it is very good at it by default, even with all features turned on.

But if you want to ensure that it uses it's maximum performance here are the tips that can help you to understand when and what can slow performance down.

## Rule of thumb

There are an additional code behind almost every parameter. Some codes are simple, some may affect performance. The rule here is simple. 

<div class="alert alert-success">Turn <b>OFF</b> everything you do not use. Turn <b>OFF</b> everything you use but you could survive without or giveup. Only use features you cannot live without.</div>

## Section parameter "Category count mode"

If it is set to smart count it uses additional `WHERE` in SQL query. _Fast count_ just count all records but _Smart count_ try to find only published, not hidden, not expired and so on. 

If in your section you use category records count and do not have unpublished records, and users cannot hide records and there are no expired records, simple use _Fast count_ mode. 

## Section parameter "Mark new records"

Although this sounds easy, there is complex algorithm behind. What articles user had not yet opened? What user? What if it is public user? This algorithm is based on user data, sometimes session and cookies. If you do not mark articles as unread, turn this off.

## Records `ctime` and `extime`

Every record has to important time marks. `ctime` - time of start to be shown in the list and `extime` - time of expiration. To implement that something like this is added to query.

	AND ctime < '2013-08-04 03:25:22'
	AND (extime = '0000-00-00 00:00:00' OR extime > '2013-08-04 03:25:22') 

But very often this features are not used in the section at all. You may turn 2 section parameters "Who can see future articles" and "Who can see expired articles" to _Public_. Then this limiting condition will not be added.

## Order by fields

If you have a lot of articles in one section, then it is good to avoid if possible sorting them by field.

DB should first order all your articles in section and only then apply limit. This require load all records to memory.

## Show restricted

Section has parameter "Who can see restricted". This allows to list articles that user do not have access to in the list but still not access to full view.

To check restrictions in the query is an additional `WHERE` conditions in the query. So if it is not important is user can see restricted articles in the list, allow everyone see restricted articles in th list.



 