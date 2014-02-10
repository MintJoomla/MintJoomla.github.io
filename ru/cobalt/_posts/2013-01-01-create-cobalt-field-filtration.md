---
layout: doc
title:  "Создание полей Часть 2 - Фильтры"
intro:  "Фильтрация и сортировка."
date:   2013-07-16 18:53:38
tags: fields developer
---

## Требования

Необходимо что бы вы уже ознакомились с [основами создания полей](/ru/cobalt/create-cobalt-field-base/) в Кобальт.

##Введение.

Во второй части мы рассмотрим минимально необходимые дополнения в файлы поля SimpleText_base для повышения функционала поля до возможности фильтрации и сортировки.

Соответственно, во всех примерах наше поле будет называться `simpletext_filtration`. 

## Файл simpletext_filtration.xml

Для обеспечения возможности фильтрации и сортировки по полю в файл метаданных и параметров поля необходимо добавить две предопределенные группы полей: `core` и `filter`.

####Группа полей `core`.

Определяет возможность сортировки по полю.
	
Поле можно сделать сортируемым, только если оно содержит простое значение. Для этого в файл параметров необходимо включить группу полей `core`.
		
	<fieldset name="core">
		<field name="sortable" type="radio" default="0" label="F_SORTABLE" description="">
			<option value="0">No</option>
			<option value="1">Yes</option>
		</field>
        <field name="ordering_mode" type="list" default="0" label="F_SORTABLEMODE" description="">
            <option value="digits">F_OPT_DIGITS</option>
            <option value="alpha">F_OPT_ALPHA</option>
        </field>
	</fieldset>

где

- параметр `sortable` включает сортировку по полю
- параметр `ordering_mode` устанавливает режим сортировки по полю- как цифры или как буквы. Этот параметр не является обязательным и приведен как пример использования собственных параметров.

####Группа полей `filter`.

Определяет возможность фильтрации по полю.
	
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

где

- параметр `filter_enable` включает фильтрацию по полю
- параметр `filter_hide` устанавливает режим скрытого фильтра.
- параметр `filter_descr` устанавливает режим сортировки по полю- как цифры или как буквы.
Эта группа параметров является стандартной для всех полей, поддерживающих фильтрацию. Не следует ее видоизменять, т.к. эти параметры используются ядром Cobalt.
Если необходимо создать свои параметры фильтрации, следует создать отдельную группу параметров.


## Файл simpletext_filtration.php

Для обеспечения возможности фильтрации и сортировки по полю в класс поля необходимо добавить следующие предопределенные методы.



Метод | Краткое описание
---------|-------------
onStoreValues() | Сохраняет значение поля для последующей фильтрации или сортировки.
onRenderFilter() | Выводит значение поля в форме фильтра.
onFilterWhere() | ????.
onFilterWornLabel() | ?????.
isFilterActive() | Проверяет, выбран или нет фильтр.


#### метод onStoreValues()

Сохраняет значение поля для последующей фильтрации или сортировки по этому полю.

Код метода по умолчанию (как он определен в родительском классе CFormField)

	public function onStoreValues($validData, $record)
	{
		[код пользователя]
		return $this->value;
	}
где
`$validData`- массив данных всех полей сохраняемой записи
`$record`- объект JTable сохраняемой записи

По умолчанию метод просто сохраняет значение поля в таблице `js_res_record_values` базы данных. Метод может возвращать простое значение или массив. Необходимо помнить, что таблица `js_res_record_values` предназначена только для хранения данных для фильтрации, а не для получения сохраненного значения поля. Значение поля сохраняется только через метод `onPrepareSave`.
На самом деле наличие этого метода не является обязательным, т.к. в  виде "по умолчанию" он есть в родительском классе. Это означает, что его необходимо переопределять только если для фильтрации Вам необходимо использовать набор данных, отличный от значения поля (уменьшенный или наоборот, расширенный).  



	public function onStoreValues($validData, $record)
	{
		[код пользователя]
		$this->value = filter_var($this->value, FILTER_SANITIZE_EMAIL);
		return $this->value;
	}

Метод может возвращать простое значение или массив. Это значение сохраняется как запись или номер элемента массива в таблице `js_res_record_values` базы данных. Необходимо помнить, что таблица `js_res_record_values` предназначена только для фильтрации, а не для получения сохраненного значения поля. Значение поля сохраняется только через метод `onPrepareSave`.

#### метод onRenderFilter()

Выводит значение поля в форме фильтра.

Код метода по умолчанию.

	public function onRenderFilter($section, $module = false)
		{
			[код пользователя]
	  		return $this->_display_filter($section, $module);
		}

Этот пример демонстрирует базовый принцип работы с фильтрами.

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

		return $this->_display_filter($section, $module);
	}

Во-первых, все данные должны быть сохранены в таблице `js_res_record_values` базы данных методом `onStoreValues`.

Далее, в файле шаблона формы фильтра по умолчанию `tmpl/filter/default.php` Вы можете использовать `$this->list` для создания filter элементов и `$this->values` для по умолчанию/выбранных значений.

Пример кода для поля checkbox может быть следующим

	<?php foreach($this->list AS $el):?>
		<?php $selected = (in_array($el, $this->values) ? ' checked="checked" ' : NULL)?>
		<input type="checkbox" value="<?php echo $el; ?>" name="filters[<?php echo $this->key; ?>][]" <?php echo $selected; ?> />
		<?php echo JText::_($el); ?> 
	<?php endforeach;?>

Это пример показывает список элементов в виде checkbox.

Необходимо обратить внимание на имя элемента. Оно всегда должно начинаться с `filters[<?php echo $this->key; ?>]`.

#### метод onFilterWhere()

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

#### метод onFilterWornLabel()

And now when records are selected we have to show label that filter applied. ANd this method create text for this label.

![filter worn][im1]
[im1]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/filterworn.png

Код метода по умолчанию.
 
	public function onFilterWornLabel($section)
	{
		$value = $this->value;
		settype($value, 'array');
		$value = implode(', ', $value);
		return $value;
	}

#### метод isFilterActive()