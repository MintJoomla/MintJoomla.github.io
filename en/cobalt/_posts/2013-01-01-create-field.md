---
layout: doc
title:  "Create Cobalt 8 custom field"
date:   2013-01-01 12:30:30
tags: developer fields
---
All fields are stored in `components/com_cobalt/fields`. Every field is a separate folder. So let's start and create your first folder. Name it `test` for our tutorial.

The name have to be all small cases only latin characters. There is no difference how you name the folder. The name of the folder become a field type. 

Now inside this folder you have to create at least 3 files with the same name.

1. `test.php` - Executable PHP file that contain field main class
2. `test.xml` - Xml file that contain field metadata and field parameters.
3. `test.png` - 16x16 icon for the field. 
4. `tmpl/input/default.php` - default template to render form element
5. `tmpl/output/default.php` - default template to render element in the article
6. `tmpl/filter/default.php` - default template to render filter element

### test.png

We usually use icons from free [Fugue Icons][1] set. But you can use any 16x16 icon.  This file is optional. If you do not include it, default `text.png` icon will be shown.

[1]: http://p.yusukekamiyamane.com/

### test.xml

This xml file is very like any Joomla modules or plugins xml file.

	<?xml version="1.0" encoding="utf-8"?>
	<extension version="1.6" type="file" method="upgrade">
		<name>My Test Field</name>
		<group>Simple Form Elements</group>
		<author>Jon Doe</author>
		<authorEmail>jon@doe.com</authorEmail>
		<authorUrl>http://www.site.com</authorUrl>
		<license>GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html</license>
		<creationDate>March 2012</creationDate>
		<copyright>(c) 2012 jon Doe</copyright>
		<version>1.0</version>
		<description>
		<![CDATA[This is test field.]]></description>
		<config>
				
		</config>
	</extension> 

This is how field metadata may looks. There only 3 tags worth to mention.

**`<name>`**

This is visible name of your field that appear in filed list drop-down select.

**`<group>`**

Actualy you can use any text here. But fields with the same `group` will be combined in to group. You can place your field in one of the existing groups or create your own.

Group Name					| Description
------------------------|-------------
Simple Form Elements		| Simple elements like text, checkbox, radio, select, …
Special Form Elements	| Fields that made for special format. Like telephone, url, … 
Media Form Elements		| Fields that works with different meda like gallery, image, video, audio, uploads, …
Commerce Form Elements	| Fields that works based on [SSI][2]
Exclusive Form Elements	| Just some awesome, outstanding fields
Relation Form Elements	| Fields that create relations between articles and show list of other articles.

[2]: http://www.mintjoomla.com/blog/item/53-what-is-ssi-in-depth.html

**`<config>`**

This is where you place field parameters which will be loaded on field creation.

	<config>
		<fields name="params">
			<fieldset name="core">
				<field name="sortable" type="radio" default="0" label="F_SORTABLE" description="">
					<option value="0">No</option>
					<option value="1">Yes</option>
				</field>
			</fieldset>
		<fields>
	</config>

1. `<fields name="params">` have always have name `params`
2. You can as many `<fieldset>` as you wan but name it differently and use also `label` and `description` attributes.

		<fieldset name="m1" label="Parameters Group" description="This group contain main parameters"> 
3. There are some core parameters to insert. You can just copy/paste it.

	1. First required group is `tmpl`. It is later used to display form elements or field in the article or filter.
	
			<fieldset name="tmpl">
				<field type="filelist" name="template_input" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/input" label="F_TMPLINPUT" default="default.php" />
				<field type="filelist" name="template_output_list" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/output" label="F_TMPLLIST" default="default.php" />
				<field type="filelist" name="template_output_full" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/output" label="F_TMPLFULL" default="default.php" />
			</fieldset>
	
		For this group do not forget to change in the path `/components/com_cobalt/fields/****/tmpl/input` to name of your field. 

	2. If your field store single value you can make it sortable by adding group `core`
	
			<fieldset name="core">
				<field name="sortable" type="radio" default="0" label="F_SORTABLE" description="">
					<option value="0">No</option>
					<option value="1">Yes</option>
				</field>
			</fieldset>

	3. If your field will work as a filter you have to add group `filter`
			
			<fieldset name="filter" label="FS_FILTERGEN">
				<field name="filter_enable" type="radio" default="0" label="F_ENABLE" description="">
					<option value="0">No</option>
					<option value="1">Yes</option>
				</field>
				<field name="filter_hide" type="radio" default="0" label="F_HIDE" description="F_HIDE_DESCR">
					<option value="0">No</option>
					<option value="1">Yes</option>
				</field>
				<field name="filter_descr" type="text" default="" size="40" label="F_DESCR" description="" />
			</fieldset>

All other parameter groups you can add as you want.

### test.php

Add this block of code

	<?php
	defined('_JEXEC') or die;
	require_once JPATH_ROOT.DS.'components/com_cobalt/library/php/fields/cobaltfield.php';
	
	class JFormFieldCTest extends CFormField
	{
	
	}

This is main class. The name of the class is a `JFormFieldC` prefix and field type `test` with first letter capitalized.

Here are the list of the field methods and how you can use them.

#### getInput

Render form element

	public function getInput()
	{
		return $this->_display_input();
	}

Before you run `_display_input()` you may add some code and set variables to `$this`. Now open `tmpl/input/default.php`. This is template that will be loaded by default. Insert there something like this.

	<input type="text" name="fields[<?php echo $this->id; ?>]" value="<?php echo $this->value; ?>" />

Please, pay special attention on input name. In order to get your field values saved the form alements have to have name starts with `fields[<?php echo $this->id; ?>]`. If you need more than one input as part of one field make it array `fields[<?php echo $this->id; ?>][]` or array with exact keys `fields[<?php echo $this->id; ?>][name]`. By the way your keys will be saved in `js_res_record_values` table in _index_ column. You can use it for filtering but I'll explain it later.

#### onRenderFull

Render field in article full view.

	public function onRenderFull($record, $type, $section)
	{
		return $this->_display_output('full', $record, $type, $section);
	}

The same method is here. You can edit `tmpl/output/default.php` and display data there.

	<span><?php echo $this->values ?></span>

Note that `$this->value` may be an array if you used array field input.

#### onRenderList

The same as above but first parameter is `'list'`

	public function onRenderList($record, $type, $section)
	{
		return $this->_display_output('list', $record, $type, $section);
	}

#### onPrepareFullTextSearch

Returns always string. This method saves value compatible for fulltext search. IfIf `$value` is an array you have to convert it to string like `implode(',', $value)`

	public function onPrepareFullTextSearch($value, $record, $type, $section)
	{
		return $value;
	}

#### onPrepareSave

Whatever this method return, this is what you will get in $this->value in any other method including `onRenderList` and `onRenderFull`.
 
	public function onPrepareSave($value, $record, $type, $section)
	{
		$value = filter_var($value, FILTER_SANITIZE_EMAIL);
		return $value;
	}

#### onStoreValues

This method should be used only if your field will use filters or ordering.

	public function onStoreValues($record)
	{
		$this->value = filter_var($this->value, FILTER_SANITIZE_EMAIL);
		return $this->value;
	}

This method may return single value or an array. It will store it as record (or number of record of array) in `js_res_record_values` DB table. Note, this table is only used for filtering, not for getting saved value of the field. Saved value of the field is only saved through `onPrepareSave`.

Later I'll explain how to use it in filters.
	
#### validate

This method validate field data before save. For example validating if email is entered correctly.

	public function validate($value, $record, $type, $section)
	{
		if ($value && !JMailHelper::isEmailAddress($value))
		{
			$this->setError(JText::sprintf('E_ENTEREDINCORRECT', $this->label));
		}
		return parent::validate($value, $record, $type, $section);
	}

It is not necessary that this method return `TRUE` or `FALSE`. No matter what it returns error is catched only if you make `$this->setError()`.

This method HAVE TO call `return parent::validate($value, $record, $type, $section);` because important validation capable for all fields is there like check if field is required and there is no value.

#### onJSValidate

This method allow you to add JavaScript validation on the form. 

	public function onJSValidate()
	{
		$js = '';
		if ($this->required)
		{
			$js .= "\n\t\t if($('field_{$this->id}').value == ''){
				hfid.push({$this->id}); 
				isValid = false; 
				errorText.push('" . JText::sprintf('CFIELDREQUIRED', $this->label) . "');
				}";
		}
		return $js;
	}

On example above we see javascript validation for field to be required. Tis method have to return text with is JavaScript code. It will be triggered on form submission. The construction of JS code is simple

	if(<expression>)
	{
		hfid.push(12); 
		isValid = false; 
		errorText.push('This field is required');
	}

You can easily get access to your fields since you create them in templates and you can add any ID to form elements. 

If `<expression>` is `TRUE` or other words if there is an error, we have to add to `hfid` array the ID of the field that has error. This we need to highlight field with error. Then we set `isValid` to `FALSE`. This we need to break submission of the form. And finally we add error message to global errors array `errorText.push('This field is required');`. This we need to display alert with the errors.

## Filtering Support

If you want you field to be filters you have to consider following 3 methods. And also remember to insert `filters` parameter group in to field XML.

#### onRenderFilter

This method renders filter

	public function onRenderFilter($section)
	{
		$db = JFactory::getDbo();
		
		$query = $db->getQuery(TRUE);
		
		$query->select('field_value');
		$query->from('#__js_res_record_values');
		$query->where("section_id = {$section->id}");
		$query->where("`field_key` = '{$this->key}'");
		$query->group('field_value');
		
		if ($this->params->get('params.filter_show_number', 1))
		{
			$query->select('count(record_id) as num');
		}
		$db->setQuery($query);
		$this->list = $db->loadObjectList();
	}

This example demonstrates basic principal of working with filters. First is that all data have to be saved in `js_res_record_values` through `onStoreValues`. 

Now in `tmpl/filter/default.php` you can use `$this->list` to create filter elements and `$this->values` for default/selected values. Example for listing checkboxes would be

	<?php foreach($this->list AS $el):?>
		<?php $selected = (in_array($el, $this->values) ? ' checked="checked" ' : NULL)?>
		<input type="checkbox" value="<?php echo $el; ?>" name="filters[<?php echo $this->key; ?>][]" <?php echo $selected; ?> />
		<?php echo JText::_($el); ?> 
	<?php endforeach;?>

This example show list of elements as checkboxes.  Note the element name. It always have to start with `filters[<?php echo $this->key; ?>]`.


#### onFilterWhere

Now when we have our filters listed and filter is selected we have to affect SQL query.

	public function onFilterWhere($section, &$query)
	{
		$value = $this->value;
		ArrayHelper::clean_r($value);
		
		if (!$value)
			return NULL;
		
		$db = JFactory::getDbo();
		
		foreach($value as $text)
		{
			$sql[] = 'field_value = ' . $db->quote($db->escape($text));
		}
		
		$ids = $this->getIds("SELECT record_id 
			FROM #__js_res_record_values 
		   WHERE (" . implode(' OR ', $sql) . ")
		     AND section_id = {$section->id} 
		     AND field_key = '{$this->key}'");
		     
		$query->where("r.id IN(".implode(',', $ids).")");
		
		return true;
	}

The selected values are in `$this->values`.

#### onFilterWornLabel

And now when records are selected we have to show label that filter applied. ANd this method create text for this label.

![filter worn][im1]
[im1]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/filterworn.png

 
	public function onFilterWornLabel($section)
	{
		$value = $this->value;
		settype($value, 'array');
		$value = implode(', ', $value);
		return $value;
	}

## Use AJAX in the fields

In field templates or separate javascript you can call AJAX requests like this
JavaScript

	var req = new Request.JSON({
		url: URL_ROOT + "index.php?option=com_cobalt&task=ajax.field_call&no_html=1",
		method:"post",
		data:{
			field_id: id,
			func: "_changeStatus",
			field: "status",
			record_id: rid, 
		},
		onComplete: function(json) {
			if(!json.success)
			{
				alert(json.error);
				return;
			}
			console.log(json.result);
		}
	}).send();

- `url` option is always the same. DO not change it. It is universal AJAX interface to be used by fields.
- `data` have to contain required variables 
	- `field_id` - id of the field. `$this->id` inside the field.
	- `field` - name of the filed or name of the field folder. `$this->type` inside the field.
	- `func` - name of the method to be triggered
	- `record_id` - id of the record. It is needed to load default field value correctly so you can use `$this->value`

Now you only need to create function in the field.

public function _changeStatus($post)
{
	$record_id = $post['record_id'];
	return 1;
}

`$post` contain all data you pass to `data:{}` in javascript.

Whatever you return become `json.result` in javascript `onComplete(json)`. If you return array then it will be converted into javascript object.