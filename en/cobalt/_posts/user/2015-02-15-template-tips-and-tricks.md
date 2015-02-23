---
layout: doc
title:  "Templates tips and tricks"
date:   2015-02-15 09:30:00
tags: templates
intro: "Additional information."
---

<div class="alert">General rules how to work with templates, please read  <a href="/en/cobalt/custom-templates-general/">Customize templates - general</a></div>

## Remove dropdown Switch view and change template labels to images with labels as tooltips

So let's try do change this template from

![Dropdown Switch view markup template](/assets/img/screenshots/markup_template_template_switcher_before.jpg)

to something like

![List Switch view with images markup template](/assets/img/screenshots/markup_template_template_switcher_after.jpg).

make copy of markup template and find `default_markup_[you name].php` file and find this code (around line 196):


    <?php if(count($this->list_templates) > 1 && in_array($markup->get('menu.menu_templates'), $this->user->getAuthorisedViewLevels()) && $this->items):?>
    	<li class="dropdown">
    		<a href="#" class="dropdown-toggle" data-toggle="dropdown">
    			<?php if($markup->get('menu.menu_templates_icon')):?>
    				<?php echo HTMLFormatHelper::icon('zones.png');  ?>
    			<?php endif;?>
    			<?php echo JText::_($markup->get('menu.menu_templates_label', 'Switch view'))?>
    			<b class="caret"></b>
    		</a>
    		<ul class="dropdown-menu">
    			<?php foreach ($this->list_templates AS $id => $template):?>
    				<?php $tmpl = explode('.', $id);
    					  $tmpl = $tmpl[0];
    				?>
    				<li>
    					<a href="javascript:void(0)" onclick="Cobalt.applyFilter('filter_tpl', '<?php echo $id?>')">
    					<?php echo ($this->list_template == $tmpl) ? '<strong>' : '';?>
    					<?php echo $template;?>
    					<?php echo ($this->list_template == $tmpl) ? '</strong>' : '';?>
    					</a>
    				</li>
    			<?php endforeach;?>
    		</ul>
    	</li>
    <?php endif;?>

and replace it with

    <?php if(count($this->list_templates) > 1 && in_array($markup->get('menu.menu_templates'), $this->user->getAuthorisedViewLevels()) && $this->items):?>
    	<?php foreach ($this->list_templates AS $id => $template):?>
    		<?php $tmpl = explode('.', $id);
    			  $tmpl = $tmpl[0];
    		?>
    		<li>
    			<a href="javascript:void(0)" onclick="Cobalt.applyFilter('filter_tpl', '<?php echo $id?>')">
    	        <img src="/images/tmpls/<?php echo strtolower(str_replace(" ", "", $template));?>.png" rel="tooltip" data-original-title="<?php echo $template ?>" />
    			</a>
    		</li>
    	<?php endforeach;?>
    <?php endif;?>

Then you only need to add so many image files to your image folder as many you have templates. For ex.

/images/tmpls/googlemap.png  
/images/tmpls/grid.png  
/images/tmpls/list.png

To apply new template go to administrator->Cobalt->Sections->your section->General parameters->Templates->Markup layout and select new template. Then configure it to your needs!

## Show or block something for users

Full View

```
<?php if(MECAccess::allowRestricted(NULL, $this->section) || 
    in_array($this->type->params->get('properties.item_can_moderate'), $this->user->getAuthorisedViewLevels())):?>
    Your stuff here.
<?php endif; ?>
```

List View

```
<?php if(MECAccess::allowRestricted(NULL, $this->section) || 
    in_array($this->submission_types[$item->type_id]->params->get('properties.item_can_moderate'), $this->user->getAuthorisedViewLevels())):?>
    Your stuff here.
<?php endif; ?>
```

## Save category in some other field as value

```
$(document).ready(function() {
    $("#jformcategory").change(function () {
        var country = "";
        $("select#selectfieldid option:selected").each(function () {
            country += $(this).text() + " ";
        });
        $("#field_ID").val(country);
    }).change();
});
```

You can also use Cobalt events [Documentation](http://docs.mintjoomla.com/en/cobalt/cobalt-events/)

```
$_POST['jfomr']['fields'][ID] = 'text field ID';
$_POST['jfomr']['fields'][ID] = array('select field ID', 'another value');
```
