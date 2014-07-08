---
layout: doc
title:  "SQL values source"
intro:  "How to use SQL as values source in fields like select, checkbox, radio and others"
date:   2013-01-01 12:30:30
tags: developer fields
---
For some fields liek Radio, Checkbox, Select, Multiple Select, Listautocomplete Cobalt may use SQL query as a source of the values.

![SQL Source][i1]

[i1]: /assets/img/screenshots/sql-source.png

## Create SQL Query

Let me explain you how to use it on real example. Let's say you have Hikashop installed. And you want to create private or public support ticket system with Cobalt. And when people submit issues, you want them to select order to be more specific and easier for you identify problem. 

First you have to enable this awesome feature buy choosing yes in List values from SQL query. 

Now lets open DB in PhpMyAdmin or other tool you use and see what is order table structure. After learning how Hikashop store orders, we can create SQL query like this.
 
	SELECT `order_id` AS id, CONCAT('Order: ', `order_number`) AS text
	FROM `#__hikashop_order`
	WHERE `order_user_id` = [USER_ID]

Any query you create have to select 2 columns. And only 2 column name are allowed. Those are `id` and `text`. So you have to assign aliases for columns with `AS` instructor. 

Also note [USER_ID]. This is placeholder that will be replaced with the ID of the currently logged-in user. Right now no other placeholders supported but if you need one, just tell us and we will add.

If you do not know how to create your SQL queries, just copy your table (or whole DB) structure and post support topic on our [support desk][1] and will suggest.

[1]: http://support.mintjoomla.com/en/

That is basically it. If you setup the select field like this, your customers will get list of their orders. Of course you can make his field required to allow only those who purchased to submit tickets. 

## Process Into Link

Another important feature is a conversion of field value into link. In our example, let's say user have selected an order and submitted ticket. But when we display order name, we want it to уbe a link. This is what _Process into link_ parameter does.

You have to enter starting with index.php. For example: 

	index.php?option=com_hicashop&view=order&id=[ID]&Itemid=23

Enter like this. And it will be processed through standard Joomla routing. But you can also enter external links like 

	http://site.com/order.php?id=[ID]

Here is the list of available placeholders in URL 

- `[ID]` - is what is returned by SQL query in column aliased "AS id"
- `[USER_ID]` - replaced to ID of currently logged in user
- `[AUTHOR_ID]` - replaces with ID of the author of the record

# Use SQL Source to make relations

You can use SQL source to replace Parent/Child fields and create relations. It is much more simpler relations but sometimes or even mostly this is all you need.

1. This method will make your site little quicker
2. No templates, just the list of connected articles with link

## Create Query

So first we have to decide what section we connect to. Let's say it is a section ID 3

	SELECT id, title AS text FROM #__js_res_record WHERE section_id = 3

This is was a simplest query. Now let's say you have many types in that section ID 3 and you want only type ID 6 to be used.

	SELECT id, title AS text FROM #__js_res_record WHERE section_id = 3 AND type_id = 6

Now let's say you want only from category 2 and 3.

	SELECT r.id, r.title AS text 
	  FROM #__js_res_record AS r
	 WHERE r.section_id = 3 
	   AND r.type_id = 6
	   AND r.id IN (SELECT record_id from #__js_res_record_category WHERE catid IN(2,3))

And another complicated example. For example you want all records from category there value of select field equal to 20114.

	SELECT r.id, r.title AS text 
	  FROM #__js_res_record AS r
	 WHERE r.section_id = 3 
	   AND r.type_id = 6
	   AND r.id IN (SELECT record_id from #__js_res_record_values WHERE field_value = '2014')

That was conditions. But what if you want to select more then just title but also some field value or date?

	SELECT id, 
	       CONCAT(title, '<br><small>On: ', DATE_FORMAT(ctime, '%d %M %Y') ,'</small>') AS text 
	  FROM #__js_res_record 
	 WHERE section_id = 3

or show value or the field ID 3

	SELECT r.id, 
	       CONCAT(r.title, '<br><small>Year: ', (SELECT field_value FROM #__js_res_record_values WHERE record_id = r.id AND field_id = 3) ,'</small>') AS text 
	  FROM #__js_res_record AS r
	 WHERE r.section_id = 3


## Create Link

Now we can use link processing parameter to create links. Simply insert there something like 

    index.php?option=com_cobalt&view=record&id=[ID]&Itemid=140

For correct conversion do not forget `Itemid` parameter which you can look in the URL in the section where that article is located.



