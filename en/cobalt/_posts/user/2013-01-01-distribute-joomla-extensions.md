---
layout: doc
title:  "Distribute Joomla extensions"
date:   2013-01-01 12:30:30
tags: other
intro: "How to automate distribution of Joomla extensions with Cobalt and Joomla update service feature."
---

Cobalt 8 is the perfect extension to distribute another Joomla extensions. It has all you need. You can distribute them free or paid on subscription (membership) base or sell individual downloads. Perhaps Cobalt 8 is the most flexible solution to create download sections.

More than that Cobalt 8 has new feature to support Joomla Update mechanism. When you create download listing, it automatically creates XML version of this listing to connect to Joomla update. And here I'll describe how configure it.

Please look on this Joomla update example ([read documentation](http://docs.joomla.org/Deploying_an_Update_Server)).

	<updateservers>
		<server type="extension" priority="2" name="My Extension's Updates">http://example.com/extension.xml</server>
	</updateservers>

This is what you have to insert in to extension installation XML file. We will talk how to get correct URL later but look what have to be returned by this `http://example.com/extension.xml` url.

	<update>
	   <name>Joomla! 1.7</name>
	   <description>Joomla! 1.7 CMS</description>
	   <element>joomla</element>
	   <type>file</type>
	   <version>1.7.0</version>
	   <infourl title="Joomla!">http://www.joomla.org/</infourl>
	   <downloads>
	       <downloadurl type="full" format="zip">
	       	http://joomlacode.org/gf/download/frsrelease/15279/66552/Joomla_1.6.5_to_1.7.0_Package.zip
	       </downloadurl>
	   </downloads>
	   <tags>
	       <tag>stable</tag>
	   </tags>
	   <maintainer>Sam Moffatt</maintainer>
	   <maintainerurl>http://sammoffatt.com.au</maintainerurl>
	   
	   <targetplatform name="joomla" version="1.6"/>
	</update>

Pay attention on `<version>`, `<element>`, `<tag>`, `<type>` and `<downloadurl>`. Those are important parameters that have to be there. This means that at least those parameter have to be defined in our download content type.

## 1. Create Content Type

Create Content type _Download_ and add following fields

Field Type | Name | Description
---|---|---
`select`	| Element Type | This is what we will insert into `<type>`. There is limited number of possible values, that is why you can use select and this list of values. _component_, _module_, _plugin_, _file_, _package_, _library_, _language_. When you add listing this have to be the same as in your extension installation XML. Example type in installation XML: `<install type="component" version="1.5.0" method="upgrade">`
`text` or `select`| Folder | This is required only for type _plugin_. The folder where it is being installed. Like _system_, _content_, …
`text`		| Version | This is text field. You will enter values there like this `1.0`, `1.0.1`. Note, do not enter texts like `1.0 - Beta`. Update system will not work this way. There is separate field for that. 
`text`		| System Name | This is more complicated value. It is installed name of the extension. To get it, open DB table `#__extensions`, find your installed extension and see what is there in `element` column. ![element](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/updateelement.png)
`select`	| Version Tag | This is where you can insert extension status. Use select with values _Alfa_, _Beta_, _CP_, _RC_, _Stable_.
`uploads` or `paytodownload` | Download | You can use one of the fields. The `upload` field will allow you to distribute your downloads free and on membership base. The `paytodownload` field will allow you to sell downloads individually along with membership sales and free downloads. And t will also allow others to sell from your site.

<div class="box-idea">Iа you do not want those fields to be shown in the list or full article, you may make them hidden by setting <em>Show intro</em> and <em>Show full</em> to <em>No</em></div>

This is how type may looks

![Download content type](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/updatetype.png)

## 2. Create Menu Link

Now you have to create menu link type _Cobalt -> Update Server_. 

![Menu type](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/updatelinktype.png)

In the parameters associate all the fields.

![params set](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/updatelinkparams.png)

## 3. Get Generated Codes

As finalisation of this process, open link you have just created. You will see list of your listings and their codes.

![generaged](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/generatedcodes.png)

Just insert those in to your installation XML of your extensions. That is it. But first, click the link and check update XML is generated correctly.

![code generated](http://serhioromano.s3.amazonaws.com/mintjoomla/tutorial-customtmpl/generatedxml.png)

## 4. Conclusion

Now when you update your listings on the site, change version, upload new file, … it will automatically feed all your clients with update information. All in one place. You do not need to update anything else. just work with your download listing.

Although there are some things out there, Cobalt 8, may be considered as ONLY solution to distribute Joomla Extensions.

## 5. Video Introduction

<iframe width="853" height="480" src="//www.youtube.com/embed/4OxqJJDrf50?list=PLB88FCCF99077A615" frameborder="0" allowfullscreen></iframe>