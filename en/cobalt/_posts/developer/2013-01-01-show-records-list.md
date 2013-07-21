---
layout: doc
title:  "Render articles list"
intro:  "How to get and display list of the  Cobalt records using API"
date:   2013-01-01 12:30:30
tags: developer API
---

To display list of the records we have a special API method. It is one line call. Very simple.

First you have to include API file. You can also use this to check if API is available at all.

	$file = JPATH_ROOT.'/components/com_cobalt/api.php';
	if(JFile::exists($file))
	{
		include_once $file;
	}

And then you can call it.
	
	$api = new CobaltApi();
	$data = $api->records(
		$section_id, 
		$view_what, 
		$orderby, 
		$type_ids,
		$user_id,
		$category_id, 
		$limit, 
		$template,
		$client,
		$client_id,
		$lang,
		$ids
	);
	
This method return array with 4 keys `html`,  `total`, `list` and `ids`.

	echo '<h1>Records</h1>';
	echo JText::sprintf('Total found %d records', $data['total']);
	echo $data['html'];

Or you can use `list`

	<ul>
	<?php
	foreach($data['list'] AS $item) {
		printf('<li><a href="%s">%s</a></li>', $item->url, $item->title);
	} ?>
	</ul>
	
Parameter		| Description
--------------|-------------
$section_id	| ID of the section in which records are stored
$view_what		| special system parameter to affect records search. See `view_wnat` tabe below
$orderby		| How to order. example `r.ctime DESC`. See list of orders below.
$type_ids		| One type ID or array of the IDs
$user_id		| ID of the user. If you pas this parameter you will get records of only this user. This is one of the most important parameters for socialization in other extensions.
$category_id	| ID of category. You will get records of given category or given category node depending on your section or category "Records mode" parameter.
$limit         | How many records to select
$template      | In what template. This is contain something like `default`, `simple_list`, `table`
$client        | Name of the extension that use Cobalt article. For example when we get discussions of Joomla core articles the client is `com_cobalt`
$client_id     | Id of the parent article.
$lang          | `true` or `false` - shoe articles of current language only or any language.
$ids           | array of record IDs. If you ant to show specific articles you can get their IDs first by SQL query and then pass to list them.



Lets assume you display list of records and you want to give user some control what and how to show. For example you want use to chose template or limit, here is the list of XML elements for creating a form that store values to call this method later.

	<fieldset name="general2" label="FS_WHATTOSHOW">
		<field name="list_type" type="list" label="F_WHATTOSHOW">
			<option value="">XML_OPT_ANYARTICLE</option>
			<option value="author_created">XML_OPT_AUTHORCREATED</option>
			<option value="author_favorited">XML_OPT_AUTHORFAVORITED</option>
			<option value="author_rated">XML_OPT_AUTHORRATED</option>
			<option value="author_commented">XML_OPT_AUTHORCOMMENTED</option>
			<option value="author_visited">XML_OPT_AUTHORVISITED</option>
			
			<option value="visitor_created">XML_OPT_VISITORCREATED</option>
			<option value="visitor_favorited">XML_OPT_VISITORFAVORITED</option>
			<option value="visitor_rated">XML_OPT_VISITORRATED</option>
			<option value="visitor_commented">XML_OPT_VISITORCOMMENTED</option>
			<option value="visitor_visited">XML_OPT_VISITORVISITED</option>
			
			<option value="who_comment">XML_OPT_WHOCOMMENT</option>
			<option value="who_rate">XML_OPT_WHORATE</option>
			<option value="who_visit">XML_OPT_WHOVISIT</option>
			<option value="who_favorite">XML_OPT_WHOFAVORITE</option>
			
			<option value="tag_related">XML_OPT_TAGRELATED</option>
			<option value="author_tag_related">XML_OPT_AUTHORTAGRELATED</option>
			<option value="field_data">XML_OPT_FIELDDATA</option>
			<option value="user_field_data">XML_OPT_USERFIELDDATA</option>
		</field>
		<field name="orderby" type="list" label="CORDERING">
			<option value="r.ctime ASC">XML_OPT_CTIMEASC</option>
			<option value="r.ctime DESC">XML_OPT_CTIMEDESC</option>
			<option value="r.mtime DESC">XML_OPT_MODIFIEDDESC</option>
			<option value="r.mtime ASC">XML_OPT_MODIFIEDASC</option>
			<option value="r.title ASC">XML_OPT_TITLEASC</option>
			<option value="r.title DESC">XML_OPT_TITLEDESC</option>
			<option value="name ASC">XML_OPT_AUTHORASC</option>
			<option value="name DESC">XML_OPT_AUTHORDESC</option>
			<option value="r.hits DESC">XML_OPT_MOSTHITS</option>
			<option value="r.hits ASC">XML_OPT_LEASTHITS</option>
			<option value="r.votes_result DESC">XML_OPT_MOSTRATED</option>
			<option value="r.votes_result ASC">XML_OPT_LEASTRATED</option>
			<option value="r.comments DESC">XML_OPT_MOSTCOMMENTED</option>
			<option value="r.comments ASC">XML_OPT_LEASTCOMMENTED</option>
			<option value="r.favorite_num DESC">XML_OPT_MOSTFAVOR</option>
			<option value="r.favorite_num ASC">XML_OPT_LEASTFAVOR</option>
			<option value="RAND() ">XML_OPT_RANDOM</option>
		</field>
		<field name="section_id" type="meresourcessection" label="CSECTION" />
		<field name="type" type="mertype" multi="1" label="F_ONLYFOLLOWINGTYPES" />
		<field name="limit" type="text" size="3" default="5" label="CLIMIT" />
		<field  name="template" label="F_TMPLOVERRIDE" type="mersubtmpls" tmpltype="itemlist"  />
		<field name="field_from" type="meresourcesfields" label="F_SEARCHFROMFIELD" type_strict="1" filters="'text','radio','select','checkbox','multiselect','boolean','email','telephone','listautocomplete','datetime','image','status'" description="You can choose only 'text', 'radiobutton', 'select_simple', 'checkbox', 'multiselect', 'select_relate' field type." />
			<field name="field_in" type="meresourcesfields" default="" label="F_SEARCHINFIELD" filters="'text','radio','select','checkbox','multiselect','boolean','email','telephone','listautocomplete','datetime','image','status'" description="You can choose only 'text', 'radiobutton', 'select_simple', 'checkbox', 'multiselect', 'select_relate' field type." />
	</fieldset>

This form will contain all data to be passed to API method. You probably will not need it all. May be only limit and template. It depends of integration.

## References

### view_what values

This values require `$user_id`

view_what Value   | Description
------------------|------------
`created`         | Created by user given in `$user_id`
`favorited`       | Bookmarked by user given in `$user_id`
`rated`           | Rated by user given in `$user_id`
`commented`       | Commented by user given in `$user_id`
`visited`         | Visited or read by user given in `$user_id`

This values require `record_id` in the url or set by `JRequest::setVar('record_id')`

view_what Value   | Description
------------------|-----------------------
`who_comment`     | Who comment this record also comment records
`who_rate`        | Who rated this record also comment records
`who_visit`       | Who visited this record also comment records
`who_favorite`    | Who bookmarked this record also comment records
`tag_related`     | Articles with the same tags of current article
`author_tag_related`| With the same tags or current article that user given in `$user_id` has
`user_field_data` | Records of user given in `$user_id` with similar field. Require special parameters to be set.
`field_data`      | Records with similar field. Require special parameters to be set.

### Ordering values

Ordering value       | Descritpion
---------------------|--------------
`r.ctime ASC`        | Time created ascending
`r.ctime DESC`       | Time created descending or most recent
`r.mtime DESC`       | Time modified descending or las commented
`r.mtime ASC`        | Time modified ascending
`r.title ASC`        | Record title ascending
`r.title DESC`       | Record title descending
`name ASC`           | Use name ascending
`name DESC`          | User name descending
`r.hits DESC`        | Record hits/views descending or most popular
`r.hits ASC`         | Records hits/views ascending or least popular
`r.votes_result DESC`| Mostly high rated first
`r.votes_result ASC` | Least ratad first
`r.comments DESC`    | Most commented
`r.comments ASC`     | Least commented
`r.favorite_num`     | Most favorited
`r.favorite_num`     | Least favorited
`RAND()`             | Random ordering