---
layout: doc
title:  "Create rule adapter"
date:   2013-01-01 12:30:30
tags: developer other
---

## 1. Overview

Emerald restrictions are based on adapters. There might be adapter for every joomla extension. On the moment I write this article there is only 2 adapters available.

- com_content - Adapter to create restriction rules for Joomla core articles.
- Universal - This is universal adapter that support our unique algorithm that allow restrict any extension without special integration.

Adapters are stored in `components/com_emerald/library/rules`. Every adapter match extension name like `com_content` or `com_cobalt`. WHen you select extension to restrict from dropdown list, Emerald look for adapter for this extension based on extension name, and if special adapter is not found, universal `default` adapter is used.

![](/assets/img/screenshots/select-restriction.png)

## 2. Create

Let's say we want to create adapter for `com_weblinks` extension. So we have to create  `com_weblinks` folder and `com_weblinks.php` and `com_weblinks.xml` files in it. And language file. Here is the list of all files.

- components/com_emerald/library/rules/com_weblinks/com_weblinks.php
- components/com_emerald/library/rules/com_weblinks/com_weblinks.xml
- components/com_emerald/library/rules/com_weblinks/en-GB.com_emerald_rule_com_weblinks.ini

## 3. XML file

XML file is very important. It is used to generate restriction rule form **(see pic. yellow)**.

    <?xml version="1.0" encoding="UTF-8"?>
    <form>
        <fields name="rule">
            <fieldset name="rule" description="WL_DESCR">
                <field name="cat_id" type="category" default="0" extension="com_weblinks" label="WL_CATS"/>
            </fieldset>
        </fields>
    </form>

- lets asume we want to restrict access to Weblimks extension categories. It users standard Joomla categories table and we can add Joomla standard  `category` element type to create dropdown list of all Weblinks categories.
- Although we can select only one category, we can create few rules. In fact it does not matter. We can add `multiple="true"` and select multiple categories.
- `<fields>` element have to have `rule` name attribute.
- You can add as many `<fieldsets>` elements as you which. In fact if you have many parameters, it is even highly recommended to keep them organized and easy to use.
- You can use `<fieldsets>` attribute `description` to add general information about this restriction rule adapter **(see pic. green)**.

![](/assets/img/screenshots/rule-form.png)

## 4. Language file

How edit language file and add there

    WL_DESCR="This rule restrict access to weblink catalog by categories."
    WL_CATS="Category"
    WL_HINT="Restricted category <b>%d<b>"

## 5. PHP file

    <?php
    defined('_JEXEC') or die();

    class EmeraldRuleCom_weblinks extends EmeraldRule
    {
        public function getDescription()
        {
            return JText::sprintf('WL_HINT', $this->params->get('cat_id'));
        }
        public function isProtected()
        {
            return true;
        }
    }

- PHP class have have name `EmeraldRule[rule_name]` and extend `EmeraldRule`
- In any method you can get access to parameters through `$this->params` which is instance of `JRegistry`. Here you can access what user have chosen on plan restriction.

### getDescription()

Should return string. This is summary of the restriction to show in rule balloon.

![](/assets/img/screenshots/rule-baloon.png)

### isProtected()

Should return true or false. This method is triggered `onAfterRoute` Joomla event. Here you can check what weblinks or weblink category we are trying to open.

## 6. Pack rule

To pack rule we have to create `com_weblinks.xml` Joomla installation XML file.

    <?xml version="1.0" encoding="utf-8"?>
    <extension version="3.0" type="file" method="upgrade">
        <name>Emerald - Rule - Weblinks</name>
        <author>[autor_name]</author>
        <license>GPL GNU</license>
        <authorEmail>[emil]</authorEmail>
        <authorUrl>[url]</authorUrl>
        <creationDate>March 2012</creationDate>
        <copyright>[you_name]</copyright>
        <version>9.0</version>
        <description>Emerald rule for Joomla weblinks extension.</description>

        <fileset>
            <files target="components/com_emerald/library/rules">
                <folder>com_weblinks</folder>
            </files>
            <files folder="com_weblinks" target="language/en-GB">
                <filename>en-GB.com_emerald_rule_com_weblinks.ini</filename>
            </files>
        </fileset>
    </extension>

Now when you have XML ready just zip this file along with `com_weblinks` folder. Here is how it should looks in zip archive.

    Zip Root
    |- com_weblinks/
    |  |- com_weblinks.xml
    |  |- com_weblinks.php
    |  `- en-GB.com_emerald_rule_com_weblinks.ini
    `- com_weblinks.xml