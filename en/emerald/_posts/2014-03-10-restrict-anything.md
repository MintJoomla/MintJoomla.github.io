---
layout: doc
title:  "Restrict Anything"
date:   2014-03-10 12:30:30
tags: setup
---

Often you will need to restrict part of the text on the page. May be hide module position or one paragraph in text content.

### [PAID] 

Just embrace part of the text you want to hide into `[PAID=JSON]Some test here[/PAID]` and this text will be hidden.

It does not matter where you place it. In any text or just place it in PHP layout files or templates. Anywhere.

`JSON` should be `json` string with parameters.


	{
		"id":"1,2,54",
		"title":"You cannot see this text!"
		"count": 1
	}

Param | Descritpion
------|---
`id`    | ID or IDs or the plans that restrict this part of the site. User will be able to se it only if he has one of those subscriptions.
`title` | Optional. If it is exists, protected will be replaced with warning box. Also link to subscription plans will be added. To change label of that link, you can in Emerald system plugin.
`count` | Count usage when restricted. By default it is `1`.

### Example

    [PAID={"id":"12,32","title":"Only paid members can see this text!"}]
    Some text is here
    [/PAID]

### [UNPAID]

There is another syntax like `[UNPAID=STRING]Some test here[/UNPAID]` where `STRING` is an IDs of the plans separated by coma. This part of the restriction defint content that will be shown to unsubscribed customers. Somethign like subscription buton or notice.

### Example

    [UNPAID=12,13,14]
    Please do not forget to subscribe!
    [/UNPAID]
