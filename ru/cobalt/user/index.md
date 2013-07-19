---
layout: post
title:  "Документация Cobalt 9 для пользователей"
date:   2013-07-16 18:53:38
---

В этом разделе вы найдете статьи которые помогут вам понять основы Кобальт и ответят на все необходимые вопросы.

{% for post in site.categories.ru %}
{% if post.categories contains "cobalt" and post.categories contains "user" %}
- [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}
