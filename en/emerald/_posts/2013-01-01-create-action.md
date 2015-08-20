---
layout: doc
title:  "Create action"
date:   2013-01-01 12:30:30
tags: other developer
---


## 1. Overview

Emerald action is a special Emerald extension that allow to trigger special actions on subscription successfully activation and deactivation. read more about [What are Emerald action here](/en/emerald/plan-actions/).

## 2. Create

Actions are stored in `components/com_emerald/library/actions`. Let's say we want to create action to change user Jomsocial status. So we have to create  `jomsocialstatus` folder and `jomsocialstatus.php` and `jomsocialstatus.xml` files in it. And language file. Here is the list of all files.

- components/com_emerald/library/actions/jomsocialstatus/jomsocialstatus.php
- components/com_emerald/library/actions/jomsocialstatus/jomsocialstatus.xml
- components/com_emerald/library/actions/jomsocialstatus/en-GB.com_emerald_action_jomsocialstatus.ini

## 3. XML file

XML file is very important. It is used to generate action form **(see pic. yellow)**.

    <?xml version="1.0" encoding="UTF-8"?>
    <form>
        <fields name="action">
            <fieldset name="action" description="JS_DESCR">
                <field name="text" type="category" default="I have just subscribed to %s" label="JS_TEXT"/>
            </fieldset>
        </fields>
    </form>

- `<fields>` element have to have `action` name attribute.
- You can add as many `<fieldsets>` elements as you which. In fact if you have many parameters, it is even highly recommended to keep them organized and easy to use.
- You can use `<fieldsets>` attribute `description` to add general information about this action **(see pic. green)**.

![](/assets/img/screenshots/em-action-add.png)

## 4. Language file

How edit language file and add there

    JS_DESCR="This actions add status to JomSocial profile."
    JS_TEXT="Status Text"
    JS_HINT="Add status: <b>%d<b>"

## 5. PHP file

    <?php
    defined('_JEXEC') or die();

    class EmeraldActionHook extends EmeraldAction {
    {
        public function getDescription()
        {
            return JText::sprintf('JS_HINT', JText::sprintf($this->params->get('text'), '[PLAN NAME]'));
        }
        public function onSuccess($subscription)
        {
            return true;
        }
        public function onActive($subscription)
        {
            return true;
        }
        public function onDisative($subscription)
        {
            return true;
        }
    }

- PHP class have have name `EmeraldAction[rule_name]` and extend `EmeraldAction`
- In every method you can get access to parameters through `$this->params` which is instance of `JRegistry`. Here you can access what user have chosen on action creation.

### getDescription()

This method shows description of the action in the plan parameters in action balloon. Should return string.

![](/assets/img/screenshots/em-action-balloon.png)

### onActive($subscription)

Receive user subscription object. Look `_emerald_subscriptions` table to see what fields are available. 
Here you can run your action when subscription activated. This method is triggered only when subscription owner is logged in. It means that if you as admin set subscription to any user, actions with those methods will not be triggered untill user 
logges in or refresh the page. 

It also means that `$user = JFactory::getUser()` will be always user of the subscription in that method.

### onSuccess($subscription)

This method is triggered immediately whenever subscription is activated. It means that there is no need fo user to be logged in in order to trigger this method. This one is good for Affiliate integrations for example.

### onDisactive($subscription)

Receive user subscription object. Here you can run your action when subscription activated.

<div class="alert alert-info">You may to be sure that user who purchased subscription is currently logged in user in <b>onActive</b> and <b>onDisactive</b>.</div>

## 6. Pack action

To pack action we have to create `jomsocialstatus.xml` Joomla installation XML file.

    <?xml version="1.0" encoding="utf-8"?>
    <extension version="3.0" type="file" method="upgrade">
        <name>Emerald - Action - JomSocial Status</name>
        <author>[autor_name]</author>
        <license>GPL GNU</license>
        <authorEmail>[emil]</authorEmail>
        <authorUrl>[url]</authorUrl>
        <creationDate>March 2012</creationDate>
        <copyright>[you_name]</copyright>
        <version>9.0</version>
        <description>Emerald action to update JomSocial status.</description>

        <fileset>
            <files target="components/com_emerald/library/actions">
                <folder>jomsocialstatus</folder>
            </files>
            <files folder="jomsocialstatus" target="language/en-GB">
                <filename>en-GB.com_emerald_action_jomsocialstatus.ini</filename>
            </files>
        </fileset>
    </extension>

Now when you have XML ready just zip this file along with `jomsocialstatus` folder. Here is how it should looks in zip archive.

    Zip Root
    |- jomsocialstatus/
    |  |- jomsocialstatus.xml
    |  |- jomsocialstatus.php
    |  `- en-GB.com_emerald_action_jomsocialstatus.ini
    `- jomsocialstatus.xml