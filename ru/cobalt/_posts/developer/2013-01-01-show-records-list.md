---
layout: doc
title:  "Вывод списка статей"
intro:  "Как получить и показать список статей Cobalt с помощью API"
date:   2015-01-01 12:30:30
tags: developer API other
---

Для показа списка статей в Cobalt существует специальный метод API. Это очень просто, всего одна строка кода.

Сначала Вы должны подключить файл API. Вы также можете использовать этот метод для проверки доступности API.

	$file = JPATH_ROOT.'/components/com_cobalt/api.php';
	if(JFile::exists($file))
	{
		include_once $file;
	}

И теперь Вы можете вызвать этот метод:
	
	$api = new CobaltApi();
	$data = $api->records(
		$section_id, 
		$view_what, 
		$orderby, 
		$type_ids,
		$user_id,
		$category_id, 
		$limit, 
		$template,
		$client,
		$client_id,
		$lang,
		$ids
	);
	
Этот метод возвращает массив с 4 ключами- `html`, `total`, `list` и `ids`.

Например

	echo '<h1>Records</h1>';
	echo JText::sprintf('Total found %d records', $data['total']);
	echo $data['html'];

Или Вы можете использовать `list`

	<ul>
		<?php
			foreach($data['list'] AS $item) {
				printf('<li><a href="%s">%s</a></li>', $item->url, $item->title);
			}
		?>
	</ul>
	
Параметр		| Описание
--------------|-------------
$section_id	| ID раздела, в котором сохранены записи.
$view_what		| Специальный системный параметр to affect records search. Список значений `$view_wnat` приведен ниже.
$orderby		| Значение параметра сортировки. Например `r.ctime DESC`. Список значений `$orderby` приведен ниже.
$type_ids		| ID типа контента или массив IDs (ID типов) типов контента.
$user_id		| ID пользователя. Если Вы передаете этот параметр, Вы получите записи только этого пользователя. Это один из самых важных параметров для socialization в других расширениях.
$category_id	| ID категории. Вы получите записи из текущей категории или узла текущей категории ?????????????????????You will get records of given category or given category node depending on your section or category "Records mode" parameter.
$limit         | Количество выбранных записей.
$template      | Шаблон вывода списка статей. Содержит значение типа `default`, `simple_list`, `table`
$client        | Имя расширения, которое использует статью Cobalt. Например, когда мы получаем обсуждения из статей ядра Joomla, клиент будет `com_cobalt`.
$client_id     | Id родительской статьи.
$lang          | `true` или `false`- показывает статьи только на текущем языке (`true`) или на любом языке (`false`).
$ids           | Массив IDs записей. Если вы хотите показать определенные статьи, Вы можете сначала получить ID этих записей через SQL запрос и потом передать их список.

Предположим, Вы отображаете список записей и Вы хотите дать пользователю некоторый контроль, что и как показать. Например, Вы хотите использовать выбор шаблона или лимит. В примере приведен список элементов XML для создания формы, которая сохранит значения для вызова этого метода позже. 

	<fieldset name="general2" label="FS_WHATTOSHOW">
		<field name="list_type" type="list" label="F_WHATTOSHOW">
			<option value="">XML_OPT_ANYARTICLE</option>
			<option value="author_created">XML_OPT_AUTHORCREATED</option>
			<option value="author_favorited">XML_OPT_AUTHORFAVORITED</option>
			<option value="author_rated">XML_OPT_AUTHORRATED</option>
			<option value="author_commented">XML_OPT_AUTHORCOMMENTED</option>
			<option value="author_visited">XML_OPT_AUTHORVISITED</option>
			
			<option value="visitor_created">XML_OPT_VISITORCREATED</option>
			<option value="visitor_favorited">XML_OPT_VISITORFAVORITED</option>
			<option value="visitor_rated">XML_OPT_VISITORRATED</option>
			<option value="visitor_commented">XML_OPT_VISITORCOMMENTED</option>
			<option value="visitor_visited">XML_OPT_VISITORVISITED</option>
			
			<option value="who_comment">XML_OPT_WHOCOMMENT</option>
			<option value="who_rate">XML_OPT_WHORATE</option>
			<option value="who_visit">XML_OPT_WHOVISIT</option>
			<option value="who_favorite">XML_OPT_WHOFAVORITE</option>
			
			<option value="tag_related">XML_OPT_TAGRELATED</option>
			<option value="author_tag_related">XML_OPT_AUTHORTAGRELATED</option>
			<option value="field_data">XML_OPT_FIELDDATA</option>
			<option value="user_field_data">XML_OPT_USERFIELDDATA</option>
		</field>
		<field name="orderby" type="list" label="CORDERING">
			<option value="r.ctime ASC">XML_OPT_CTIMEASC</option>
			<option value="r.ctime DESC">XML_OPT_CTIMEDESC</option>
			<option value="r.mtime DESC">XML_OPT_MODIFIEDDESC</option>
			<option value="r.mtime ASC">XML_OPT_MODIFIEDASC</option>
			<option value="r.title ASC">XML_OPT_TITLEASC</option>
			<option value="r.title DESC">XML_OPT_TITLEDESC</option>
			<option value="name ASC">XML_OPT_AUTHORASC</option>
			<option value="name DESC">XML_OPT_AUTHORDESC</option>
			<option value="r.hits DESC">XML_OPT_MOSTHITS</option>
			<option value="r.hits ASC">XML_OPT_LEASTHITS</option>
			<option value="r.votes_result DESC">XML_OPT_MOSTRATED</option>
			<option value="r.votes_result ASC">XML_OPT_LEASTRATED</option>
			<option value="r.comments DESC">XML_OPT_MOSTCOMMENTED</option>
			<option value="r.comments ASC">XML_OPT_LEASTCOMMENTED</option>
			<option value="r.favorite_num DESC">XML_OPT_MOSTFAVOR</option>
			<option value="r.favorite_num ASC">XML_OPT_LEASTFAVOR</option>
			<option value="RAND() ">XML_OPT_RANDOM</option>
		</field>
		<field name="section_id" type="meresourcessection" label="CSECTION" />
		<field name="type" type="mertype" multi="1" label="F_ONLYFOLLOWINGTYPES" />
		<field name="limit" type="text" size="3" default="5" label="CLIMIT" />
		<field  name="template" label="F_TMPLOVERRIDE" type="mersubtmpls" tmpltype="itemlist"  />
		<field name="field_from" type="meresourcesfields" label="F_SEARCHFROMFIELD" type_strict="1" filters="'text','radio','select','checkbox','multiselect','boolean','email','telephone','listautocomplete','datetime','image','status'" description="You can choose only 'text', 'radiobutton', 'select_simple', 'checkbox', 'multiselect', 'select_relate' field type." />
			<field name="field_in" type="meresourcesfields" default="" label="F_SEARCHINFIELD" filters="'text','radio','select','checkbox','multiselect','boolean','email','telephone','listautocomplete','datetime','image','status'" description="You can choose only 'text', 'radiobutton', 'select_simple', 'checkbox', 'multiselect', 'select_relate' field type." />
	</fieldset>

Эта форма будет содержать все данные, которые передаются методу API. Вам, наверное, не нужно будет все это. Может быть только лимит и шаблон. Это зависит от интеграции.

### Значения параметра `$view_what`

Для получения этих значений требуется `$user_id`.

Значение   | Описание
------------------|------------
`created`         | Созданные пользователем, чей ID передан в `$user_id`.
`favorited`       | В закладках у пользователя, чей ID передан в `$user_id`.
`rated`           | Проголосовано пользователем, чей ID передан в `$user_id`.
`commented`       | Прокомментировано пользователем, чей ID передан в `$user_id`.
`visited`         | Посещенные или прочтенные пользователем, чей ID передан в `$user_id`.

### ????? В чему это относится

Для получения этих значений требуется `record_id` в URL или установка `JRequest::setVar('record_id')`

Значение   | Описание
------------------|-----------------------
`who_comment`     | Кто комментировал эту запись also comment records
`who_rate`        | Кто голосовал за эту запись also comment records
`who_visit`       | Кто просматривал эту запись also comment records
`who_favorite`    | Кто помещал в закладки эту запись also comment records
`tag_related`     | Статьи с такими же тегами, как в текущей статье.
`author_tag_related`| Статьи с аналогичными тегами or current article that user given in `$user_id` has
`user_field_data` | Статьи пользователя, переданного в `$user_id` с аналогичными полями. Требуется установка специального параметра.
`field_data`      | Статьи с аналогичными полями. Требуется установка специального параметра.

### Значения параметра ``$orderby`

Значение       | Описание
---------------------|--------------
`r.ctime ASC`        | Дата создания по возрастанию.
`r.ctime DESC`       | Дата создания по убыванию или самые последние.
`r.mtime DESC`       | Дата изменения по убыванию или последние прокомментированные.
`r.mtime ASC`        | Дата изменения по возрастанию.
`r.title ASC`        | Заголовок записи по возрастанию.
`r.title DESC`       | Заголовок записи по убыванию.
`name ASC`           | Имя пользователя по возрастанию.
`name DESC`          | Имя пользователя по убыванию.
`r.hits DESC`        | Количество просмотров по убыванию или самые популярные.
`r.hits ASC`         | Количество просмотров по возрастанию или наименее популярные.
`r.votes_result DESC`| С наибольшим количеством оценок сначала.
`r.votes_result ASC` | С наименьшим количеством оценок сначала.
`r.comments DESC`    | Наибольшее количество комментариев.
`r.comments ASC`     | Наименьшее количество комментариев.
`r.favorite_num`     | Наибольшее количество в закладках.
`r.favorite_num`     | Наименьшее количество в закладках.
`RAND()`             | Случайный порядок.