---
layout: doc
title:  "Understanding how Cobalt search works"
date:   2013-01-01 12:30:30
---

Cobalt has built is full text search index. For best and quickest performance, all searchable texts are stored in one field when article is saved. 

## What is Full Text search?

Full text search has a quite complex definition for none technical people. Try if you can understand it reading [Wikipedia article](http://en.wikipedia.org/wiki/Full_text_search).

And if you do not understand this, here is my simple explanation. Full text search, does not look for exact match
in the index, but look for something that looks like possible match. For example you search "What is Christmas?". Full text will find all articles with word "what", and/or word "Christmas" but it will rank it. The article where there are more words like this will be ranked higher or articles with exact match highest. In other words full text search is a sort of smart search.

## Full Text Search Modes

There are 2 search modes in full text search. "Natural language" and "boolean". And Cobalt detect automatically which one to use. By default Cobalt uses natural language search mode. But if you enter only one word, then it uses boolean mode. Or if you place `+` or `-` in front of any word then it again switches to boolean mode. And boolean mode is more like words search than phrases search.

And yes you can use `+` or `-` in front of the words to include or exclude it from search result.

## Understand Parameters
There are number of parameters to customise search, and let me explain those. One parameters group is found in the section parameters. 

![params](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/fultextsearch.png)

And other in every field

![field](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/searchablefield.png)

Parameters _Search title_, _Search author name_, _Search author email_ and _Searchable_ field parameter tells Cobalt to save those values into full text index when article is saved.

Cobalt is very carefully preparing text for index. It store there only searchable text. It cleans all unnecessary things out.

But sometimes you need to find something simple. For example title of your article is an SKU of the product. Something like "A234". There is very little chance that full text search will find it or will even consider it for search. Then you can use _Search mode_. You can either use `%LIKE%` or `Detect Automatically`. In automatic mode `%LIKE%` will be used if you enter single word, and full text for phrases.

## How Do I Use Search?

You can use full text search on fronted entering search text into Cobalt search field. It will also work in core Joomla search, since Cobalt search plugin is also using full text search.

![search](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/searchinput.png)

## Known Problems

Since any text is added to `FULLTEXT` index on article save event, there is a problem when you change any on search parameters (except search mode). It does not take effect immediately for all already existing articles. You have to re-save all of them for new values to be added or deleted from index. 

But that is a way boring process. That is why there is Reindex tool in Cobalt toolset. 


[](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/reindextool.png)
