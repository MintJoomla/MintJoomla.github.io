---
layout: doc
title:  "Customize map marker balloon"
intro:  "Customize marker info window template on Google map"
date:   2013-01-01 12:30:30
tags: developer templates fields
---

When you click on the marker on the map, info window is popped up. It has universal layout and in most cases is not what you want to see. it also do not have any parameters to hide author name or publish date.

![](/assets/img/screenshots/geo-info-window.png)

If you want to change how it looks, you will have to create custom template.

Good news with Cobalt you can fully control how this window looks. It takes some work but result is worth it.  

1. Copy file `com_cobalt/fields/geo/tmpl/window/default.php` with any other name

2. In field parameter at very bottom chose this template for info window.

    ![](/assets/img/screenshots/geo-infor-window-field-param.png)

3. Edit your new file and delete anything you do not need there.

### Suggestions

Note that rules for full view [custom article templates](/en/cobalt/custom-templates/) works. It means that you may call fields.

	$key = $this->field_keys_by_id[12];
	echo $record->fields_by_key[$key]->result;

Or directly by `ID`

	echo $record->fields_by_id[12]->result;

Where `12` is an `ID` of the field (2).

![](/assets/img/screenshots/typeandid.png)