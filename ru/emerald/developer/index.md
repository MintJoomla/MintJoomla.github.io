---
layout: post
title:  "Документация Изумруд 9 для разработчиков"
date:   2013-07-16 18:53:38
---

Здесь стати которые помогут интегрировать изумруд с другими компанентами или создавать новые платежные терминалы.

{% for post in site.categories.developer %}
{% if post.categories contains "emerald" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
