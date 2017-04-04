---
layout: doc
title:  "Customize filter module template"
intro:  "How to make custom template for filter module"
date:   2013-01-01 12:30:30
tags: developer templates filter
---

Filter module is very useful part of Cobalt. It is used very often. But the way it fetch filter fields is not always what people want.  What if you need something like this? Example is from [mobile.de](http://www.mobile.de) the site where Russians used to buy all the cars from Germany.

The example is shortened, otherwise it would take even more space.

![](/assets/img/screenshots/filter_example.png)

What we see here is advanced search form. This is very possible to make with Cobalt and either custom  markup template or filter module template. Let me show you how.

## Requirement

To be able to edit templates you have to have basic knowledge of HTML and CSS. You do not need PHP skill as you will merely need to copy/paste some code pieces without even understanding how it works. 

Would be good if you know [Twitter Bootstrap](http://twitter.github.io/bootstrap/index.html) HTML/CSS framework. Good news it is very simple and easy to learn. I am sure if you have basic HTML/CSS skill you will be able to use bootstrap in 20 minutes like a pro. And it is good to learn bootstrap as by learning it you will be able to style any other extensions layout without problems. Joomla 3 series now use bootstrap as a core library.

## Filter module template

Fist, copy template `modules/mod_cobalt_filter/tmpl/default.php` which your own name. later you can chose this template in module settings.

![](/assets/img/screenshots/filtermoduletemplate.png)

Now you can edit this file. 

There are 2 filter types. One is a core filters and second is fields. Core filters are Category, Type, text search, tags, authors, ... and fields are fields. In template you can easily see. All core filters are called explicitly and file filters are called in `foreach` cycle. 

Example of core filter 

	<?php if($params->get('filter_tags_type')):?>
		<legend>
			<?php if($params->get('show_icons', 1)):?>
				<span class="pull-left filter-icon"><?php echo HTMLFormatHelper::icon('price-tag.png');?></span>
			<?php endif;?>
			<?php echo $params->get('tag_label');?>
		</legend>
		<div class="well well-small<?php echo ( $state->get('records.tag')? ' active' : NULL)?>">
			<?php if($params->get('filter_tags_type') == 1):?>
				<?php echo JHtml::_('tags.tagform', $section, $state->get('records.tag'));?>
			<?php elseif($params->get('filter_tags_type') == 2):?>
				<?php echo JHtml::_('tags.tagcheckboxes', $section, $state->get('records.tag'));?>
			<?php elseif($params->get('filter_tags_type') == 3):?>
				<?php echo JHtml::_('tags.tagselect', $section, $state->get('records.tag'));?>
			<?php elseif($params->get('filter_tags_type') == 4):?>
				<?php echo JHtml::_('tags.tagpills', $section, $state->get('records.tag'));?>
			<?php endif;?>
		</div>
	<?php endif;?>

It is complex but only because there are some parameters in module to set what would be the form element. If you know what you want, and you want to ignore all module settings it can be as simple as this.

	<?php if($params->get('filter_tags_type')):?>
		<legend>
			<span class="pull-left filter-icon"><?php echo HTMLFormatHelper::icon('price-tag.png');?></span>
			Tags
		</legend>
		<div class="well well-small<?php echo ( $state->get('records.tag') ? ' active' : NULL)?>">
			<?php echo JHtml::_('tags.tagcheckboxes', $section, $state->get('records.tag'));?>
		</div>
	<?php endif;?>

For example if you know you want to use `checkboxes `as tag selection just display this element.

And now you want to position Field filter explicitly. You can use

	<?php echo $filters[$key]->onRenderFilter($section, TRUE); ?>

Where `$key` is a field key (1).

![](/assets/img/screenshots/typeandid.png)

But you do not need to use this key directly you may use `Id` (2). Like this: `$key = $keys_by_id[52];` where `52` is an `Id` of the field. So final code would look like this.

	<?php echo $filters[$keys_by_id[52]]->onRenderFilter($section, TRUE); ?>

Look how example layout may looks.

![](/assets/img/screenshots/templateexample.png)

Here is the code example of image above.

	<form action="<?php echo JRoute::_('index.php');?>" method="post" name="filterform" id="filter-form">
		<div class="page-header">
			<h1>Search Something</h1>
		</div>
		<div class="row-fluid">
			<div class="span4">
				<b>Tags</b>: <br>
				<?php echo JHtml::_('tags.tagselect', $section, $state->get('records.tag'));?> <br>
				<b>Categories</b>: <br>
				<?php echo JHtml::_('categories.select', $section, $state->get('records.category'), array('multiple' => 0));?>
	
				<br><br><br>
				Status: <br>
				<?php echo $filters[$keys_by_id[47]]->onRenderFilter($section, TRUE);  ?>
			</div>
			<div class="span4">
				<p>Chose checkbox you want!</p>
				<?php echo $filters[$keys_by_id[40]]->onRenderFilter($section, TRUE);  ?>
			</div>
			<div class="span4">
				<?php echo $filters[$keys_by_id[39]]->onRenderFilter($section, TRUE);  ?>
			</div>
		</div>
	
		<input type="hidden" name="option" value="com_cobalt">
		<input type="hidden" name="view" value="records">
		<input type="hidden" name="section_id" value="<?php echo $section->id;?>">
		<input type="hidden" name="cat_id" value="<?php echo $cat_id;?>">
		<input type="hidden" name="user_id" value="<?php echo ($user_id ? $user_id.':admin' : 0);?>">
		<input type="hidden" name="view_what" value="<?php echo $vw;?>">
		<input type="hidden" name="task" value="records.filters">
		<input type="hidden" name="limitstart" value="0">
		<div class="form-actions">
			<button type="submit" class="btn btn-primary btn-large">
				<?php echo JText::_('CSEARCH');?>
			</button>
		</div>
	</form>

I have just deleted everything what is inside the `<form>` except `<input type="hidden">` elements and created my own layout.

## Markup template

Markup template is the same as module filter template. The only differences are you use `$this->fields_keys_by_id` instead of `$keys_by_id`, `$this->section` instead of `$section` and `$this->filters` instead of `$filters`.

The only complexity of markup template, the template itself. It contain not only filters but user menu, title and even pagination. This may take more skill to find how to change things to make it looks like you want.

On the other hand, if you go through this difficult process of learning, you will lose fear. You will not feel limited. You will feel like you can do what ever you want without depending on anyone. All you need is just basic HTML/CSS skill.

Please read article on [How to customize Cobalt templates](/en/cobalt/custom-templates-general/) for basic understanding Cobalt templates system.