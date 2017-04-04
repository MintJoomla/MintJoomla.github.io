---
layout: doc
title:  "Customize form templates"
date:   2013-01-01 12:30:30
tags: developer templates
---

<div class="alert">To understand this article please first read <a href="/en/cobalt/custom-templates-general">Customize templates - general</a></div>

There are 2 main field storages.

1. `$this->fields` - is the array of the fields where field ID is the key of an array
   
   If you want to render individual field you can use code like this.

           <?php echo $this->fields[12]->label.': '.$this->fields[12]->result; ?>

2. `$this->sorted_fields` - multilevel array where first element is the ID of the fields group (0 for ungrouped) and second level fields of fields where array key is the field key.

   If you want to list group of the fields you can use `foreach` for `$this->sorted_fields[10]` variable where `10` is the ID of the fields group. Read more about [field's groups](/en/cobalt/understanding-fileds-groups/).

<div class="alert alert-info">Please, study default form template. It is very self explanatory. You will find there many useful information.</div>