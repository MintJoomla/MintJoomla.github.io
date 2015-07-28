---
layout: doc
title:  "How to use the import feature of Cobalt"
date:   2015-07-27 
tags: setup
intro: "Learn how to import records from a .csv file in Cobalt."
---

One of the great features of Cobalt is the possibility to import large amounts of records from a `.CSV` or `.JSON` file into Cobalt so that you can create automatically new article/items/anything in your site. In addition, it is a smart import. If the users import the same file again, Cobalt will create new articles and update previously imported articles. For example, sellers may import their products' CSV to update their stock or prices.

Before starting you need a Section and a Type where to import your records. You can find more information about it in the <a href="http://docs.mintjoomla.com/en/cobalt/cobalt-quick-start">Quick start page</a>. 

## Step 1 - Create Joomla Menu Element

As many other functions of Cobalt, you work with imports from the __frontend__ of your site. So you need to create a menu item first to acess the import page.

![Create menu item](http://adwsfiles.s3.amazonaws.com/test/2015-07/1437607371_mj_cob_menuitem_new.png)


choose Cobalt MenuItem types ...

![Cobalt type menu](http://adwsfiles.s3.amazonaws.com/test/2015-07/1437607400_mj_cob_menuitem_types.png)

scroll down and choose Import

![Import menu item](http://adwsfiles.s3.amazonaws.com/test/2015-07/1437607472_mj_cob_menuitem_import.png)


then select a type you want to limit your imports.

<div class="alert">Remember to limit the acess to this menu item accordingly to your site needs, otherwise anyone can populate your record database!</div>


## Step 2 - Import the CSV file

As you can guess you first upload your CSV or JSON file, this is how the import is presented

![Cobalt Import page](http://www.mintjoomla.com/images/cobalt-export-import.jpg)

wait for the upload to complete and click on next. You will now be able to choose an import profile or create a new one. When you create a new profile, the area below will show the parameter fields for the import along with the Fields you created for the Type you specified in the import menu settings (see Step 1 above).

![Import fields](http://i.imgur.com/tTuX5tk.jpg)

In the Name field, you give the name of the import profile you are creating.<br>
The ID field is the special field you can use to allow updates, but you can also leave it alone selecting "Do not import anything here". If you use it, select a column of your spreadsheet file with a "unique" name, so that with next imports, if you import selecting again that same "ID", you will update your records in the DB and create new others if there is something new.<br>
In the Title field you select a column to use to give to each record the title of the article.

The remaining fields are generated based on what you created in the selected Type of the import.

When you have selected all your required fields, click next to finish the process.

<div class="info">If you encounter any issues in the process try to resave your CSV file, and use COMMAS as delimiter of your file.</div>
