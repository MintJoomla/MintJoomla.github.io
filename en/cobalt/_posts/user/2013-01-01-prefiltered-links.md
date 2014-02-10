---
layout: doc
title:  "Create pre-filtered links"
date:   2013-01-01 12:30:30
tags: filters setup
intro: "Create link that will automatically apply filter to list of the articles."
---

What if you what to create link in menu (or anywhere else), that can automatically set search filters you want for articles list? For example: _Events for the next 14 days with location 20 miles within the London_. You can easily do it with new Cobalt filter interface.

## 1. Create URL

After dramatic recoding all filtering mechanism, we ended up with filter interface to which you can communicate through special URL.

	http://www.com/index.php?option=com_cobalt&task=records.filter&...

Here are all parameters that you can add to this URL.

Parameter			| Req.      | Description
------------------|-----------|------
section_id			| ![Yes][1] | Set section ID
Itemid				| ![Yes][1] | Menu Itemid. Please set Itemid of menu that you set in section itemid parameter
cat_id				| ![No][2]  | Category ID if you want to filter in particular category only
filter_name		| ![Yes][1] | Array of the name of the filters. Explained later.
filter_val			| ![Yes][1] | Array of the values of the filters. Explained later.

[1]: /assets/img/tick.png
[2]: /assets/img/cross.png

After user click URL, filters will be set and user will be redirected to standard articles list URL. That is why we need section ID, Itemid and category ID. To land user to correct page. So please do not forget to set those parameters correctly.

## 2. Set Filters

`filter_val` and `filter_name` are arrays that set filters. You can add as many of them as you want. Here is the example.

	&filter_name[0]=filter_tag&filter_val[0]=2

This is to show all articles with tag ID 2.

### Standard filters

This table show you list of available standard `filter_name` and their `filter_val`.

Filter name   | Filter value | Description
--------------|--------------|-------------
filter_tpl		| default		| Name of the article list template
filter_cat		| 2				| ID of the category
filter_user	| 42			| ID of the user
filter_tag		| 2				| ID of the tag
filter_type	| 1				| ID of the content type
filter_search	| what is life	| Search string

Here is an example. It should be one line. I have formatted it just to make it more readable.

	http://www.com/index.php
		?option=com_cobalt
		&task=records.filter
		&section_id=2
		&item_id=126
		&filter_name[0]=filter_type
		&filter_val[0]=2
		&filter_name[1]=filter_user
		&filter_val[1]=42

This example will show all records of User Super Admin (ID 42) and content type ID 2.

### Fields filters

First you have to form filter name. It contains of prefix `filter_` and field key. So filter name may looks like this

	&filter_name[0]=filter_k2hgsd5FdK79H6Gfdt6hxnsgF55fd

Then, you have to set filter value. And it may be very different for every field but basically only 2 types. Single value may looks like this

	&filter_val[0]=value%201

Values have to be url encoded. You can see `%20` means whitespace. 

Or values may be an array

	&filter_val[0][]=value%201&filter_val[0][]=value%202

In this case it will look for records that contain `Value 1` OR `Value 2`

Sometimes it is important to identify array keys like for example for geo field.

	&filter_val[0][lat]=41.25458745&filter_val[0][lng]=21.2654789

But that is very exclusive. Only Geo and DateTime fields. For data time first set is a data _from_ and second date _to_

## How to reset filters through link.

Sometimes you need to reset all filters by URL or single filter.

#### Reset all filters

    index.php?option=com_cobalt
         &task=records.cleanall
         &section_id=2 
         &itemid=123

#### Reset individual filter

    index.php?option=com_cobalt
         &task=records.clean
         &clean[filter_k58596481bc7070e4adecd4f2e29569de]=1
         &section_id=2 
         &itemid=123

There are few parameters to insert to clean variable 

Filter Type       | Description
------------------|------------
`filter_search`   | Reset text search
`filter_type`     | Reset content type filter
`filter_tag`      | Reset tags filter
`filter_user`     | Reset user filter
`filter_alpha`    | Reset alpha index filter
`filter_cat`      | Reset category filter
`filter_[key]`    | This is to clean field filter. You have to change `[key]` to field key like it is in example above.

You may reset few filters at once

    index.php?option=com_cobalt
         &task=records.clean
         &clean[filter_k58596481bc7070e4adecd4f2e29569de]=1
         &clean[filter_type]=1
         &clean[filter_alpha]=1
         &section_id=2 
         &itemid=123

## Q: What is a field key?

_Field Key_ now is the part of multi type support in templates. Field key is and MD5 of field type and label.

	$field_key = 'k'.md5($field->label.'-'.$field->field_type); 

Lets, say field label is _Year_ and field type id _digits_. Then 

	$field_key = 'k'.md5('Year-digits');

You can find keys in the DB column `key` in `jos_js_res_fields` table.

![Field key][im2]

Or in the key column in fields manager  **(3)**.

![Field key][im3]

[im2]: /assets/img/screenshots/fieldkey.png
[im3]: /assets/img/screenshots/typeandid.png


