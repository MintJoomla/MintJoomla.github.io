---
layout: doc
title:  "Change field value bulk"
date:   2015-10-20 12:30:30
tags: developer other
---
## Setup

Sometimes you need to change value of one field to another in bulk. But there is no interface in cobalt. Here is quick tip how to do that.

Create file `com_cobalt/controllers/custom.php` and place this content there.

```
<?php
defined('_JEXEC') or die;

jimport('joomla.application.component.controllerform');

class CobaltControllerCustom extends JControllerForm
{
	public function __construct($config = array())
	{
		parent::__construct($config);
	}
		
	public function change()
	{
		$field_id   = 27;
		$section_id = 5;
		$value      = 'Red';
		$new_value  = 'Dark Red';


		$db = JFactory::getDbo();

		$db->setQuery("SELECT id, fields FROM #__js_res_record WHERE section_id = {$section_id} AND id IN(SELECT record_id FROM #__js_res_record_values WHERE field_id = {$field_id} AND field_value = '{$value}')");
		$list = $db->loadObjectList();

		foreach($list AS $item)
		{
			$fields = json_decode($item->fields, TRUE);

			if(empty($fields[$field_id]))
			{
				continue;
			}

			$fields[$field_id] = $this->_change($fields[$field_id], $value, $new_value);

			$db->setQuery("UPDATE #__js_res_record SET fields = '" . json_encode($fields) . "' WHERE id = " . $item->id);
			$db->execute();
		}

		$db->setQuery("UPDATE #__js_res_record_values SET field_value = '{$new_value}' WHERE field_id = {$field_id} AND field_value = '{$value}'");
		$db->execute();

	}

	private function _change($value, $what, $to)
	{
		if(is_array($value))
		{
			foreach($value AS &$val)
			{
				$val = $this->_change($val, $what, $to);
			}
		}
		else if($value == $what)
		{
			$value = $to;
		}

		return $value;
	}
}
```

Now you can chane these lines

	$field_id   = 27;
	$section_id = 5;
	$value      = 'Red';
	$new_value  = 'Dark Red';

And open URL

    http://localhost/index.php?option-com_cobalt&task=custom.change

This task have to be triggered and change all you need.

