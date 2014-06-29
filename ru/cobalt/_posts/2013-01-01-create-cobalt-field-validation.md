---
layout: doc
title:  "Создание полей Часть 3 - Валидация"
intro:  "Проверка введных данных."
date:   2014-07-16 18:53:38
tags: fields developer
---

## Требования

Необходимо что бы вы уже ознакомились с [основами создания полей](/ru/cobalt/create-cobalt-field-base/) в Кобальт.

Для валидации полей есть 2 метода. 

### validate

Этот метод осуществяет валидацию на уровне сервера.

	public function validate($value, $record, $type, $section)
	{
		if($this->params->get('params.val_max', 0) > 0 && 
			$this->params->get('params.val_min', 0) > 0)
		{
			if($value > $this->params->get('params.val_max', 0) || 
				$value < $this->params->get('params.val_min', 0))
			{
				$this->setError(JText::sprintf('D_MINMAX_ERROR', $this->label, 
					$this->params->get('params.val_min', 0), $this->params->get('params.val_max', 0)));
				return false;
			}
		}
		return parent::validate($value, $record, $type, $section);
	}

Здесь есть 2 важных момента. Во первых не важно что вы вернете `true` или `false`. Если вы хотите сообщить об ошибке то нужно выполнить `$this->setError()` а уж после этого можно и вернуть `false`.

Второе это что надо всегда заканчивать

	return parent::validate($value, $record, $type, $section);

Это потому что в родительском классе тоже есть стандарные проверки например на то обязательно это поле или нет.

### onJSValidate

Этот метод нужен для того что бы добавить яваскрипт проверку после нажатия кнопки сохранить и перед отправкой данных на сервер.

Метод должен вернуь текст яваскрипта.

Основной идеей проверки яваскриптом является обнаружение не правильно введных или не заполненых полей если они обязательные. Что бы произвести ошибку нужно сделать 3 действия

	isValid = false; 
	errorText.push('Please enter field value'); 
	hfid.push({$this->id})

Первое это изменить переменную валидности формы `false`. После этого форма уже не будет отправлена. Теперь нам нужно вывести сообщение об ошибке. Для этого вторая строка в которой вы в массив сообщенй об ошибках добавляете текст олибки.

И последня строка добаляет айди поля в котором поизошла ошибка что бы знать где это сообщение показать и какое поле подсветить краным.

Например проверяем заполнили мы поля или нет если оно обязательно.

	public function onJSValidate()
	{
		$js = '';
		if($this->required)
		{
			$js .= "if(jQuery('#field_{$this->id}').val() == ''){
				isValid = false; 
				errorText.push('" . addslashes(JText::sprintf('CFIELDREQUIRED', $this->label)) . "');
				hfid.push({$this->id}); 
			}";
		}

		return $js;
	}
