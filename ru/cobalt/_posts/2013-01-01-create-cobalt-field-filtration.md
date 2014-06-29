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
	
Поле можно сделать сортируемым, только если оно содержит простое значение. Для этого в `xml` файл параметров необходимо включить группу `<fieldset>` именем `core`.
		
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
- параметр `ordering_mode` устанавливает режим сортировки по полю- как цифры или как буквы. 

Этот параметр не является обязательным и приведен как пример использования собственных параметров.

####Группа полей `filter`.

Определяет возможность фильтрации по полю и основные настроки применимыек к любым фильтрам.
	
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
- параметр `filter_descr` содержит описание которое будет показано радом с фильтром в форме дополнительного поиски.

Эта группа параметров является стандартной для всех полей, поддерживающих фильтрацию. Не следует ее видоизменять, т.к. эти параметры используются ядром Cobalt.

Если необходимо создать свои параметры фильтрации, следует создать отдельную группу параметров с любым именем. Но расположить ее лучше всего прям под группой  `filters` для удобства.


## Файл simpletext_filtration.php

Для обеспечения возможности фильтрации и сортировки по полю в класс поля необходимо добавить следующие предопределенные методы.


Метод | Краткое описание
---------|-------------
onStoreValues() | Сохраняет значение поля для последующей фильтрации или сортировки.
onRenderFilter() | Выводит значение поля в форме фильтра.
onFilterWhere() | Обрабатывает запрос вывода списка статей и применяет фильта.
onFilterWornLabel() | Превращает искомое значение в текст что бы отобразить в предупреждении какие фильры включены. ![filter worn][im1]
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

- `$validData`- массив данных всех полей сохраняемой записи
- `$record`- объект `JTable` сохраняемой записи
- `$this->value` - содержит абсолютно то что вы вернули в методе `onPrepareSave` при сохранении.

По умолчанию метод просто сохраняет значение поля в таблице `js_res_record_values` базы данных. 

Метод может возвращать простое значение или массив. Необходимо помнить, что таблица `js_res_record_values` предназначена только для хранения данных для фильтрации, а не для получения сохраненного значения поля. Значение поля сохраняется только через метод `onPrepareSave`.

Метод не является обязательным, т.к. в  виде "по умолчанию" он есть в родительском классе. Это означает, что его необходимо переопределять только если для фильтрации Вам необходимо использовать набор данных, отличный от значения поля (уменьшенный или наоборот, расширенный).  

	public function onStoreValues($validData, $record)
	{
		[код пользователя]
		$this->value = filter_var($this->value, FILTER_SANITIZE_EMAIL);
		return $this->value;
	}

Нужно хорошо представлять как этот метод участвует в фильтрации потому что в зависимости от того что вы тут вернете, так надо будет и осуществлять поиск.

Предположим у вас поле которое сохраняет промежуток цен на определенный товар. Это массив данный  сохраненный в `$this->value` типа

    array(0 => '100', 1 => '150')

Если вы это вернете вы знаете что индекс массива `0` это минимальное значение а `1` максимальное.

В дальнейшем мы будет искать ID статей в таблице `js_res_record_values` где значения в промежутке и так же можем учесть индекс. Например как найти все записи где 120 внутри промижутка.

    SELECT record_id FROM #__js_res_record_values 
     WHERE field_id = {$this->id} 
       AND (field_value < 120 AND value_index = 0)
       AND (field_value > 120 AND value_index = 1)

Другими словами 120 или введено для поиска занчение должно быть больше минимального числа которое под индексом 1 и меньше минимального которое под индексом 2.

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

Теперь мы можем повлиять на запрос вывода списка статей.

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

Все что было выбрано в фильтре содержится в `$this->values`.

Самый лучший и быстрый способ что не повлиять на производительность кобальта, это сделать выборку из таблицы `js_res_record_values` где вы получаете весь список айдишек которые имеют нужные значения и просто добавляете ограничение по этим ID.

Тогда использует основной ключ таблицы, и скорость работы очень быстрая.

#### метод onFilterWornLabel()

Когда фильтр применен нам надо отображать что фильтр применен. 

![filter worn][im1]

[im1]: http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/filterworn.png

Для этого нужен текст. Но искомое введеное значение может быть массивом с ненужными для текста данными. По этому надо обработать эти данные и превратить в строку. На картике `ssl` это то что вернула подобная функция а `SEARCh TEXT` это название поля.

Код метода по умолчанию.
 
	public function onFilterWornLabel($section)
	{
		$value = $this->value;
		settype($value, 'array');
		$value = implode(', ', $value);
		return $value;
	}

#### метод isFilterActive()

Этот метод используется для поределения является ли текущий фильтр активным что бы может подсветить его особо или еще для чего. Обычно это работает само по себе. В родительском классе уже есть этот метод который будет коректно работать с большинством полей.

Но бывает что в массиве данных есть что то но это все еще не причина для активации фильтра.

Нужно проверить `$this->values` и вернуть `true` или `false`. Например для этого примера должны быть введены как минимальное так и максимальное значение что бы фильтр сработал, поэтому он будет активным только если оба назначены.

	public function isFilterActive()
	{
		if(!$this->value) return 0;

		$value = $this->value;
		if(is_array($value))
		{
			$value = new JRegistry($value);
		}

		$min = $value->get('min');
		$max = $value->get('max');
		if(!empty($min) && !empty($max))
		{
			return 1;
		}
		return 0;
	}

