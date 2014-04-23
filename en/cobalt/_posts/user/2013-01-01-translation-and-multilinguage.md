---
layout: doc
title: "Multilingual websites"
intro:  "With Cobalt you can use as Joomla standard as 3d party  or mixed translation methods."
date:   2013-01-01 12:30:30
tags: other
---

Cobalt gives you wide variety of choice how to create multi-language website. It supports 2 types of multi-language structure.

## 1. Parallel translation

Parallel translation is core Joomla i18n translation method. It is when you create new menu item for every language. It means that translations are paralleled and are not identical. There may be completely different set or number of article in one language and other articles in other language.

To use this technique, create 2 sections and 2 types each for it's own language. In menu create link to one section for one language and link to other section for other menu element language.

That is it. You will have 2 different sections paralleled. You will have to post to both sections, on section specific language if you need article in both languages or only to one section.

Of course when you create sections and types you name them with needed language and set all labels in template parameters also on special needed language.


## 2. Mirror translation

This is method when one language completely mirror other language. It means that it you add article in one language it is immediately visible in other language but not translated. In other words you have the same Cobalt section and types for all languages and the same set or number of articles for every language.

This method is little bit more complicated and unnatural for Joomla. You will have to have 3DP extensions installed like [JoomFish](http://www.joomfish.net/) or [Falang](http://www.faboba.com/en/composants/falang.html).

You will have to translate all sections and types in Cobalt in those extension in backend. Here is Falang as example. You go to translation (1) and then switch content elements (2).

![falang](/assets/img/screenshots/ml_falang.png)

To translate Cobalt articles just switch to required language and edit article. Works only with JoomFish.

### Text values translation

One of the most important is field value translation. Because in fact it has to save the same value on any language for filtering purpose, but show this value differently on any language. 

Cobalt allows to do it seamlessly. All field values are passed through `JText` Joomla class. It means it is translatable. So you can add field values as language keys. For example:

![values](/assets/img/screenshots/ml_values.png)

And then in Joomla language overrides in language manager you can add translation for those keys for all languages.

![manager](/assets/img/screenshots/ml_langoverride.png)

This is it. 

> This technique is good not only for translation, also if you want to use HTML in values with pictures and other elements.

This translation technique may be also used for all

- Filed label
- Field description
- Categoty name and description
- Section name and descritpion
- Type name and description

And also you can use it anywheer in parameters where you enter text. For example you can use keys in template parameters.

![labels](/assets/img/screenshots/ml_labels.png)

And then add translations the same way you add for field values.

## 3. Mixed translation

What is good about Cobalt it supports mixed translation type. For example one section of your site may use parallel method and other section mirrored method. 

And even more. Inside mirrored method section you can use parallel method switchings section parameter "language mode" to show article only of current language.

![langmode](/assets/img/screenshots/ml_langmode.png)
