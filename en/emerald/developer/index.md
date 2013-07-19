---
layout: post
title:  "Emerald 9 for developers"
date:   2013-07-16 18:53:38
---

Articles which will help you to integrate Emerald with other extensions, create payment gateways, rules or actions.

{% for post in site.categories.en %}
{% if post.categories contains "emerald" and post.categories contains "developer" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
