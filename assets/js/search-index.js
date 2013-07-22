---
---
var docs = {
{% for post in site.posts %}
    {% include post.json %},
{% endfor %}};
