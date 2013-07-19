---
layout: doc
title:  "Create Joomla menu links to categories or Itemid understood"
date:   2013-01-01 12:30:30
---

One of the common question is how to create links in menu that reference not to section root but to category. First I'll explain you how and then I explain why.

1. Create Joomla menu element to Cobalt section.
2. Navigate to that section.
3. Click on category you want to add to menu.
4. Copy this category URL.
5. Add new Joomla menu element and chose _External URL_.
6. Enter name, paste copied link and save menu.

Questions?

## Q: Why cannot we just create Cobalt category Joomla menu element and select category in menu element parameters?

It is simple. It is all about `Itemid`. If you do not know what it is, then just trust us on this matter and be sure what we are suggesting is the best option. And if you know what is `Itemid`, you also know all problems connected to it.

Here are some of them.

### 1. Double URLs 

It is the most frequent problem created by `Itemid`. To support SEF all links in Joomla are passed through `JRouter::_($link)`. And if there is not `Itemid`, it sets current `Itemid`. Now imagine you have a module with this piece of code.
	
	<?php echo JRoute::_('index.php?option=com_cobalt&view=records&section_id=1'); ?>
	
Note we do not pass `Itemid` there. because actually we do not know it. We do not know what is and ID of the menu element that links to _Cobalt Section [1] List_.
	
This means that on one Joomla page it may create something like this

	index.php?option=com_cobalt&view=records&section_id=1&Itemid=111

And on the other page something like this

	index.php?option=com_cobalt&view=records&section_id=1&Itemid=222
   
In fact both  links are to the same page but those are both different links for search engines crawlers because `Itemid` is different. If you use [Google webmaster tools](https://www.google.com/webmasters/tools/home) you can exclude `Itemid` parameter and it will not be considered as important.

Imagine how many `Itemid`s you will have if you create new `Itemid` for every category. And method to create links to categories solve it by ensuring all links will have the same `Itemid`.
   
### 2. Poor module control

Just because elf that double URLs problem described above, there is another problem with modules. Let's say you have Cobalt module on home page with a lot of modules. But when user click link in that module and open section you what only few modules. But since Itemid is inherited, if you navigate by link you will have all the modules of homepage. On the other hand if open the same section from the menu you will have only few modules. 

That is why we need to know `Itemid` exactly before we create a link.

Another problem is that without control over `Itemid` you cannot make it different on the article list and article full view layouts. Because article link `Itemid` will always inherit from the article list `Itemid`. Thus you cannot set different modules on the list and full views.

### 3. Repeatedness in URLs

If we would add categories link just like we add section links, Joomla would create different `Itemid` for each category. And this can also lead to the problem.

Let's say you've created a link _Forum_ with Alias `forum`. And then sub-link to category with name _General Discussions_ and alias `discussions`. Then when you click _Forum_ you will get to 

	http://mysite.com/forum

And when you click _General Discussions_ you will get to

	http://mysite.com/forum/discussions

And this is Joomla URLs created based on `Itemid`.

But if you click _General Discussions_ category link on the `http://mysite.com/forum` page you will end up with 2 options.

1. We have detected dedicated `Itemid` for this category
		
		http://mysite.com/forum/discussions/items-list/1-forum/2-discussions
	
	You an see easily see repeatedness. That is because `forum/discussions` created by Joomla and we do not have control over this and `items-list/1-forum/2-discussions` created by Cobalt router and we cannot change it as we need those parameters in URL.

2. We have not detected `Itemid` for this category. Then we end up with 

		http://mysite.com/forum/items-list/1-forum/2-discussions

	But _General Discussions_ menu element **will not be highlighted** and it will be different URL then menu URL and thus **create double URL**.

Please read how you can [optimize URLs](http://www.mintjoomla.com/community/knowledge/user-item/43-sergey/240-sef-url-optimisation-tips.html) which partially covers this subject.

### How to sole it?

To solve these problems is obviously simple. Just pass `Itemid` to `JRoute`. For example.

	<?php echo JRoute::_('index.php?option=com_cobalt&view=records&section_id=1&Itemid=111'); ?>

This will create the same link everywhere. 

But where do we take `Itemid`? Well we can run SQL query to DB and find links to this section. But since performance is everything of us we do not want to make any additional query, especially in this case it may turn into disaster  if you have for example 200 links on your page.

That is why we added parameters for:

**Section**  
![section](http://serhioromano.s3.amazonaws.com/mintjoomla/KB/ii_section.png)

**Content type**  
![type](http://serhioromano.s3.amazonaws.com/mintjoomla/KB/ii_type.png)

**Category**  
![category](http://serhioromano.s3.amazonaws.com/mintjoomla/KB/ii_category.png)

Thus we solve all the issues with double URLs. If you set those parameters you may be sure that all URLs will be the same. On the other hand you may set different `Itemid` for _section_ and _content type_ which is often the case when you want different modules in article list and article full views.

And we avoid SQL queries which may impact your site's performance.

When you create category links in Joomla menu, `Itemid` of those links should be the same as section's `Itemid`.

### Limitations

Every good idea comes with the cost. Yes we save performance and add flexibility. But we pay. And payment is the disability to create links to category through Joomla menu with an individual `Itemid`. But this is very little cost comparing to solved problems.

## Q: I do not like digits in URL like 1-forum/2-discussions. I want only text like forum/discussions. And this works with menu aliases.

That is correct. Menu aliases may create links like this. But menu aliases is not the solution to solve the problem you have (although I do not even consider any problem with digits in URL).

If you want to get rid of those IDs in url you have to use 3<sup>d</sup> party Joomla SEF extension like [MijoSEF](http://www.mintjoomla.com/community/depot/item/2-cobalt-integrations/204-cobalt-extension-for-mijosef-1-1-stable.html) for example. But remember that may significantly affect your site performance. Think twice does the beauty of the URL really costs site effectiveness?

## Q: External links are not SEO compliant link because they do not contain Itemid. Why should we use it?

Well, I my disappoint you but `Itemid` have nothing to do with SEO compliant link. In fact it is even good that all section sub-links have the same `Itemid`. 

We have to understand that although we use _External URL_ menu type it is still _Internal_ for crawlers like Google because it is under the same domain.

Second we have to understand that _External URL_ does contain `Itemid` but simple the same as section `Itemid`. 

In good hands Joomla site + [Google webmaster tools](https://www.google.com/webmasters/tools/home) - `Itemid` is set as insignificant for crawler not consider it as important variable. Because it is one of the most common cause of double URLs.

Yes, this is what i want to say. If you have `Itemid` for every category, most probably it will cause more problems than help with  SEO compliant links.