---
layout: doc
title:  "Создание шаблонов - поля"
date:   2013-07-16 18:53:38
tags: templates developer
---

<div class="alert">Для понимания этой темы необходимо ознакомится с темой <a href="/ru/cobalt/create-templates-general">основы работы с шаблонами</a>.</div>

Существует замечательная и уникальная возможность изменить существующий или добавить новый _output (для вывода)_, _input (для ввода)_ или _filter (для фильтра)_ шаблон для каждого поля. Каждое поле имеет параметры для установки шаблона _output_, _filter_ или _input_. И эта замечательная и уникальная возможность дает вам полный контроль над тем, как будет выглядеть каждое поле.

![](/assets/img/screenshots/fieldstmpls.png)

Как говорилось выше, существует 3 типа шаблонов _output_, _filter_ и _input_. И все они поддерживают технологию переопределения шаблонов Joomla.

### _Вывод (Output)_

Эти шаблоны используются для вывода поля в списке статей или в полном виде статьи.

- расположение - `com_cobalt/fields/[field_name]/tmpl/output/`
- переопределение Joomla - `templates/[template_name]/html/com_cobalt/fields/[field_name]/output/`

### _Ввод (Input)_

Эти шаблоны используются в форме подачи статьи и при выводе элементов формы.

- расположение - `com_cobalt/fields/[field_name]/tmpl/input/`
- переопределение Joomla - `templates/[template_name]/html/com_cobalt/fields/[field_name]/input/`

### _Фильтр (Filter)_

Эти шаблоны используются в форме расширенного поиска или в модуле фильтра.

- расположение - `com_cobalt/fields/[field_name]/tmpl/filter/`
- переопределение Joomla - `templates/[template_name]/html/com_cobalt/fields/[field_name]/filter/`

Просто скопируйте один из шаблонов с другим именем, модифицируйте и выберите этот шаблон в параметрах поля. Или создайте одноименный файл в папке переопределения шаблонов Joomla.
