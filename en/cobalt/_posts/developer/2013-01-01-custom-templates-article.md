---
layout: doc
title:  "Customize article templates"
date:   2013-01-01 12:30:30
tags: developer templates
---

<div class="alert">To understand this article please first read <a href="/en/cobalt/custom-templates-general/">Customize templates - general</a></div>

Basically when we talk about templates, we talk about Article and Articles List templates. The other templates may be easily styles and adjusted. 

Usually most important questions are about record fields.

<div class="alert alert-success">There is no better way to learn then to see code of other people. So please look code of templates to learn how it was used and what variables are possible to use.</div>

## Record Object

In the list or article full template you will see `$item` object that contain record.

`$item` contain as core properties like ctime, rating, hits, user_id and so one as fields. The core parameters are accessible like this:

	Hits: <?php echo $item->hits; ?>

### Q: How can see list of all available properties of record object?

To see all properties on `$item` object you can use this technique. Just add it anywhere in your template

	var_dump(get_object_vars($item));

### Q: How to get URL of the record?

If you want to get URL of the current record. I mean URL of the `$item` object you are working with

	<?php echo JRoute::_($item->url);?>

But if you need URL of the other record and you have only an ID

	<?php echo JRoute::_(Url::record($record_id));?>


## Record Fields

Object `$item` now contain fields organized differently

- `$item->fields_by_id` - array of record fields where field ID is the key of an array
- `$item->fields_by_key` - array of record fields where field key is the key of an array. 
- `$item->fields_by_group` - multilevel array of record fields where first level is the group of the fields and second are fields of this group.

There are 2 styles to display result of your fields. And it is very simple to make decision which one to use. You **have to** access fields from `fields_by_key` if you create template that have to support multiple types. If you create template for single type, you **may** use `fields_by_id` but `fields_by_key` is still recommended way to go.

Here is the example of accessing fuel by ID.

	<?php if(isset($item->fields_by_id[12])): ?>
		<span class="field-year">
			<?php echo $item->fields_by_id[12]->result; ?>
		</span>
	<?php endif; ?> 

And if you want to call field by key, you first have to get the key. You can either copy field key and paste into code or you can get `key` by field `ID` which would be better.

	<?php $key = $this->fields_keys_by_id[12];?>
	<?php if(isset($item->fields_by_key[$key])): ?>
		<span class="field-year">
			<?php echo $item->fields_by_key[$key]->result; ?>
		</span>
	<?php endif; ?> 

Above is the example which will support multiple types in the same template. Although you use only ID of the one particular field, you will get the same key as of the other field with the same Label and field type.

### Q: How do I know what is an ID of the field I need?

You can find field id in the list of the fields **(2)**

![Type and id](/assets/img/screenshots/typeandid.png)

## Field Object

Either `$item->fields_by_key[$key]` or `$item->fields_by_id[12]` is a field object and contain much more properties than `->result`.

Some of them are very useful. For example in the table you wand all fields of type _digits_ be aligned to right.

	<td<?php echo ($field->type == 'digits' ? ' align="right" ' : NULL ) ?>>
		<?php echo $field->result;?>
	</td>

Or `$item->fields_by_id[12]->params` has all parameters that you set during field creation. For example add class that was set in field parameters.

	<span class="my-class <?php echo $item->fields_by_id[12]->params->get('core.field_class')?>">
		<?php echo $item->fields_by_id[12]->result;?>
	</span>

Or use `$item->fields_by_id[12]->value` to get raw field data.

### Q: What is a field key?

_Field Key_ now is the part of multi type support in templates. You will not create this keys I just want to explain so you understand concept. Field key is and MD5 of field type and label.

	$field_key = 'k'.md5($field->label.'-'.$field->field_type); 

Lets, say field label is _Year_ and field type id _digits_. Then 

	$field_key = 'k'.md5('Year-digits'); 

Then if you call field by key, no matter what type it is, if it has field _Year_ type _digits_ it will be displayed in your template.

You can find keys in the DB column `key` in `jos_js_res_fields` table **(1)**.

![Field key](/assets/img/screenshots/fieldkey.png)

### Q: The result of the field contain HTML. How to get row text?

Most simple way to get text without any HTML formatting is.

	echo strip_tags($item->fields_by_id[12]->result);

### Q: How can I see all available properties of field object?

You can use the same technique to list object properties and later I'll make reference.

	var_dump(get_object_vars($item->fields_by_id[12]));
	
### Q: What are the available field types and how do I know what is the type in the current field?

You can find field type name in the list of the fields **(1)**

![Type and id](/assets/img/screenshots/typeandid.png)

## Setting Field In Parameters

This is very cool technique to manage, style or position individual fields.

For example there is field Price. And you want it to be shown in special place with a special style.

1. Add fieldlist parameter
	
		<fields name="tmpl_params">
			<fieldset name="name1" label="Position Fields" 
				description="Set fields to be positioned">
				<field name="field_price" type="meresourcesfields" label="Where is the price?" />
			</fieldset>
		</fields>
		
	<div class="alert alert-info">If any on your parameter link to field, its name have to start with `field_*`.</div>
	
	If you want only some type of fields to be shown in the list use `filters="'text', ' textarea', 'html'"`. This is who you can limit what types of the fields to show.
	
	if you want this field to by multiple select add `size="15"` and `mutiple="true"`

2. In template use something like this

		<?php if(isset($item->fields_by_key[$params->get('tmpl_params.field_price')])):?>
			<span class="price-tag">
				<?php echo $item->fields_by_key[$params->get('tmpl_params.field_price')]->result; ?>
			</span>
		<?php endif; ?>
	
And I do теo need to tell you how to style `.price-tag` class in your template css file.

### Q: What if I display explicitly only one field and rest I want to fetch and I do not want this field to be listed in the cycle?

After you called this field you may unset it from the field array.

	<?php if(isset($item->fields_by_key[$params->get('tmpl_params.field_price')])):?>
		<span class="price-tag">
	  		<?php echo $item->fields_by_key[$params->get('tmpl_params.field_price')]->result; ?>
	  		<?php unset($item->fields_by_key[$params->get('tmpl_params.field_price')]);?>
		</span>
	<?php endif; ?>

Then later when you fetch it won't be there.

