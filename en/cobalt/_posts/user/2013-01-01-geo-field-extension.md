---
layout: doc
title: "Add new fields to geo field"
date: 2013-07-02 18:00:00
tags: other
intro: "Add additional contact and links fields."
---

Sometimes you need more fields than there is. For example what if you want users to enter their instagram profile homepage URL? You can easily do it.

Open folder `com_cobalt/fields/geo/` and you will find file there `additional.php.txt`. Rename it to `additional.php` and this way you activate file where you can add additional fields. Not only add them there, but also you can manage them in field parameters to set if it is required and where to see its date in the list or in full article view.

The syntax is very simple. And you can already see examples there. Basically you have to create array with special name which will be merged with core fields.

There are only 2 array names possible.

- `$contacts` - to extend contact fields like telephones, skype, ... (yellow)
- `$links` - to extend section with links input. (green)

![section](/assets/img/screenshots/geo-form.png)

    <?php
    $contacts = array(
        'm_agent' => array(
            'label' => JText::_('Mail.ru Agent'),
            'patern' => '<a href="aim:goim?screenname=[VALUE]">[VALUE]</a>',
            'icon' => JURI::root(TRUE) . '/components/com_cobalt/fields/geo/icons/magent.png',
            'preg' => '[0-9\(\)\. \-\+\#]*'
        ),
    );

    $links = array(
        'instagram' => array(
            'label' => JText::_('Instagram'),
            'icon' => JURI::root(TRUE) . '/components/com_cobalt/fields/geo/icons/insta.png'
        ),
    );


- `label` -  the label of the field.
- `patern` - the string to render field's value. By default pattern is `[VALUE]` but you may change it if you want to make it link.
- `icon` - full path to 16x16 icon.
- `preg` - field value validation. You do not ned to enter open and close signs. For example your `preg` is `[0-9]*`. Then it will be matched against `/^[0-9]*$/iU`.