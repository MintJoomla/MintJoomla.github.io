---
layout: doc
title:  "Restrict Anything"
date:   2014-08-10 12:30:30
tags: setup
---

Often you will need to restrict part of the text on the page. May be hide module position or one paragraph in text content.

### [PAID] 

Anything you place between those tags will be visible only to users who has that plan(s). 

Just embrace part of the text you want to hide into `[PAID=JSON]Some test here[/PAID]` and this text will be hidden.

It does not matter where you place it. In any text or just place it in PHP layout files or templates. Anywhere.

`JSON` should be `json` string with parameters.


	{
		"id":       "1,2,54",
		"title":    "You cannot see this text!"
		"count":    "1",
		"redirect": "0",
		"delay":    "5",
		"link":     "1"
	}

Param | Default | Description
------|---|---
`id`    | | ID or IDs or the plans that restrict this part of the site. User will be able to se it only if he has one of those subscriptions.
`title` | | Optional. If it is exists, protected will be replaced with warning box. Also link to subscription plans will be added. To change label of that link, you can in Emerald system plugin.
`count` | 1 | Count usage when access granted.
`link` | 1 | Show or hide link to subscriptions list to purchase.
`redirect` | 0| Redirect to plan purchase page. Default is 0 and it will only hide part of the content. But if you want to restrict whole page where this placeholder is met, then you can use this parameter and Emerald will redirect user to list of the plans to purchase. `title` will be used as message for redirection.
`delay` | 0 | How many days after subscription was purchased to access this content.
`user_id` | 0 | By default it is a currently logged in user. You can change whose user ID to check against.

Also inside the `[PAID]` placeholder and `title` you can use:
 
- `[NAME]` to personalize message.
- `[REMAININGDAYS]` - to display how many days left to use this subscription.

### Example

    [PAID={"id":"12,32","title":"Dear [NAME], only paid members can see this text!"}]
        [NAME], here is your content. You HAVE subscriptions!
    [/PAID]

If you use only `id` parameter you may shorten syntax to 

	[PAID=12,32]
    You HAVE subscriptions
    [/PAID]

### [UNPAID]

There is another syntax like `[UNPAID=STRING]Some test here[/UNPAID]` where `STRING` is an IDs of the plans separated by coma or JSON. 

Anything you place between these tags, will be visible to all unpaid members.

The JSON parameters are only 

Param | Default | Description
------|---|---
`id`    | | ID or IDs or the plans that restrict this part of the site. User will be able to se it only if he has one of those subscriptions.
`user_id` | 0 | By default it is a currently logged in user. You can change whose user ID to check against.

Also inside the `[UNPAID]` placeholder you can use:
 
- `[STAT_TOTAL]` how many times this restriction was purchased.
- `[STAT_COUNTRIES]` - in how many countries this restriction was purchased. Only works if you have invoicing enabled and users enter billing address.

Another nice thing you can do is to target your message. For example 

- `[NEW]*[/NEW]` - Will show content only for users who never purchased subscriptions. 
- `[EXPIRED]*[/EXPIRED]` - Will show content only for users who had purchased subscriptions but subscription had expired. 

### Example

    [UNPAID={"id":"12,32","user_id":"745"}]
    
      This site is based on membership.
    
      [NEW]Please subscribe <a href="/subscription/">here</a>.[/NEW]
    
      [EXPIRED]You subscription had expired, just update it <a href="/subscription/">here</a>.[/EXPIRED]
    
    [/UNPAID]


    [UNPAID=12,13,14]
    You DO NOT HAVE subscriptions
    [/UNPAID]
