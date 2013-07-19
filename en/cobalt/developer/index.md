---
layout: post
title:  "Cobalt 9 for developers"
date:   2013-07-16 18:53:38
---

Articles wil teach you how to integrate Cobalt 8 with other extensions and extend Cobalt.

{% for post in site.categories.en %}
{% if post.categories contains "cobalt" and post.categories contains "developer" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
