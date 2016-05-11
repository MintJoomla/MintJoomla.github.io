---
layout: doc
title:  "API reference"
date:   2013-01-01 12:30:30
tags: developer API
---
## Render an individual field

How to get the value of an individual field:

~~~php
echo CobaltApi::renderField($record, $field_id, $view, $default, $bykey);
~~~

- `$record` -  Record ID or record object which you get through `ItemsStore::getRecord($record_id)`.
- `$field_id` - ID of the field you want to render.
- `$view` - `full` or `list`. Render view - either article list or full article view. 
- `$default` - Default display value if nothing was saved in the field.
- `$bykey` - By default is is false. It tells either we get field by key or by ID. If it is true then `$field_id` is treated as field key.

Don't call it in list and full article templates to avoid unnecessary SQL queries. Every field value is accessible and already loaded there. 
<div class="alert">For a better understanding how to access field values in article list and full view templates, please read <a href="/en/cobalt/custom-templates-article/">Customize article templates</a></div>

## Rating calculation

You can calculate different rating summaries with this API.

~~~php
$rating = CobaltApi::renderRating($type_id, $section_id, $condition);
~~~

- `$type_id` - ID of the content type. This will be used to understand what is rating parameters. If it is multiple property rating or single property and how to calculate results.
- `$section_id` - ID of the section.
- `$condition` - SQL `WHERE` conditions. There is `r` alias used for `#__js_res_record` table. See examples.

This method will return `array`

- `$rating['html']` - This is ready to render HTML or current rating. It is created according to content type rating parameters.
- `$rating['total']` - Total result as number from 0 to 100 where 0 is nothing and 100 is maximum rating.
- `$rating['num']` - Total number of ratings given.
- `$rating['multi']` - If it is multiple property rating this is going to be an array with will contain `sum` and `num` per every property where `sum` is a total result as number from 0 to 100 per property and `num` is a total number of ratings given for this property. 
    
  ~~~php
  $rating['multi'][0]['sum'] = 50;
  $rating['multi'][0]['num'] = 2;
  $rating['multi'][1]['sum'] = 89;
  $rating['multi'][1]['num'] = 2;
  ~~~
	
	This means that property 1 (index 0) average 50% rating given in 2 ratings and property 2 is 89%.

#### Examples

With this data returned you may use it in all different ways. For example you want to get rating of the current use in given section.

~~~php
<?php $rating = CobaltApi::renderRating(1, 1, 'r.user_id = 10');?>
<div>
	Total <?php echo $rating['total'] ?> out of <?php echo $rating['num'] ?> votes!
</div>
~~~
	
## Items Store

On of the most useful helper in Cobalt API is `ItemsStore` class which allow you quickly get record, section, category or type object.

~~~php
$record = ItemsStore::getRecord($record_id);
$section = ItemsStore::getSection($section_id);
$type = ItemsStore::getType($type_id);
$category = ItemsStore::getCategory($cat_id);
~~~

This initialise parameters as well so you can get access to type or section parameters.

~~~php
$section->params->get('general.section_iid');
~~~
	
`$record` will not contain fields.

## Url

Another important class is Url. It created Urls.  It is important to use this class to create Urls for Itemid to attach to URL correctly.

Examples:

~~~php
<a href="<?php echo JRoute::_(Url::record($record)); ?>">
<a href="<?php echo JRoute::_(Url::records($section)); ?>">
<a href="<?php echo Url::add($section, $type, $category); ?>">
~~~

Note that urls to _add_ or _edit_ record already passed through `JRouter`.

`$record` or `$section` may be as object returned by `ItemsStore` or ID.

## Create new record

You can programmaticaly create new records. For that you can use API 

~~~php
CobaltApi::createRecord($data, $section_id, $type_id, $fields, $categories, $tags)
~~~

- `$data` is an array. The key of the array is the name of the column in `_js_res_record`. One parameter is required is a `title`. All other parameters like `alias`, `published`, `access` will be set acording to your type parameters. Of course if you set then here, those will be overwriten. 
- `$section_id` id of the section
- `$type_id` id of record type
- `$fields` is an array of fields. The key is an ID fo the field. For example you want to set fields 12 and 34
   
      [
	    12 => ...
		34 => ...		
      ]
	
  What to put as fields value? You can find it on Cobalt record form. Just look what values this or that field have. For emaple Status field has a single  integer value so ti will be like `12 => 2` and Select field has an array of values `12 => ['value 1', 'Value 2']`.
- `$categories` array of categories you want to put this record to. Even if it is only one category, should be an array `[2]` or `[2,15,36]`
- `$tags` list aof tags. String array `['Tag 1', 'Tag 2]`

For example:

~~~php
CobaltApi::createRecord(
	[
		'title' => 'test 3',
		'access' => 1 
	],
	4, //section
	5, // type
	[
		65 => 5,
		67 => ['Red', 'Blue']
	], // fields
	[14], //categpries
	['joomla', 'moomla'] // tags
);
~~~

`[]` is a new syntax for PHP array defenition. So `[11]` is equal to `array(11)`.

## Update Record

To update record use 

~~~php
CobaltApi::updateRecord($redord_id, $data, $fields, $categories, $tags);
~~~

- `$record_id` - id of the edited record.
- the rest is just like in `CobaltApi::createRecord()`