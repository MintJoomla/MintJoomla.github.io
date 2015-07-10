---
layout: doc
title:  " Generate meta data from Cobalt data"
intro:  "How to generate metadata you want in custom templates"
date:   2013-01-01 12:30:30
tags: developer templates
---

This is an easy way how to generate meta data from Cobalt categories, fields etc. You can find more about Joomla setMetaData method [here](https://docs.joomla.org/JDocument/setMetaData).

## Record list template

Let's look at adding meta data for records list first (this is useful only if you create custom record list templates). 

Cobalt structure is made of section and it's categories. We will try to generate meta data only for categories and in section you can add it manually through administration panel.

You could also create custom template parameter to turn generating meta data on or off. You can do that by opening `.xml` file of your template and add something like this.

```xml
<fieldset name="seo" label="SEO">
		<field name="metadata_auto" type="radio" class="btn-group" default="0" label="Auto generate meta data.">
			<option value="0">CNO</option>
			<option value="1">CYES</option>
		</field>
</fieldset>
```

Now you must go to your template parameters to enable this option.

You can now set meta with this methods:

- `setTitle();`
- `setMetadata('description', string $content);`
- `setMetaData('keywords', string $content);`

For populating `string $content` we can use different options:

- `$this->section->name` - Name of the section
- `$this->category->title` - Title of current category
- `$this->category->decsription` - Description of current category
- `$this->item->title` - Title of the article in full article view

### Example

```php
// checks if template parameter is set to yes for creating meta data or not
if($params->get('tmpl_params.metadata_auto') == 1) 
{ 
	// checks if it is category and not section
	if(JFactory::getApplication()->input->getInt('cat_id') > 0) 
	{ 
		// sets category title as meta title 
		$this->document->setTitle($this->category->title);
		// generate meta description from category description. Instead of $this->category->description you could use something like `substr($this->category->description,0,200) . '...'` to limit meta description to 200 characters.
		$this->document->setMetaData('description', '$this->category->description'); 
		$this->document->setMetaData('keywords', $this->category->title . ', ' . $this->section->name . ', some other custom words');
	}
}
```

You could also add records titles to keywords meta tag with foreach cycle:

```php
foreach ($this->items AS $item) {
     echo $item->title;
}
```

## Record template

In record template it's the same principle as above but we can add some extra information to meta data with fields data.

For geting field data you can use `$item->fields_by_id[ID]->result` or `$item->fields_by_id[ID]->value[]` or read [this article](/en/cobalt/custom-templates-article/).

### Example

```php
// item title and category title as meta title
$this->document->setTitle($item->title . ' (' . $this->category->title . ') '); 
// field data as meta description, you can use data from textarea field or html field here
$this->document->setMetaData( 'description', substr($item->fields_by_id[ID]->result,0,200) . '...' ); 
//setting meta keywords, $item->fields_by_id[ID]->value['address']['city'] is getting values from geo field
$this->document->setMetaData( 'keywords', $item->title .', '. $item->fields_by_id[ID]->value['address']['city'] .', '. $this->category->title .', '. $this->section->name); 
```
