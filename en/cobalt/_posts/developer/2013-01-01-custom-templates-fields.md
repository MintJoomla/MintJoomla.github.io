---
layout: doc
title:  "Customize fields templates"
date:   2013-01-01 12:30:30
tags: developer templates
---

New, unique and great possibility is to change or add any new _output_ or _input_ template for every field. Every field have parameters to set template for _output_, _filter_ or _input_. And this is great and unique feature that gives you TOTAL control over how everything will look.

Just copy one of the field template with different name, modify it and set it in fields parameters. Or create file with the same name in Joomla template override.

![Field template](/assets/img/screenshots/fieldstmpls.png)

As mentioned there are 3 template types _output_, _filter_ or _input_. And those support Joomla template override technique.

### _Output_ 

Those templates are used when formatting field output in articles list or full article templates.

- location - `com_cobalt/fields/[field_name]/tmpl/output`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/output` 

### _Input_

Those templates are used in the submission form and display form elements.

- location - `com_cobalt/fields/[field_name]/tmpl/input`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/input` 
 
### _Filter_

Those templates are used in advanced search form or in filter module.

- location - `com_cobalt/fields/[field_name]/tmpl/filter`
- Joomla override - `templates/[template_name]/html/com_cobalt/fields/[field_name]/filter` 