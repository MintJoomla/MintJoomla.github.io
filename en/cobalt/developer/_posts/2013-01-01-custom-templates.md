---
layout: doc
title:  "Customize templates"
date:   2013-01-01 12:30:30
---
If you learn to work with Cobalt templates the unlimited possibilities will open before you. Everyone who understand it's simple concept goes banana. Everything they can say is:

> WOW! Now I can do everything!

But, you have to learn it first. And this may take time. But we will help you to go through. ANd even if you get questions along your project, that are not answered in this article we will help you and answer any of them in our [support forum][1].

[1]: http://support.mintjoomla.com/en/cobalt-7.html

## 1. What is Cobalt Templates?

Cobalt templates is the system that allow you to set different rendering templates or styles to each _section_ or _content type_.

#### Template settings in content type

![Type template settings][img6]

#### Template settings in section

![Section template settings][img7]


[img6]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/typetmpl.png
[img7]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/sectiontmpl.png

With this approach every section, article, comment or other display block of Cobalt may looks differently. At the same time all your changes will be preserved on updates of extension itself.

The small gear button ![gear][img8] allow you to set template settings. This also allow you to create highly customizable templates.

[img8]: http://www.mintjoomla.com/media/mint/icons/16/gear.png

## 2. Requirements

You do not have to be an expert to manage this. Although the better expert you are in CSS/HTML the better templates will come out of your hands.

1. You have to know CSS/HTML - **Any level** (but you have to know it)
2. You have to know PHP - **Elementary level** (some tricks require better knowledge but for basic template editing elementary level is more than enough)

By elementary level I mean that you can understand that this

	<h2><?php echo $item->title; ?></h2>

Simply shows article title. If this is not difficult for you you can continue reading.
  
## 3. Make Templates Copies 

To starting developing any template you start with making copy of some existing template. This is very important step to prevent losing changes on the next Cobalt update. 

1. Open Cobalt template manager.

2. Choose template that feets your need the most. Usually there is only one _default_ template by default, but there are few for record lists and category indexes. If you need table style template copy _deafult_. If you need more like blog style template copy _simple_list_.

3. Click _Copy/Rename_ button in toolbar.

4. Enter your new name and click _Copy_ button. 

	<div class="box-info">Note, name will be part of the template file name. So please use only a-z characters and _. Please avoid mixing letter cases. Use all small case. </div>

	After reload you will see your new template in the list.

5. If you copy _Article List_ template, you need also change template name. Because this name later may be used in template switcher on frontend if you use more than 1 template per section. Enter name into _Change Label_ field and click _Change Label_ button.

![cobalt copy template][im1]
[im1]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/copytmpl.png


## 4. Find Your Template Files

Here are the paths where your newly located templates will be stored. * - is the name you gave to template while copy it.

- Article list - `/components/com_cobalt/views/records/tmpl/default_list_*`
- Category Index - `/components/com_cobalt/views/records/tmpl/default_cindex_*`
- Menu - `/components/com_cobalt/views/records/tmpl/default_menu_*`
- Filters - `/components/com_cobalt/views/records/tmpl/default_filters_*`
- Markup - `/components/com_cobalt/views/records/tmpl/default_markip_*`
- Article - `/components/com_cobalt/views/record/tmpl/default_record_*`
- Comments - `/components/com_cobalt/views/record/tmpl/default_comments_*`
- Form - `/components/com_cobalt/views/form/tmpl/default_form_*`
- Category select - `/components/com_resource/views/form/tmpl/default_category_*`


## 5. Template Files

Every template may have these files. Let's for example take `default_record_default.php` template. 

Then you may create files 

- `default_record_default` - folder that can store all additional files for your template. You have to use this folder if you want all needed files copied with Cobalt Packer.
- `default_record_default.php` - template file itself 
- `default_record_default.css` - put all template CSS here. It will be automatically linked. 
- `default_record_default.js` - put all java script in this file and it will be automatically loaded. 
- `default_record_default.png` - Small screenshot of your template to preview in template manager. The usually size is not more than 300x300 px. But you may do it bigger.
- `default_record_default.xml` - contain information of template author and template parameters. How to use parameters I'll explain later. 

## 6. Customize Templates

Basically when we talk about templates, we talk about Article and Articles List templates. The other templates may be easily styles and adjusted. Usually most important questions are about record fields.

<div class="box-hint">There is no better way to learn then to see code of other people. So please look code of templates to learn how it was used and what variables are possible to use.</div>

### Record Object

In the list or article full template you will see `$item` object that contain record.

`$item` contain as core properties like ctime, rating, hits, user_id and so one as fields. The core parameters are accessible like this:

	Hits: <?php echo $item->hits; ?>

>#### Q: How can see list of all available properties of record object

>To see all properties on `$item` object you can use this technique. Just add it anywhere in your template

>	  var_dump(get_object_vars($item));

>#### Q: How to get URL of the record?

>If you want to get URL of the current record. I mean URL of the `$item` object you are working with

>	  <?php echo JRoute::_($item->url);?>

>But if you need URL of the other record and you have only an ID

>	  <?php echo JRoute::_(Url::record($record_id));?>


### Record Fields

Object `$item` now contain fields organized differently

- `$item->fields_by_id` - array of record fields where field ID is the key of an array
- `$item->fields_by_key` - array of record fields where field key is the key of an array. Please read what it is in the FAQ at the end of this article.
- `$item->fields_by_group` - multilevel array of record fields where first level is the group of the fields and second are fields.

There are 2 styles to display result of your fields. And it is very simple to make decision which one to use. You **have to** access fields from `fields_by_key` if you create template that have to support multiple types. If you create template for single type, you **may** use `fields_by_id`.

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

Above is the example which will support multiple types in the same template. Although you use only ID of the one particular field, you will get the same key as in the other field with the same Label and field type.

>#### Q: How do I know what is a field ID?

>You can find field id in the list of the fields **(2)**

>![Type and id][im2]
[im2]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/typeandid.png
  

### Field Object

Either `$item->fields_by_key[$key]` or `$item->fields_by_id[12]` is a field object and contain much more properties than `->result`.

Some of them are very useful. For example in the table you wand all fields of type _digits_ be aligned to right.

	<td<?php echo ($field->type == 'digits' ? ' align="right" ' : NULL ) ?>>
		<?php echo $field->result;?>
	</td>

Or `$item->fields_by_id[12]->params` has all parameters that you set during field creation. For example add class that was set in field parameters.

	<span class="my-class <?php echo $item->fields_by_id[12]->params->get('core.field_class')?>">
		<?php echo $item->fields_by_id[12]->result;?>
	</span>


>#### Q: What is a field key.

>_Field Key_ now is the part of multi type support in templates. You will not create this keys I just want to explain so you understand concept. Field key is and MD5 of field type and label.

>	  $field_key = 'k'.md5($field->label.'-'.$field->field_type); 

>Lets, say field label is _Year_ and field type id _digits_. Then 

>	  $field_key = 'k'.md5('Year-digits'); 

>Then if you call field by key, no matter what type it is, if it has field _Year_ type _digits_ it will be displayed in your template.

> You can find keys in the DB column `key` in `jos_js_res_fields` table **(1)**.

>![Field key][im3]
[im3]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/fieldkey.png

>#### Q: The result of the field contain HTML. How to get row text?

>Most simple way to get text without any HTML formatting is.

>	  echo strip_tags($item->fields_by_id[12]->result);

>#### Q: How can I see all available properties of field object?

>You can use the same technique to list object properties and later I'll make reference.

>	  var_dump(get_object_vars($item->fields_by_id[12]));
	
>#### Q: WHat are the available field types and how do I know what is the type in the current field?

>You can find field type name in the list of the fields **(1)**

>![Type and id][im2]
[im2]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/typeandid.png

### Field Templates

New, unique and great possibility is to change or add any new _output_ or _input_ template for every field. Every field have parameters to set template for _output_, _filter_ or _input_. And this is great and unique feature that gives you TOTAL control over how everything will look.

![Field template][im5]
[im5]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/fieldstmpls.png

As mentioned there are 3 template types _output_, _filter_ or _input_. And those are support Joomla template override technique.

#### _Output_ 

Those templates are used when formatting field output in articles list or full article templates.

- location - `com_cobalt/fields/[field_name]/tmpl/output`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/output` 

#### _Input_

Those templates are used in the submission form and display form elements.

- location - `com_cobalt/fields/[field_name]/tmpl/input`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/input` 
 
#### _Filter_

Those templates are used in advanced search form or in filter module.

- location - `com_cobalt/fields/[field_name]/tmpl/filter`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/filter` 

Just copy one of the templates with different name, modify it and set it in fields parameters. Or create same name file in Joomla template override.

### Form Fields

Basically the fields on the form are the same field object. The only difference `->result` contain form element.

There are 2 main field storages.

1. `$this->fields` - is the array of the fields where field ID is the key of an array

		echo $this->fields[12]->label.': '.$this->fields[12]->result;
		
	> TODO: create another array arranged by keys to support multiple type form templates

2. `$this->sorted_fields` - multilevel array where first element is the ID of the fields group (0 for ungrouped) and second level fields of fields where array key is the field key.

<div class="box-info">Please, study default form template. It is very self explanatory. You will find there many useful information.</div>

### Debug

Sometimes you will need to make something extraordinary. And you will have to know real field result data.

	echo htmlspecialchars($item->fields_by_id[12]->result);

This piece of code will help you to see hidden characters and get an idea how to process.

## 7. Template Parameters 

For most effective template creation you may use template parameters. You may add your own parameters that may affect template style or field positions or make any other influence you want.

In `default_record_default.xml` - any template XML file you will find 2 parameter groups. Those are *tmpl_params* and *tmpl_core*. Here is the example.


	<fields name="tmpl_params">
		<fieldset name="general">
			<field name="max_width" type="text" size="6" default="150" label="CSELCTMAXW" description="CSELWDESCR" />
				<field name="cat_ordering" type="list" label="CORDERING"  default="c.lft ASC"> 
				<option value="c.lft ASC">CORDERING</option>
				<option value="c.title ASC">CORDERNAMEASC</option>
				<option value="c.title DESC">CORDERNAMEDESC</option>
			</field>
			<field name="cat_descr" type="list" default="0" label="CTOOTIPDESCR" description="">
				<option value="0">CNO</option>
				<option value="before">CTOOLTIPBEFOR</option>
				<option value="after">CTOOLTIOPAFTER</option>
				<option value="full">CTOOLTIPFULL</option>
			</field>		
		</fieldset>
	</fields>
	<fields name="tmpl_core">
		<fieldset name="general2">
			<field name="category_label" type="radio" label="CSHOWLABEL"  default="1"> 
				<option value="0">CNO</option>
				<option value="1">CYES</option>
			</field>
		</fieldset>
	</fields>

<div class="box-info">You may add parameters only to <em>tmpl_params</em> group and do not delete <em>tmpl_core</em> group as it may be use inside Cobalt
</div>

You can create as many fieldsets in `<fields name="tmpl_params">` as you want. Actually it is even good because the more your parameters stay organized, the easier it to use.

You can add also description and label attributes like this

	<fieldset name="general" 
		label="main Parameters" 
		description="Do not miss required parameters">
		// fields go her ...
	</fieldset>

After you added parameters into template XML now you can access them in the template.

In every template parameters passed differently. I know it is not good. But sometimes there are 4 templates are loaded by the same view. To find how to use template params, look at the very beginning of template PHP file. In every core Cobalt template we initiate `$params` variable. Something like this

	$params = $this->tmpl_params;

Or sometimes like this

	$params = $this->tmpl_params['list'];

But it is always `$params`. This way you can learn how to initiate parameters object of your template. Just leave this line of code in the template. 

You can use it n template now like this

	<?php if($params->get('tmpl_params.item_icon_title')): ?>
		<?php echo JHTML::image($url);?>
	<?php endif; ?>

Where `tmpl_params` of `tmpl_params.item_icon_title` the name of the parameters group and  `item_icon_title` is the name of the field

	<field name="item_icon_title" type="radio" label="Show icon title"  default="1"> 
		<option value="0">CNO</option>
		<option value="1">CYES</option>
	</field>

## 8. Setting Field In Parameters

This is very cool technique to manage, style or position individual fields.

For example there is field Price. And you want it to be shown in special place with a special style.

1. Add fieldlist parameter
	
		<fields name="tmpl_params">
			<fieldset name="name1" label="Position Fields" 
				description="Set fields to be positioned">
				<field name="field_price" type="meresourcesfields" label="Where is the price?" />
			</fieldset>
		</fields>
		
	<div class="box-info">If any on your parameter link to field, its name have to start with `field_*`.</div>
	
	If you want only some type of fields to be shown in the list use `filters="'text', ' textarea', 'html'"`. This is who you can limit what types of the fields to show.
	
	if you want this field to by multiple select add `size="15"` and `mutiple="true"`

2. In template use something like this

		<?php if(isset($item->fields_by_key[$params->get('tmpl_params.field_price')])):?>
			<span class="price-tag">
				<?php echo $item->fields_by_key[$params->get('tmpl_params.field_price')]->result; ?>
			</span>
		<?php endif; ?>
	
And I do теo need to tell you how to style `.price-tag` class in your template css file.

>#### Q: What if I display explicitly only one field and rest I want to fetch and I do not want this field to be listed in the cycle?

>After you called this field you may unset it from the field array.

>	  <?php if(isset($item->fields_by_key[$params->get('tmpl_params.field_price')])):?>
>	  	<span class="price-tag">
>	  		<?php echo $item->fields_by_key[$params->get('tmpl_params.field_price')]->result; ?>
>	  		<?php unset($item->fields_by_key[$params->get('tmpl_params.field_price')]);?>
>	  	</span>
>	  <?php endif; ?>

>Then later when you fetch it won't be there.

	

### Create Installation Package 

There is 2 ways of creating installation package. First is very simple. Just pack all files in to zip. If you pack few templates you may arrange files in to sub folders, but actually no matter how you packed them, installer will determine by name the purpose of the file and copy it to correct location. 

This pack will be nice only to install thru template manager. 

If you want your template pack to install through Joomla installer, then you need to read about how to create Joomla installer packages. This is beyond subject of this tutorial.

<div class="box-warning">Please subscribe/follow this article. It will be changed from time to time to become complete. If you click small eye icon bellow you will get notification every time I update this article</div>