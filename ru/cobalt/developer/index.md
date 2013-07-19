---
layout: post
title:  "Документация Кобальт 9 для разработчиков"
date:   2013-07-16 18:53:38
---

Здесь вы найдете статьи о том как интегрировать кобальт с другими системами или как разрабатывать дополнения для Кобальт.

{% for post in site.categories.ru %}
{% if post.categories contains "cobalt" and post.categories contains "developer" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
