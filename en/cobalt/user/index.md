---
layout: post
title:  "Cobalt 9 for end users"
date:   2013-07-16 18:53:38
---

Articles which will teach you to create sites with Cobalt 8.

{% for post in site.categories.en %}
{% if post.categories contains "cobalt" and post.categories contains "user" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
