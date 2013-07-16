---
layout: post
title:  "Создание собственных полей (основа) часть 1."
date:   2013-07-16 18:53:38
tags: поля
---

В данной статье подробно рассматриваются вопросы создания своих полей для конструктора контента Cobalt 8.

Во всех примерах будет рассматриваться создание поля с именем `test`.

Все поля CCK Cobalt хранятся в папке `components/com_cobalt/fields`. Каждое поле хранится в собственной папке. Имя папки должно быть одинаковым с именем поля и состоять только из латинских букв в нижнем регистре.

Таким образом, все файлы поля `test` должны находиться в папке `components/com_cobalt/fields/test`.

Папка `components/com_cobalt/fields/test` **обязательно** должна содержать следующие подпапки и файлы:

1. `test.xml` - `.xml` файл, содержит метаданные и параметры шаблонов поля.
2. `test.php` - `.php` файл, содержит главный класс поля. Осуществляет обработку метаданных и параметров поля из файла `.xml` посредством предопределенных методов класса. Иными словами, методы класса поля обрабатывают логику работы поля и подготавливают набор необходимых переменных для работы шаблонов поля. В шаблонах поля эти переменные доступны через `$this`. Рекомендуется всю "логику" поля включать в методы класса поля, а HTML код поля- в файлы шаблонов.
3. `/tmpl/input/default.php` - файл шаблона по умолчанию для формы ввода.
4. `/tmpl/output/default.php` - файл шаблона по умолчанию для формы вывода в полном виде статьи или в списке статей.
5. `/tmpl/filter/default.php` - файл шаблона по умолчанию для вывода в форме фильтра.

Также в папке `components/com_cobalt/fields/test` **могут находиться** следующие подпапки и файлы:

1. `/assets` - папка для хранения вспомогательных файлов, например `.css` файлов таблиц стилей, `.js` файлов JavaScript и других необходимых файлов. Имя этой папки является рекомендуемым. Важно помнить, что файлы из этой папки не подключаются Cobaltом автоматически, их необходимо подключать принудительно.
2. `/language` - папка для хранения .ini языковых файлов этого поля.
Имена файлов должны быть в следующем формате `[код языка].com_cobalt_field_[имя поля].ini` (например `en-GB.com_cobalt_field_test.ini` или `ru-RU.com_cobalt_field_test.ini`). При установке поля языковые файлы из этой папки будут перенесены установщиком в папку `language` Joomla.
3. `test.png` - файл- иконка поля размером 16x16 px.
Обычно мы используем иконки из набора [Fugue Icons][1], но Вы можете использовать любые иконки размером 16x16 px. Этот файл не является обязательным. Если его нет, по умолчанию будет показана иконка `text.png`.

[1]: http://p.yusukekamiyamane.com/

Ниже мы подробно рассматриваются назначение и примерное содержание вышеуказанных файлов.

### Файл test.xml

Содержит метаданные и параметры поля.

Формат файла должен быть следующий.

	<?xml version="1.0" encoding="utf-8"?>
	<cobaltfield>
		<name>My Test Field</name>
		<group>Simple Form Elements</group>
		<config>
			<fields name="params">
				<fieldset name="...">
				</fieldset>
				.....................
				<fieldset name="...">
				</fieldset>
			</fields>		
		</config>
	</cobaltfield> 

Файл содержит 3 основных раздела, определяемых тэгами верхнего уровня: **name, group, config**.

**Раздел `<name>`**

Определяет имя поля. Это имя будет показываться в выпадающем списке выбора типа поля.

**Раздел `<group>`**

Определяет группу полей, к которой будет принадлежать поле.

Все поля объединяются в группы на основании содержания этого тэга. В принципе, Вы можете использовать любое название группы. Таким образом, Вы можете включить новое поле в одну из существующих групп или создать свою собственную группу полей.

Предопределенные группы полей CCK Cobalt.

Имя группы      		| Описание
------------------------|-------------
Simple Form Elements	| Простые поля типа text, checkbox, radio, select и пр.
Special Form Elements	| Поля для вывода данных в специальном формате типа telephone, url, … 
Media Form Elements		| Поля для работы с медиа контекстом типа gallery, image, video, audio, uploads и пр.
Commerce Form Elements	| Поля для электронной коммерции, работа этих полей основана на [SSI][2]
Exclusive Form Elements	| Различные эксклюзивные поля.
Relation Form Elements	| Поля для создания связей между элементами контекста и отображающие списки связанных элементов.

[2]: http://www.mintjoomla.com/blog/item/53-what-is-ssi-in-depth.html

**Раздел `<config>`**

Определяет параметры поля.

Структура раздела `<config>` должна быть следующей

	<config>	//обязательный тэг
		<fields name="tmpl_params">		//обязательный тэг

        	<fieldset name="name_1" label="Fieldset Name 1" description="Fieldset Description 1">
            	<field name="field_name_1>...</field>
				..........
				<field name="field_name_N>...</field>
        	</fieldset>

			.......................................			
				
        	<fieldset name="name_N" label="Fieldset Name N" description="Fieldset Description N">
            	<field name="field_name_1>...</field>
				..........
				<field name="field_name_N>...</field>
        	</fieldset>

    	</fields>
	</config>

Таким образом, раздел `<config>` состоит из наборов групп полей, ограниченных тэгами `<fieldset>...</fieldset>` и наборов полей внутри группы, ограниченных тэгами `<field>...</field>`.

Количество наборов групп полей и количество полей внутри каждой группы не ограничено. Естественно, имена групп полей и самих полей должны быть уникальными.

Существует 3 предопределенных группы полей, которые используются ядром Cobalt:

1. Группа полей `tmpl`. 

	Определяет месторасположение шаблонов поля.
		
		<fieldset name="tmpl">
			<field type="filelist" name="template_input" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/input" label="F_TMPLINPUT" default="default.php" />
			<field type="filelist" name="template_output_list" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/output" label="F_TMPLLIST" default="default.php" />
			<field type="filelist" name="template_output_full" filters="php$" hide_none="1" hide_default="1" directory="/components/com_cobalt/fields/test/tmpl/output" label="F_TMPLFULL" default="default.php" />
		</fieldset>
	
	Первая строка определяет местоположение шаблона формы ввода поля.
	
	Вторая строка определяет местоположение шаблона формы вывода поля в списке статей.
	
	Третья строка определяет местоположение шаблона формы вывода поля в полном виде статьи.
	
	Необходимо переименовать путь `/components/com_cobalt/fields/****/tmpl/input` на имя поля. 

2. Группа полей `core`.

	Определяет возможность сортировки по полю.
	
	Если поле содержит простое значение, его можно сделать сортируемым. Для этого в файл параметров необходимо включить группу полей `core`.
		
		<fieldset name="core">
			<field name="sortable" type="radio" default="0" label="F_SORTABLE" description="">
				<option value="0">No</option>
				<option value="1">Yes</option>
			</field>
		</fieldset>

3. Группа полей `filter`.

	Определяет возможность фильтации по полю.
	
	Если необходимо создать фильтрацию по полю, в файл параметров необходимо включить группу полей `filter`.
				
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

Остальные группы параметров можно добавлять по Вашей необходимости.

### Файл test.php

Данный файл содержит программный код класса поля и должен начинаться со следующего блока кода

	<?php
	defined('_JEXEC') or die;
	require_once JPATH_ROOT.DS.'components/com_cobalt/library/php/fields/cobaltfield.php';
	
	class JFormFieldCTest extends CFormField
	{
	[здесь должны располагаться методы класса поля]
	}

Название класса должно быть `JFormFieldCTest`,   где `JFormFieldC` есть обязательный префикс имени класса, а `Test` есть имя поля, начинающееся с большой буквы.

Родительский класс `CFormField` находится в файле `/components/com_cobalt/library/php/fields/cobaltfield.php`

Для выполнения необходимых операций с полем (ввод, вывод, фильтрация по полю и пр.), класс поля должен содержать набор предопределенных методов.

####Предопределенные методы класса поля и примеры их использования.

Сводная таблица предопределенных методов класса поля

Название | Краткое описание
---------|-------------
getInput | Выводит форму ввода поля.
onRenderFull | Выводит поле в полном виде статьи.
onRenderList | Выводит поле в списке статей.
onPrepareFullTextSearch | Сохраняет значение поля для полнотекстового поиска.
onPrepareSave | ?????.
onStoreValues | Сохраняет значение поля для фильтрации или сортировки по этому полю.
validate | Проверяет правильность ввода значения поля перед его сохранением на сервере в базе данных.
onJSValidate | Позволяет подключать проверку правильности ввода значения поля на форме ввода посредством JavaScript.
onRenderFilter | ????? Выводит поле в форме фильтра.
onFilterWhere | ?????.
onFilterWornLabel | ?????.
onImport | ?????.

Предопределенные функции класса поля предназначены, в основном, для подготовки необходимых переменных для шаблона поля. В шаблоне поля эти переменные можно получить через `$this`. Т.е. рекомендуется всю "логику" работы поля включать в методы класса поля, а HTML код поля- в файлы шаблонов.

#### метод getInput

Выводит форму ввода поля.

Код метода по умолчанию:

	public function getInput()
	{
		[код пользователя]
		return $this->_display_input();
	}

Перед `return $this->_display_input();` можно поставить свой фрагмент кода и установить необходимые переменные в `$this`.

Например, в шаблон формы ввода поля по умолчанию `tmpl/input/default.php` можно добавить следующий фрагмент кода

	<input type="text" name="jform[fields][<?php echo $this->id;?>]" value="<?php echo $this->value;?>" />

Обратите внимание на параметр `name`. Он обязательно должен начинаться с `jform[fields][<?php echo $this->id;?>]`.

Если в поле необходимо иметь несколько элементов `input`, можно создать массив `jform[fields][<?php echo $this->id;?>][]` или массив с ключом `jform[fields][<?php echo $this->id;?>][name]` (для информации, ключи хранятся в столбце _index_ таблицы _js_res_record_values_). Как это можно использовать для фильтрации, будет объяснено позже.

#### метод onRenderFull

Выводит поле в полном виде статьи.

Код метода по умолчанию:

	public function onRenderFull($record, $type, $section)
	{
		[код пользователя]
		return $this->_display_output('full', $record, $type, $section);
	}

Например, в шаблон формы вывода поля по умолчанию в полном виде статьи `tmpl/output/default.php` можно добавить следующий фрагмент кода

	<span><?php echo $this->values ?></span>

Необходимо помнить, что переменная `$this->value` может быть массивом, если Вы используете массив для ввода значений этого поля.

#### метод onRenderList

Выводит поле в списке статей.

Код метода по умолчанию:

	public function onRenderList($record, $type, $section)
	{
		[код пользователя]
		return $this->_display_output('list', $record, $type, $section);
	}

Метод, аналогичный методу `onRenderFull`.

#### метод onPrepareFullTextSearch

Сохраняет значение поля для полнотекстового поиска.

Код метода по умолчанию:

	public function onPrepareFullTextSearch($value, $record, $type, $section)
	{
		[код пользователя]	
		return $value;
	}

Должен возвращать всегда только строку или одноуровневый массив, в котором каждое значение массива является строкой.

#### метод onPrepareSave

Сохраняет значение поля в базе данных.

В дальнейшем это значение можно получить в любом другом методе, например `onRenderList` или `onRenderFull`, в переменной `$this->value`.

Код метода по умолчанию:
 
	public function onPrepareSave($value, $record, $type, $section)
	{
		[код пользователя]
		?????? $value = filter_var($value, FILTER_SANITIZE_EMAIL);
		return $value;
	}

#### метод onStoreValues

Сохраняет значение поля для последующей фильтрации или сортировки по этому полю.

Если фильтрация или сортировка по полю не нужна, этот метод можно не использовать.

Код метода по умолчанию

	public function onStoreValues($record)
	{
		[код пользователя]
		?????? $this->value = filter_var($this->value, FILTER_SANITIZE_EMAIL);
		return $this->value;
	}

Метод может возвращать простое значение или массив. Это значение сохраняется как запись или номер элемента массива в таблице `js_res_record_values` базы данных. Необходимо помнить, что таблица `js_res_record_values` предназначена только для фильтрации, а не для получения сохраненного значения поля. Значение поля сохраняется только через метод `onPrepareSave`.

Ниже будет показано, как использовать это значение для фильтрации.

#### метод validate

Проверяет правильность ввода значения поля перед его сохранением.

Код метода по умолчанию

	public function validate($value, $record, $type, $section)
	{
		[код пользователя]
		return parent::validate($value, $record, $type, $section);
	}

Например, проверка правильности ввода email может выглядеть так:

	public function validate($value, $record, $type, $section)
	{
		if ($value && !JMailHelper::isEmailAddress($value))
		{
			$this->setError(JText::sprintf('E_ENTEREDINCORRECT', $this->label));
		}
		return parent::validate($value, $record, $type, $section);
	}

Это метод не возвращает `TRUE` или `FALSE`, необходимо установить ошибку через `$this->setError()`.

#### метод onJSValidate

Добавляет проверку правильности ввода значения поля на форме ввода посредством JavaScript. Этот метод должен возвращать строку.

Вы можете легко получать доступ к Вашему полю, присваивая ему любой ID в файлах шаблонов.

Например, проверка на необходимость ввода значения поля может выглядеть так:

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

Конструкция кода JavaScript очень простая

	if(<expression>)
	{
		hfid.push({$this->id}); 
		isValid = false; 
		errorText.push('This field is required');
	}

Если `<expression>` есть `TRUE` или, другими словами, если есть ошибки ввода, необходимо добавить в массив `hfid` ID поля с ошибкой. Это необходимо для подсветки этого поля. Далее Вы устанавливаете `isValid` в `FALSE` для остановки передачи поля. И в конце Вы добавляете сообщение об ошибке в глобальный массив ошибок `errorText.push('This field is required');` для отображения ошибки ввода.

### Filtering Support

Для организации фильтрации по полю необходимы следующие 3 метода. Также необходимо помнить о включении группы параметров `filters` в файл .xml.

#### метод onRenderFilter

Выводит форму фильтра.

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

Этот пример демонстрирует базовый принцип работы с фильтрами.

This example demonstrates basic principal of working with filters. First is that all data have to be saved in `js_res_record_values` through `onStoreValues`. 

Now in `tmpl/filter/default.php` you can use `$this->list` to create filter elements and `$this->values` for default/selected values. Example for listing checkboxes would be

	<?php foreach($this->list AS $el):?>
		<?php $selected = (in_array($el, $this->values) ? ' checked="checked" ' : NULL)?>
		<input type="checkbox" value="<?php echo $el; ?>" name="filters[<?php echo $this->key; ?>][]" <?php echo $selected; ?> />
		<?php echo JText::_($el); ?> 
	<?php endforeach;?>

This example show list of elements as checkboxes.  Note the element name. It always have to start with `filters[<?php echo $this->key; ?>]`.


#### метод onFilterWhere

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

#### метод onFilterWornLabel

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

### Использование AJAX в полях

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

#### метод onImport


### Файлы шаблонов поля

Предназначены, в основном, для вывода поля на форме.

Например, для ввода текстового значения в шаблон формы ввода поля по умолчанию `tmpl/input/default.php` можно добавить следующий фрагмент кода

	<input type="text" name="jform[fields][<?php echo $this->id;?>]" value="<?php echo $this->value;?>" />

Обратите внимание на параметр `name`. Он обязательно должен начинаться с `jform[fields][<?php echo $this->id;?>]`.

Если в поле необходимо иметь несколько элементов `input`, можно создать массив `jform[fields][<?php echo $this->id;?>][]` или массив с ключом `jform[fields][<?php echo $this->id;?>][name]` (для информации, ключи хранятся в столбце _index_ таблицы _js_res_record_values_ базы данных). Как это можно использовать для фильтрации, будет объяснено позже.