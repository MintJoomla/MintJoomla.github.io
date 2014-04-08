---
layout: doc
title:  "Create Payment Gateway"
date:   2013-01-01 12:30:30
tags: other developer
---

Payment gateway interface is very simple and contain only 2 methods. You will find it absolutely simple to integrate any gateway with off-site payment method support.

## Structure

Lets assume we are creating PayPal payment gateway. Create files in `components/com_emerald/library/gateways`



	+ paypal
	|-- paypal.php
	|-- paypal.xml
	|-- paypal.png
	|-- en-GB.com_emerald_gateway_paypal.ini
	`-- index.html


This is minimum set of files wee need. You do not need to install it into the system or go through any process to enable it in Emerald. Emerald will find it.

## Files

### HTML

`index.html` is an empty file for security reason. it is general requirement for Joomla extensions development.

### PNG

Png file is used to render button. So you can use PayPal logo, Visa and Mastercard logos. Everything to identify payment method. Something like this:

![](http://www.mintjoomla.com/images/emerald/gateways/paypal.gif)

### INI

This is language file. It will not work out of that directory, it has to be in language folder, but it will be used from there for instillation.

Example content is 



	PP_ACOUNT="PayPal email"
	PP_CURRENCY="Transaction currency"
	PP_TAX="Tax (E.g. 0.55)"
	PP_SHIP_1="Prompt for an address, but do not require one"
	PP_SHIP_2="Do not prompt for an address"
	PP_SHIP_3="Prompt for an address, and require one"



### XML

XML file contain gateway parameters. There are 2 required `<fieldset>` groups. Here is what minimum XML file for PayPal gateway would look like.


	<?xml version="1.0" encoding="utf-8"?>
	<gateway>
	<name>PayPal</name>
	<config>
		<fields name="paypal">
			<fieldset name="general">
				<field name="enable" type="radio" class="btn-group" default="0" label="E_ENABLE" description="E_ENABLEGATEWAY">
					<option value="1">Yes</option>
					<option value="0">No</option>
				</field>
				<field name="label" size="50" type="text" default="Pay with paypal" label="ELABEL" description="E_LABEDESCR"/>
				<field name="image" type="imagelist" directory="/components/com_emerald/library/gateways/paypal" hide_default="1" default="2co1.gif" label="EIMAGE" description="PARAMIMAGE"/>
			</fieldset>
	
			<fieldset name="settings" label="ESETTINGS" description="PP_MAIN_DESCR">
	
	
			</fieldset>
	
			<fieldset name="dev" label="EMR_DEV" description="EMR_DEV_DESCR">
				<field name="errorlog" type="radio" class="btn-group" default="0" label="EMR_ERROR_LOG" >
					<option value="1">Yes</option>
					<option value="0">No</option>
				</field>
				<field name="demo" type="radio" class="btn-group" default="0" label="EMR_DEMOMODE" >
					<option value="1">Yes</option>
					<option value="0">No</option>
				</field>
			</fieldset>
		</fields>
	</config>
	</gateway>

Here are few things you have to know about this example.

- Use language constants in `label`, `description` attributed and `<option>` element. Language constants for `<fieldset name="general">` and `<fieldset name="dev">` already exists in global Emerald language file. You do not need to add then to gateway language INI file.
- `name` attribute of `<field>` element should be the same ad gateway name in our case `paypal`.
- `<fieldset name="general">` is a required group as it is. Just change default text `default="Pay with paypal"` and path to button picture `directory="/components/com_emerald/library/gateways/paypal"`.
- `<fieldset name="dev">` is required and at least `errorlog` parameter should be there. Parameter `demo` may be skipped if you do not implement demo transaction method or gateway does not support it.
- `<fieldset name="settings">` is the part where you place specific gateways parameters.

The example `<fieldset name="settings">` would look like this:

	<fieldset name="settings" label="ESETTINGS" description="PP_MAIN_DESCR">
		<field name="email" type="text" label="PP_ACOUNT"/>
		<field name="lc" type="text" default="EN" label="PP_LANG" description="PP_LANG_DESCR"/>
		<field name="currency" type="list" default="USD" label="PP_CURRENCY">
			<option value="USD">U.S. Dollars (USD)</option>
			<option value="EUR">Euros (EUR)</option>
		</field>
		<field name="tax" type="text" default="0.00" label="PP_TAX"/>
		<field name="ship" type="list" class="btn-group" label="PP_SHIP" default="1">
			<option value="0">PP_SHIP_1</option>
			<option value="1">PP_SHIP_2</option>
			<option value="2">PP_SHIP_3</option>
		</field>
	</fieldset>


### PHP

Now lets create php file. Here is the minimum we need.

	<?php
	defined('_JEXEC') or die('Restricted access');

	class EmeraldGatewayPaypal extends EmeraldGateway
	{
		public function accept(&$subscription, $plan)
		{
		}

		public function pay($amount, $name, $subscription, $plan)
		{
		}	

		public function get_gateway_id()
		{
		}
		public function get_subscrption_id($who = NULL)
		{
		}
	}


Class name should be `EmeraldGateway` + capitalize name of gateway plugin in our case `Paypal`. Total is `EmeraldGatewayPaypal`.

#### pay($amount, $name, $subscription, $plan)

This is method that receive payment details and redirect user to payment gateway checkout page.

Param | Description
---|---
`$amount` | Amount to be paid
`$name` | Text variable is a description of payment.
`$subscription` | `JTable` object of created but not yet activated user subscription
`$plan` | Object that contains plan info.

Here is the example how that method may be used.



	function pay($amount, $name, $subscription, $plan)
	{
		if(!$this->params->get('email'))
		{
			$this->setError(JText::_('PP_ERR_NOEMAIL'));
			return FALSE;
		}	

		$params = $this->params;

		$param['notify_url'] = $this->_get_notify_url($subscription->id);
		$param['return']        = $this->_get_return_url($subscription->id);
		$param['cancel_return'] = $this->_get_return_url($subscription->id);	

		$param['cmd']     = "_xclick";
		$param['amount']  = floatval($amount);
		$param['business']      = $params->get('email');
		$param['item_name']     = $name;
		$param['currency_code'] = $params->get('currency', 'USD');

		$url = 'https://www.paypal.com/us/cgi-bin/webscr?' . http_build_query($param);
		if($params->get('sandbox'))
		{
			$url = 'https://www.sandbox.paypal.com/cgi-bin/webscr?' . http_build_query($param);
		}

		JFactory::getApplication()->redirect($url);
	}

1. To access parameters you simply use `$this->params`.
2. We start with check that all parameters of gateway was set.
3. If you want to through an error you have to use `$this->setError()` and then `return FALSE`;
4. Then we set parameter for gateway redirect URL. There are 2 helpers. 
   - `$this->_get_notify_url($subscription->id)` - returns callback URL. The url that will accept payments and trigger `accept()` method of the same plugin.
   - `$this->_get_return_url($subscription->id)` - return url that you can use for user return without post processing. For example for "Continue shopping" or "Return to shop" click on payment gateways checkout page.
5. Note that `http_build_query()` automatically url encode. So do not preencode values with `url_encode()`.
6. And last, we build URL and redirect to payment gateway to handle payment.

#### accept(&$subscription, $plan)

this method is called when payment gateway sends callback or notification to your server. it is triggered through link created by `$this->_get_notify_url($subscription->id)` in `pay()` method.

The main addis here is to verify transaction and set correct value for `$subscription->published`.


```
function accept(&$subscription, $plan)
{
	$this->log('Start check PayPal');

	if(!$this->_IPNcheck())
	{
		$this->setError(JText::_('EMR_CANNOT_VERYFY'));
		$this->log('PayPal: Verification failed', $_POST);

		return FALSE;
	}

	$post = JFactory::getApplication()->input->post;

	$subscription->gateway_id = $this->get_gateway_id();	switch($post->get('payment_status'))
	{
		case 'Processed' :
		case 'Completed' :
			$subscription->published = 1;
			break;
		case 'Refunded' :
			$subscription->published = 0;
			break;
	}

	$this->log('End paypal check', $subscription);

	return TRUE;
}
```

1. You have to return `TRUE` or `FALSE`. Unless you return `TRUE` no post action will be taken.
2. Set `$subscription->published` to `1` if payment is successful and `0` if not or on refunds and charge backs.
3. Use `$this->log($msq, $options)` to log process for debugging. Log file will be stored in `JOOMLA_ROOT/logs/paypal.txt`. Second parameter may be object or array. this will be also stored as string.

## Pack

Now it is time to pack your plugin to install it if you want to distribute it.

Create Joomla install file `install.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension version="3.0" type="file" method="upgrade">
	<name>Emerald - Gateway - PayPal</name>
	<author>MintJoomla</author>
	<license>GPL GNU</license>
	<authorEmail>***@mintjoomla.com</authorEmail>
	<authorUrl>http://www.mintjoomla.com</authorUrl>
	<creationDate>March 2012</creationDate>
	<copyright>(c) 2012 MintJoomla</copyright>
	<version>9.21</version>
	<description>Payment processor</description>

	<fileset>
		<files target="components/com_emerald/library/gateways">
			<folder>paypal</folder>
		</files>
		<files folder="paypal" target="language/en-GB">
			<filename>en-GB.com_emerald_gateway_paypal.ini</filename>
		</files>
	</fileset>
</extension>
```

Of course you have to change all `paypal` to your gateway name. And `<version>` have to start with `9.` for Emerald `9` series.

Now create a zip archive of following structure.

```
+ gateway_paypal.v.9.34.zip
|--+ paypal
|  |-- paypal.php
|  |-- paypal.xml
|  |-- paypal.png
|  |-- en-GB.com_emerald_gateway_paypal.ini
|  `-- index.html
`-- install.xml
```

This should be ok to install through Joomla extension manager. 

