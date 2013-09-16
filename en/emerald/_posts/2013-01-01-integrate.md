---
layout: doc
title:  "Programatic integration with Emerald"
date:   2013-09-16 12:30:30
tags: developer
---

This article for those who wants integrate Emerald into core of their Joomla extensions programmatically.

Let's assume you have categories and you want to restrict those. You can add parameters to category edit form, where administrator will select subscription plan and some other options.

Then in your code, before you display that category, you use those parameters to check if this category is restricted. And if yes - check if user has a subscription through Emerald API.

## Step 1: Prepare restriction parameter.

How you can easily show parameters. I hope you use native Joomla form manager and user XML file to form list of form elements.

First you have to add attribute to `<fieldset>` or `<fields>` element.

	<fieldset addfieldpath="/components/com_emerald/models/fields/">

This attribute tells where to look for special form elements type we will use.

		<fieldset name="emerald" label="Emerald Integration" addfieldpath="/components/com_emerald/models/fields/">
			<field name="plans" type="planslist" multiple="multiple" class="inputbox" label="Select plans" />
			<field name="count_limit" type="radio" class="btn-group" default="0" label="Count usages">
				<option value="0">CNO</option>
				<option value="1">CYES</option>
			</field>
			<field name="plans_msg" type="text" size="40" label="Restriction message" rows="6" cols="30"
				default="Only our paid members can access this." />
		</fieldset>

Fist parameter of type `planslist` will show list of the plans. One important attribute is `multiple`. If you what to allow select multiple plans set it `true`.

Count usages option allow you to integrate special Emerald feature to limit not only by time but only by number of times subscription should be used.

## Step 2: Protection

To check if this category is protected you simple check if plans was selected in parameters. The code will looks most of all like this.

	if($category->params->get('plans')) 
	{
		// check for restriction
	}

Or may be like this

	if($category->plans) 
	{
		// check for restriction
	}

This depends on how you will store parameters. As JSON encoded string or in a separate fields.

Now lets check access.

	$api = JPATH_ROOT./components/com_emerald/api.php';
	if(JFile::exists($api))
	{
		require_once $api;
		if(!EmeraldApi::hasSubscription($plans, $msg, $user_id, $count, $redirect, $url))
		{
			return;
		}
	}

First you have to check if `api.php` file exists to avoid fatal errors.

To check user subscriptions you will use `EmeraldApi::hasSubscription()`. This function return `true` or `false` or automatically redirect to list of the plans to purchase if false. This mean that is `$redirect` parameter is `true` you do not need `IF` statement. You can use it like this.


	$api = JPATH_ROOT./components/com_emerald/api.php';
	if(JFile::exists($api))
	{
		require_once $api;
		EmeraldApi::hasSubscription($plans, $msg, $user_id, $count, TRUE, $url);
	}

Then you know that if there is no subscription user will be redirected. Or use `$redirect` equal to `false` if you what to manage behavior manually.

Param         | Description
--------------|-------------
`$plans` | ID of the plan or array of Ids of plans. If array is passed it will check if user has one of those.
`$msg` | Message to show as system message on redirect if no subscription found.
`$user_id` | ID of the user whose access we are checking
`$count` | To count use ages of subscription or not
`$redirect` | `true` if you want user to be redirected to purchase plans page if not subscribed and `false` if you only want to receive `true` or `false` as a result of `EmeraldApi::hasSubscription()`.
`$url` | This parameter is not necessary. This is for usage count. Every count is bound to url. Here URL play role of unique access ID. Usually Emerald can get URL itself. This is only needed in very rare cases when you want to control  usage count better.


