---
layout: doc
title:  "Cobalt events"
date:   2013-01-01 12:30:30
tags: developer API events
intro: "Integrate your or third party extension with Cobalt through events."
---

## General

You have to create Joomla plugin of `mint` group. Here is `XML`

	<?xml version="1.0" encoding="utf-8"?>
	<extension version="3.0" type="plugin" group="mint" method="upgrade">
		<name>Cobalt - Plugin - My Plugin</name>
		<author>Author</author>
		<creationDate>February 17 2009</creationDate>
		<copyright>Author</copyright>
		<license>GNU/GPL http://www.gnu.org/copyleft/gpl.html</license>
		<authorEmail>email@domain.com</authorEmail>
		<authorUrl>http://www.site.com</authorUrl>
		<version>8.0</version>
		<description>
		<![CDATA[ This is description]]>
		</description>
		<files>
			<filename plugin="myplugin">myplugin.php</filename>
		</files>
	</extension>

`<version>` have to start with `8.*` for Cobalt 8 and with `7.*` for Cobalt 7.

You create plugin as you create any other [Joomla plugin](http://docs.joomla.org/Creating_a_Plugin_for_Joomla/2.5).

Here is sample ph php file

	<?php
	defined('_JEXEC') or die('Restricted access');

	require_once JPATH_ROOT . '/components/com_cobalt/api.php';

	class plgMintPluginname extends JPlugin
	{

	}


## onAfterArticleSaved

`onAfterArticleSaved` event is triggered article has been saved successfully.

Here is sample

	<?php
	defined('_JEXEC') or die('Restricted access');

	require_once JPATH_ROOT . '/components/com_cobalt/api.php';

	class plgMintPluginname extends JPlugin
	{
		public function onAfterArticleSaved($isnew, $record, $fields, $section, $type)
		{
		    if($isnew)
		    {
		        // Expire in 30 days
		        $record->extime = date('Y-m-d h:i:s', time() + (86400 * 30));
		        $record->store();
		    }

		    foreach($fields AS $field)
		    {
		        if($field->type == 'myfield')
		        {
		            $value = $field->value;
		        }
		    }
		}
	}


- `$isnew` - **boolean** - If this is new article or we edit article.
- `$record` - **JTable** - JTable object.
- `$fields` - **array** - Array of fields objects. If you have custom field you can even trigger custom field method.
- `$section` - **object** - Section object. Includes `$section->params` where you can get all section parameters.
- `$type` - **object** - Content Type object. Includes `$type->params` where you can get all type parameters.

## onActivity

`onActivity` event is triggered on every action in cobalt.

Here is sample

	<?php
	defined('_JEXEC') or die('Restricted access');
	
	require_once JPATH_ROOT . '/components/com_cobalt/api.php';
	
	class plgMintPluginname extends JPlugin
	{
		public function onActivity($actor, $target, $options, $record)
		{
			if($options['type'] == CEventsHelper::_RECORD_NEW)
			{
				// do actions...
			}
		}
	}


- `$actor` - **int** - user who make an action
- `$target` - **int** - user who's object affected. 
- `$options` - **array** - event options. By this parameter we can get what was the event type. See table bellow.
- `$record` - Article object. Contain article this event is related to.

For example someone rates an article. The one who rates is an `$actor`, article author is the `$target` and article is `$record`.

List of `$options` parameters. For example `$options['type']`.

Param    | Description
---------|---------------
`type`   | Type of the event. The list of all event types is bellow.
`record_id` | Id of there article affected
`section_id` | Id of the section
`cat_id` | Id of the category
`comment_id` | Id of the comment if event connected to comment and `type` is like `CEventsHelper::_COMMENT_*`
`field_id` |  Id of the field if event connected to the field and `type` is like `CEventsHelper::_FIELD_*`
`new_vote` |  Vote amount from 0 to 100 if event `type` is `CEventsHelper::_RECORD_RATED`
`status` |  New status is event is `CEventsHelper::_FIELDS_STATUS_CHANGED`

List of all event `type`.

Record events

- CEventsHelper::_RECORD_NEW
- CEventsHelper::_RECORD_VIEW
- CEventsHelper::_RECORD_EXPIRED
- CEventsHelper::_RECORD_FEATURED_EXPIRED
- CEventsHelper::_RECORD_TAGGED 
- CEventsHelper::_RECORD_BOOKMARKED
- CEventsHelper::_RECORD_RATED
- CEventsHelper::_RECORD_APPROVED
- CEventsHelper::_RECORD_UNPUBLISHED
- CEventsHelper::_RECORD_FEATURED
- CEventsHelper::_RECORD_EXTENDED
- CEventsHelper::_RECORD_DELETED
- CEventsHelper::_RECORD_EDITED
- CEventsHelper::_RECORD_REPOSTED
- CEventsHelper::_RECORD_POSTED

Comment events

- CEventsHelper::_COMMENT_NEW
- CEventsHelper::_COMMENT_RATED
- CEventsHelper::_COMMENT_DELETED
- CEventsHelper::_COMMENT_APPROVED
- CEventsHelper::_COMMENT_REPLY
- CEventsHelper::_COMMENT_UNPUBLISHED
- CEventsHelper::_COMMENT_EDITED

Field events 

- CEventsHelper::_FIELDS_STATUS_CHANGED 
- CEventsHelper::_FIELDS_PARENT_NEW
- CEventsHelper::_FIELDS_CHILD_NEW
- CEventsHelper::_FIELDS_PARENT_ATTACHED
- CEventsHelper::_FIELDS_CHILD_ATTACHED
- CEventsHelper::_FIELDS_PAY_STATUS_CHANGE
- CEventsHelper::_FIELDS_PAY_NEW_SALE
- CEventsHelper::_FIELDS_PAY_NEW_SALE_MANUAL
