---
layout: doc
title:  "Система событий Cobalt"
date:   2015-01-01 12:30:30
tags: developer API events
intro: "Интегрируйте ваши расширения в Cobalt через систему событий."
---

## Общая информация

Вы должны создать плагин Joomla в группе `mint`.
Пример `XML` файла

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

Параметр `<version>` должен начинаться с `8.*` для Cobalt 8 и с `7.*` для Cobalt 7.

Плагин создается как обычный [плагин Joomla](http://docs.joomla.org/Creating_a_Plugin_for_Joomla/2.5).

Пример php файла

	<?php
	defined('_JEXEC') or die('Restricted access');

	require_once JPATH_ROOT . '/components/com_cobalt/api.php';

	class plgMintPluginname extends JPlugin
	{

	}


##  Событие onAfterArticleSaved

Событие `onAfterArticleSaved` (после сохранения статьи) возникает после удачного сохранения статьи.

Пример

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


- `$isnew` - **boolean** - если это новая статья или Вы редактируете статью.
- `$record` - **JTable** - объект JTable.
- `$fields` - **array** - массив объектов полей. Если у Вас есть собственное поле, Вы можете вызвать специальный метод поля.
- `$section` - **object** - объект, содержащий параметры раздела. Включает в себя параметр `$section->params`, в котором Вы можете получить все параметры раздела.
- `$type` - **object** - объект, содержащий параметры типа контента. Включает в себя параметр `$type->params`, в котором Вы можете получить все параметры типа контента.

## Событие onActivity

Событие `onActivity` возникает при каждом действии в Cobalt.

Пример

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


- `$actor` - **int** - пользователь, производящий действие.
- `$target` - **int** - пользователь, над чьим объектом производится действие. 
- `$options` - **array** - опции события. С помощью этого параметра Вы можете узнать, какой тип события произошел. Смотрите таблицу ниже.
- `$record` - объект статьи. Содержит статью, к которой относится это событие.

Например, кто-то проголосовал за статью. Тот, кто проголосовал есть `$actor`, автор статьи есть `$target`, а сама статья есть `$record`.

Список параметров `$options`. Например `$options['type']`.

Параметр    | Описание
---------|---------------
`type`   | Тип события. Список всех типов событий приведен ниже.
`record_id` | Id статьи
`section_id` | Id раздела
`cat_id` | Id категории
`comment_id` | Id комментария если событие связано с комментарием и `type` будет `CEventsHelper::_COMMENT_*`
`field_id` |  Id поля если событие связано с полем и `type` будет `CEventsHelper::_FIELD_*`
`new_vote` |  Число от 0 до 100 если событие связано с голосованием и `type` будет `CEventsHelper::_RECORD_RATED`
`status` |  Новый статус события будет `CEventsHelper::_FIELDS_STATUS_CHANGED`

Список типов событий параметра `type`.

События записи:

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

События комментария:

- CEventsHelper::_COMMENT_NEW
- CEventsHelper::_COMMENT_RATED
- CEventsHelper::_COMMENT_DELETED
- CEventsHelper::_COMMENT_APPROVED
- CEventsHelper::_COMMENT_REPLY
- CEventsHelper::_COMMENT_UNPUBLISHED
- CEventsHelper::_COMMENT_EDITED

События поля:

- CEventsHelper::_FIELDS_STATUS_CHANGED 
- CEventsHelper::_FIELDS_PARENT_NEW
- CEventsHelper::_FIELDS_CHILD_NEW
- CEventsHelper::_FIELDS_PARENT_ATTACHED
- CEventsHelper::_FIELDS_CHILD_ATTACHED
- CEventsHelper::_FIELDS_PAY_STATUS_CHANGE
- CEventsHelper::_FIELDS_PAY_NEW_SALE
- CEventsHelper::_FIELDS_PAY_NEW_SALE_MANUAL
