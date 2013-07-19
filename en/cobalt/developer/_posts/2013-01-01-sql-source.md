---
layout: doc
title:  "How to use SQL as values source in fields like select, checkbox, radio and others"
date:   2013-01-01 12:30:30
---

![SQL Source][i1]
[i1]: https://s3.amazonaws.com/adwsfiles/thumbnails/2012-4/sqlsource.PNG

### Create SQL Query

Let me explain you how to use it on real example. Let's say you have Hikeshop installed. And you want to create private or public support ticket system with Cobalt. And when people submit issues, you want them to select order to be more specific and easier for you identify problem. 

First you have to enable this awesome feature buy choosing yes in List values from SQL query. 

Now lets open DB in PhpMyAdmin or other tool you use and see what is order table structure. After learning how Hikashop store orders, we can create SQL query like this.
 
	SELECT `order_id` AS id, CONCAT('Order: ', `order_number`) AS text
	FROM `#__hikashop_order`
	WHERE `order_user_id` = [USER_ID]

Any query you create have to select 2 columns. And only 2 column name are allowed. Those are `id` and `text`. So you have to assign aliases for columns with `AS` instructor. 

Also note [USER_ID]. This is placeholder that will be replaced with the ID of the currently logged-in user. Right now no other placeholders supported but if you need one, just tell us and we will add.

If you do not know how to create your SQL queries, just copy your table (or whole DB) structure and post support topic on our [support desk][1] and will suggest.

[1]: http://support.mintjoomla.com/en/cobalt-7.html

That is basically it. If you setup the select field like this, your customers will get list of their orders. Of course you can make his field required to allow only those who purchased to submit tickets. 

### Process Into Link
Another important feature is a conversion of field value into link. In our example, let's say user have selected an order and submitted ticket. But when we display order name, we want it to уbe a link. This is what _Process into link_ parameter does.

You have to enter starting with index.php. For example: 

	index.php?option=com_hicashop&view=order&id=[ID]&Itemid=23

Enter like this. And it will be processed through standard Joomla routing. But you can also enter external links like 

	http://site.com/order.php?id=[ID]

Here is the list of available placeholders in URL 

- [ID] - is what is returned by SQL query in column aliased "AS id"
- [USER_ID] - replaced to ID of currently logged in user
- [AUTHOR_ID] - replaces with ID of the author of the record