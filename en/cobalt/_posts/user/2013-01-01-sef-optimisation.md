---
layout: doc
title:  "Optimize SEF links"
date:   2013-01-01 12:30:30
tags: SEF other
intro: "Learn how you can change SEF links with settings and language translations"
---

Ofter default URL does not satisfy Cobalt users. And I understand that. We are using very simple method to build URLs. And here we have to understand our position.

> We will not make produce or implement anything in Cobalt that will increase number of SQL queries, thus affect Cobalt performance.

Long ago when we made extensions for Joomla 1.0 under JomlaEquipment brand, we had one of the most popular SEF extensions called JPromoter. We know what it is to manage SEF URls and what a cost or consequences are of a simple desire to make URLs little bit more beautiful.

### Is SEF important?

While optimization of SEF URLs use simple rule.

> URLs are not for people. URLs for search crawlers.

This is wonderful when URLs are good organized. But at the end who cares? At the end most important is the fact how link is treated by search crawler more than how visitor likes the URL. Please look as example links of youtube and facebook. 

    http://www.facebook.com/photo.php?fbid=10200538856655421&set=a.10200538848215210.2200831.1278478636&type=3&src=http%3A%2F%2Fsphotos-h.ak.fbcdn.net%2Fhphotos-ak-ash4%2F421507_10200538856655421_354195702_n.jpg&size=640%2C960

This is link to one of user pictures.

Or look at google search URL.

    https://www.google.com/search?q=find+me&aq=f&oq=find+me&aqs=chrome.0.57j60l3j0l2.1372&sourceid=chrome&ie=UTF-8

Not even close to

    https://www.google.com/search/q/find+me/

And who cares? Why should google or youtube be concerned about that? Do you really think some one will quite to use website because he do not like URLs it generates?

**Conclusion: When we make decision most important is how crawlers see the link rather than how visitors see (beauty of) the link.**

### Take IDs out of the link

One of the most wanted features is to take IDs off the URL. Bet here is the matter. Assuming we have URL like:

    http://www.mintjoomla.com/blog/item/226-cobalt-russian.html

Where **226** is and ID of an item. And we can get this easily from the URL.

But if we have something like this.

    http://www.mintjoomla.com/blog/cobalt-russian.html

To get ID of the item which we need to display item we have to run query to DB to retrieve ID based on URL.

The same for creation of this URL we have to make at least one query to DB and sometimes 2. First to check if URL already saved and second save it if it is not yet saved.

Imagine we have 100 links on single page. This is at least 100 additional queries. This is at least 1 additional second. And believe me 1 second is good. I know sites where SEF routing tales up to 5 seconds. 

This is why we will never create something like this in Cobalt. But it does not mean you cannot use it. There are third party SEF extensions integrated with cobalt like [MijoSEF][ms] for example. And this extension can give you what you want.

**Conclusion: Never sacrifice performance for sake or beauty. You will lose more on slowness of your site then earn on beauty of the link and for crawler it really makes no different if you have IDs in URL or not.**

### Optimization

But something we can do about SEF URLs in Cobalt. We use key-based URL structure. This simple means that first URL segment is a key that tells cobalt what is the type of URL and how to parse it.

#### Key optimization

Let's parse few links

    http://www.com/community/depot/category-items/2-3dp-extensions/2-integrations.html
    http://www.com/community/depot/item/2-integrations/205-cobalt-extension-for-mijosearch.html

where

- `depot` is the part of Joomla menu structure. Or menu element alias. In simple URL it is Itemid parameter.
- `category-items` и `item` are Cobalt keys
- `2-3dp-extensions` section
- `2-integrations` category
- `205-cobalt-extension-for-mijosearch` article

Keys are text variables. This means we can translate them and those are different on every language. You can override those variables in Joomla -> Extensions -> Language Manager -> Overrides

![img](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/langoverrides.png)

Here is the full list of keys you can override. Usually people want to shorten it.

- `SEF_CATITEMS` category-items
- `SEF_VWITEM` list
- `SEF_FORM_ADD` submit
- `SEF_FORM_EDIT` edit
- `SEF_ITEM` item
- `SEF_ITEMS` items
- `SEF_USERCATEGORY` user-category
- `SEF_USERITEM` user-items
- `SEF_USER_ITEM` user-item

#### Link optimization

It happens often that alias of section is the same as alias of menu. For example you have section _forum_ and you have link in menu also _forum_. When you navigate to category link will be something like.

    http://site.com/forum/3-forum/5-general.html

Here we see _forum_ word twice. First is an alias of menu element and second is an alias of section. You cannot hide anything there but you can use it to make some profit. We know that words in the URL are very important for SEO. We can use it to put something important. For example if we change aliast of section _forum_ to _community_ we will get link with additional search keyword.

    http://site.com/forum/3-community/5-general.html

Cobalt gives you ability to change aliases of Sections, categories and article, thus you can use it to create best URLs possible.

[ms]: http://www.mintjoomla.com/community/depot/item/2-cobalt-integrations/205-cobalt-extension-for-mijosearch-1-1-stable.html

#### Your own router

Cobalt has system where you can chose your own router. Joomla loads `router.php` file from the root of extension. In Cobalt this file loads another file which you can set in global Cobalt parameters.

Those files are in folder `routers`. Right now there is only one router `main_router.php` but you can copy this files and give it new name. And then select it in Cobalt config.

![routing](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/customrouting.png)

You can change this file as you want. You can hide aliases or even make SEF based on SQL queries and hide IDs.