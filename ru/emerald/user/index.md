---
layout: post
title:  "Документация Emerald 9 для пользователей"
date:   2013-01-01 00:00:00
---

Cтатьи, которые помогут интегрировать изумруд с другими компанентами или создавать новые платежные терминалы.

{% for post in site.categories.ru %}
{% if post.categories contains "emerald" and post.categories contains "user" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
