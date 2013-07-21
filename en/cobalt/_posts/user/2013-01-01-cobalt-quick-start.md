---
layout: doc
title:  "Cobalt 8 - Quick Start"
date:   2013-01-01 20:00:00
tags: setup
intro: "Learn how to start using cobalt in 5 minutes."
---

This document will guide you through 4 basic steps to work with Cobalt.  At first Cobalt may looks complicated because you will see a lot of parameters everywhere. But do not be scared, after you learn Cobalt concept, understand it is philosophy and learn those parameters you will love them. Believe me you will love every single parameter because every one of them will give you great flexibility. You will even ask for more adjustments options.

## Step 1 - Create Joomla Menu Element

I think this have to be first step to create any new section in Cobalt. I will not describe how to do that. This is standard Joomla operation. You can create menu type `separator`. Then you do not have to enter any parameters.

## Step 2 - Create Content Type

I will not explain all type parameters here, you can quickly look through them. You will find that 99% of them you do not need an explanation. It is very clear what it does.

1. Go to Cobalt > Types > New
2. Enter type name **Blog Post**. In parameters, find _Menu item ID_ and set there menu element we create in first step.
3. Now open _Submission_ slider. If you want other users submit from frontend, in _Who can submit_ select _public_ or _registered_. If you want only administrators to submit you can select _special_.

   <div class="box-info">Note! Records may be submitted only from frontend. There is no new record button in backend.</div>
   
   This is why you have to set those parameters.
   
4. Now you have to decide if you will have categories in the section or not. If your section does not have categories then in _Who can select category_ chose _No one_.

5. Click _Save & Close_ button in toolbar.
   
Type is ready. Now we have to add there some fields.

1. Click on _Fields (0)_ on the left of the type name to get to the list of the type fields.
2. Click _New_ in toolbar.
3. Enter field name _Post_
4. Select field type _HTML_. You will see parameters of the field loaded. You may leave them as they are.

If it would be  other field type we could save if. But with HTML usually we need little bit more adjustments. Because we want it on the form to be full width and in the article.

5. In the _General Parameters_ of the field on the right find _Show label_ and set it to _Hide Label_. Then find _Break after label_ and set it to _Break on submit form and record full view_.

<div class="box-info">Note! This settings are usually make sense for fields like <a href="http://www.mintjoomla.com/download-fields/item/18-simple-fields/61-field-textarea.html">Textarea</a>, <a href="http://www.mintjoomla.com/download-fields/item/18-simple-fields/62-field-html.html">HTML</a> or <a href="http://www.mintjoomla.com/download-fields/item/21-media-fields/74-field-gallery.html">Gallery</a> only in record full view but not in the form. Otherwise you may leave them default.</div>

## Step 3 - Create Section

1. Go to Cobalt > Sections > New
2. Enter section name and title _Blog_. If you want little introduction, enter section description.
3. In the _Itemid target_ parameter select menu element we created on first step.
4. Scroll down and find _Submit Type_ parameter and select type we have just created.
5. Click _Save & Close_ button in toolbar.
6. If you want to add categories, click _Categories (0)_ on the left of the section name and add categories as you usually add any core Joomla categories.

## Finalize

Now you only need to edit menu element you created and change its type to _Cobalt > Section records list_. Access this link in frontend, click _Post Blog Post Here_ and submit new article. The list of articles may not looks like a real blog, but that is because we did not set templates. This is matter for another article.

## Conclusion

Of course there is much more to learn, but look how simple is basic concept! Just in 5-10 minutes you have created your first section. You can now study one parameter after another to discover full power and opportunities Cobalt provides for you.

## Video Tutorial

<iframe width="640" height="360" src="//www.youtube.com/embed/QbEQOASPKqc" frameborder="0" allowfullscreen></iframe>

