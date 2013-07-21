---
layout: doc
title:  "API reference"
date:   2013-01-01 12:30:30
tags: developer API
---

<div class="alert">This is ongoing article. I'll add here small tricks and tips along the way. Please follow/subscribe this article to get alerts when I edit this article</div>

## Render individual field

You can easily get value of individual field.

	echo CobaltApi::renderField($record, $field_id, $view, $default);

I do not recommend to call this in list and full article templates as this method require some additional SQL queries to load field and all fields are already loaded there. You can use it in cases where record fields are not accessible.

- `$record` -  might be record ID or record object with you get with `ItemsStore::getRecord($record_id)`.
- `$field_id` - ID of the field you want to render.
- `$view` - `full` or `list`. Chose how you want to render this field as it would be renderers in articles list or in full article view. 
- `$default` - if you want this field to show something even if there is nothing saved in record, set default value here.

## Rating calculation

You can calculate different rating summaries with this API.

	$rating = CobaltApi::renderRating($type_id, $section_id, $condition);

- `$type_id` - ID of the content type. This will be used to understand what is rating parameters. If it is multiple property rating or single property and how to calculate results.
- `$section_id` - ID of the section.
- `$condition` - SQL `WHERE` conditions. There is `r` alias used for `#__js_res_record` table. See examples.

This method will return `array`

- `$rating['html']` - This is ready to render HTML or current rating. It is created according to content type rating parameters.
- `$rating['total']` - Total result as number from 0 to 100 where 0 is nothing and 100 is maximum rating.
- `$rating['num']` - Total number of ratings given.
- `$rating['multi']` - If it is multiple property rating this is going to be an array with will contain `sum` and `num` per every property where `sum` is a total result as number from 0 to 100 per property and `num` is a total number of ratings given for this property. 
    
		$rating['multi'][0]['sum'] = 50;
		$rating['multi'][0]['num'] = 2;
		$rating['multi'][1]['sum'] = 89;
		$rating['multi'][1]['num'] = 2;
	
	This means that property 1 (index 0) average 50% rating given in 2 ratings and property 2 is 89%.

#### Examples

With this data returned you may use it in all different ways. For example you want to get rating of the current use in given section.

	<?php $rating = CobaltApi::renderRating(1, 1, 'r.user_id = 10');?>
	<div>
		Total <?php echo $rating['total'] ?> out of <?php echo $rating['num'] ?> votes!
	</div>
	
## Items Store

On of the most useful helper in Cobalt API is `ItemsStore` class which allow you quickly get record, section, category or type object.

	$record = ItemsStore::getRecord($record_id);
	$section = ItemsStore::getSection($section_id);
	$type = ItemsStore::getType($type_id);

This initialise parameters as well so you can get access to type or section parameters.

	$section->params->get('general.section_iid');
	
`$record` will not contain fields.

## Url

Another important class is Url. It created Urls.  It is important to use this class to create Urls for Itemid to attach to URL correctly.

Examples:

	<a href="<?php echo JRoute::_(Url::record($record)); ?>">
	<a href="<?php echo JRoute::_(Url::records($section)); ?>">
	<a href="<?php echo Url::add($section, $type, $category); ?>">

Note that urls to _add_ or _edit_ record already passed through `JRouter`.

`$record` or `$section` may be as object returned by `ItemsStore` or ID.
