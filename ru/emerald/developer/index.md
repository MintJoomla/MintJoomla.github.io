---
layout: post
title:  "Документация Emerald 9 для разработчиков"
date:   2013-07-16 18:53:38
---

Статьи, которые помогут создвавть и настривать подписные планы, платежные системы и управлять подписками.

{% for post in site.categories.ru %}
{% if post.categories contains "emerald" and post.categories contains "developer" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
