---
---
var docs = {
{% for post in site.posts %}
    {% if post.categories contains "video" or post.categories contains "news" %}
    {% else %}
    {% include post.json %},
    {% endif %}
{% endfor %}};
