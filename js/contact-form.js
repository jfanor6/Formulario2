/*function resetSubmit( pf ) {
		$('adminForm_'+pf).addEvent('submit', function(e) {
			new Event(e).stop();
				e.stop();
				var xSubmit = new Request.HTML(
					{url:'./index.php',
					evalScripts:false,
					update:$('displayAiContactSafeForm_'+pf),
					onRequest: function(){ 
										document.getElementById('adminForm_'+pf).elements['task'].value = 'ajaxform'; 
										document.getElementById('adminForm_'+pf).elements['use_ajax'].value = '1';
										$('aiContactSafeSend_loading_'+pf).innerHTML = '&nbsp;&nbsp;Por favor espere ...&nbsp;<img id="imgLoading" border="0" src="./images/load.gif" />&nbsp;&nbsp;';
										document.getElementById('adminForm_'+pf).elements['aiContactSafeSendButton'].disabled = true;
					},
					onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) { 
										changeCaptcha(pf,0); 
										document.getElementById('adminForm_'+pf).elements['aiContactSafeSendButton'].removeAttribute('disabled');
										if (document.getElementById('adminForm_'+pf).elements['ajax_return_to']) {
											var ajax_return_to = document.getElementById('adminForm_'+pf).elements['ajax_return_to'].value;
											if (ajax_return_to.length > 0) {
												window.location = ajax_return_to;
											}
										} else {
											if (document.getElementById('adminForm_'+pf).elements['ajax_message_sent']) {
												var return_to = document.getElementById('adminForm_'+pf).elements['return_to'].value;
												return_to = return_to.replace('&#38;', '&');
												var current_url = document.getElementById('adminForm_'+pf).elements['current_url'].value;
												current_url = current_url.replace('&#38;', '&');
												if (return_to.length > 0 && return_to != current_url) {													
													window.location = return_to;
												}
											}
										}
										$('aiContactSafeSend_loading_'+pf).innerHTML = '&nbsp;';
										setupCalendars(pf);
										if(typeof SqueezeBox!='undefined' && $('system-message')) {
											SqueezeBox.initialize();
											SqueezeBox.open($('system-message'), {
												handler: 'adopt',
												size: {x: $('system-message').offsetWidth+30, y: $('system-message').offsetHeight+30}
											});
										}
					}}
				).post($('adminForm_'+pf));
	
		});
	}*/
	function checkEditboxLimit( pf, editbox_id, chars_limit ){
		if (document.getElementById('adminForm_'+pf).elements[editbox_id]) {
			if (document.getElementById('adminForm_'+pf).elements[editbox_id].value.length > chars_limit) {
				alert('¡Máximos caracteres excedidos! !');
				document.getElementById('adminForm_'+pf).elements[editbox_id].value = document.getElementById('adminForm_'+pf).elements[editbox_id].value.substring(0,chars_limit);
			} else {
				if (document.getElementById('adminForm_'+pf).elements['countdown_'+editbox_id]) {
					document.getElementById('adminForm_'+pf).elements['countdown_'+editbox_id].value = chars_limit - document.getElementById('adminForm_'+pf).elements[editbox_id].value.length;
				}
			}
		}
	}
	/*function changeCaptcha( pf, modifyFocus ) {
		if (document.getElementById('div_captcha_img_'+pf)) {
			var set_rand = Math.floor(Math.random()*10000000001);
			var r_id = document.getElementById('adminForm_'+pf).elements['r_id'].value;
			var captcha_file = 'http://pruebas.himalayainternetmarketing.com/clave2000/index.php?option=com_aicontactsafe&sTask=captcha&task=captcha&pf='+pf+'&r_id='+r_id+'&lang=en&format=raw&set_rand='+set_rand;
			if (window.ie6) {
				var url = 'http://pruebas.himalayainternetmarketing.com/clave2000/index.php?option=com_aicontactsafe&sTask=captcha&task=newCaptcha&pf='+pf+'&r_id='+r_id+'&lang=en&format=raw&set_rand='+set_rand;
				var xCaptcha = new Request({
					url: url, 
					method: 'get', 
					onRequest: function(){
											$('div_captcha_img_'+pf).innerHTML = 'Por favor espere ...';
					},
					onComplete: function(responseText){
											$('div_captcha_img_'+pf).innerHTML = responseText;
					}
				}).send();
	
			} else {
				$('div_captcha_img_'+pf).innerHTML = '<img src="'+captcha_file+'" alt="&nbsp;" id="captcha" border="0" />';
			}
			if (modifyFocus && document.getElementById('captcha-code')) {
				document.getElementById('captcha-code').focus();
			}
		}
		if (document.getElementById('aiContactSafe_form_'+pf) || document.getElementById('aiContactSafe_module_'+pf)) {
			if (document.getElementById('reCaptchaReset')) {
				if (document.getElementById('reCaptchaReset').value == 1 && document.getElementById('recaptcha_div')) {
					if (document.getElementById('reCaptchaPublicKey')) {
						var reCaptchaPublicKey = document.getElementById('reCaptchaPublicKey').value;
					} else {
						var reCaptchaPublicKey = '';
					}
					if (document.getElementById('reCaptchaTheme')) {
						var reCaptchaTheme = document.getElementById('reCaptchaTheme').value;
					} else {
						var reCaptchaTheme = '';
					}
					Recaptcha.create(reCaptchaPublicKey, 'recaptcha_div',  { theme:reCaptchaTheme });
				}
			}
		}
		if (document.getElementById('captcha-code')) {
			$('captcha-code').value = '';
		} else if (document.getElementById('captcha_code')) {
			$('captcha_code').value = '';
		} else if (document.getElementById('mathguard_answer')) {
			$('mathguard_answer').value = '';
		} else if (document.getElementById('recaptcha_response_field')) {
			$('recaptcha_response_field').value = '';
		}
	}
	function setDate( pf, newDate, idDate ) {
		if (document.getElementById('adminForm_'+pf).elements['day_'+idDate]) {
			document.getElementById('adminForm_'+pf).elements['day_'+idDate].value = newDate.substr(8,2);
		}
		if (document.getElementById('adminForm_'+pf).elements['month_'+idDate]) {
			var selMonth = newDate.substr(5,2);
			if(selMonth.substr(0,1) == '0') {
				selMonth = selMonth.substr(1,1);
			}
			selMonth = parseInt(selMonth) - 1;
			document.getElementById('adminForm_'+pf).elements['month_'+idDate].options[selMonth].selected = true;
		}
		if (document.getElementById('adminForm_'+pf).elements['year_'+idDate]) {
			document.getElementById('adminForm_'+pf).elements['year_'+idDate].value = newDate.substr(0,4);
		}
	}
	function daysInFebruary( year ){
		var days = (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
		return days;
	}
	function daysInMonth( month, year ) {
		var days = 31;
		switch( true ) {
			case month == 2 :
				days = daysInFebruary( year );
				break;
			case month == 4 || month == 6 || month == 9 || month == 11 :
				days = 30;
				break;
		}
	   return days;
	}
	function checkDate( pf, idDate ) {
		var year = 0;
		var month = 0;
		var day = 0;
		if (document.getElementById('adminForm_'+pf).elements['year_'+idDate]) {
			year = document.getElementById('adminForm_'+pf).elements['year_'+idDate].value;
		}
		if (document.getElementById('adminForm_'+pf).elements['month_'+idDate]) {
			month = document.getElementById('adminForm_'+pf).elements['month_'+idDate].value;
		}
		if (document.getElementById('adminForm_'+pf).elements['day_'+idDate]) {
			day = document.getElementById('adminForm_'+pf).elements['day_'+idDate].value;
		}
		if (day > 0 && month > 0 && year > 0) {
			var days = daysInMonth( month, year );
			if (day > days) {
				day = days;
				document.getElementById('adminForm_'+pf).elements['day_'+idDate].value = days;
				var error = '¡Sólo %days% días en el mes seleccionado! Por favor indique primero el mes.';
				alert( error.replace( '%days%', days ) );
			}
		}
		if (document.getElementById('adminForm_'+pf).elements[idDate]) {
			document.getElementById('adminForm_'+pf).elements[idDate].value = year+'-'+month+'-'+day;
		}
	}
	function clickCheckBox( pf, idTag, ckChecked ) {
		document.getElementById('adminForm_'+pf).elements[idTag].value = ckChecked?1:0;
	}
	function hideUploadField(file_field, pf) {
		$('upload_'+pf+'_file_'+file_field).setStyle('display','none');
	}
	function showUploadField(file_field, pf) {
		$('upload_'+pf+'_file_'+file_field).setStyle('display','inline');
	}
	function resetUploadField(file_field, pf) {
		var var_file_field = "'"+file_field+"'";
		$('upload_'+pf+'_file_'+file_field).innerHTML = '<input type="file" name="'+file_field+'" id="'+file_field+'" onchange="startUploadFile('+var_file_field+','+pf+')" />';
	}
	function hideFileField(file_field, pf) {
		$('cancel_upload_'+pf+'_file_'+file_field).setStyle('display','none');
	}
	function showFileField(file_field, pf) {
		$('cancel_upload_'+pf+'_file_'+file_field).setStyle('display','inline');
	}
	function hideWaitFileField(file_field, pf) {
		$('wait_upload_'+pf+'_file_'+file_field).setStyle('display','none');
	}
	function showWaitFileField(file_field, pf) {
		$('wait_upload_'+pf+'_file_'+file_field).setStyle('display','inline');
	}
	function cancelUploadFile(file_field, pf) {
		hideFileField(file_field, pf);
		deleteUploadedFile(file_field, pf);
		$('adminForm_'+pf).elements[file_field+'_attachment_name'].value = '';
		$('adminForm_'+pf).elements[file_field+'_attachment_id'].value = '';
		resetUploadField(file_field, pf);
		showUploadField(file_field, pf);
	}
	function deleteUploadedFile(file_field, pf) {
		var file_name = $('adminForm_'+pf).elements[file_field+'_attachment_name'].value;
		var r_id = document.getElementById('adminForm_'+pf).elements['r_id'].value;
		var url = 'http://pruebas.himalayainternetmarketing.com/clave2000/index.php?option=com_aicontactsafe&sTask=message&task=deleteUploadedFile&filename='+file_name+'&r_id='+r_id+'&format=raw'
		var xUpload = new Request({
			url: url, 
			method: 'get'
		}).send();
	
	}
	function startUploadFile(file_field, pf) {
		var r_id = document.getElementById('adminForm_'+pf).elements['r_id'].value;
		$('adminForm_'+pf).setProperty('action','http://pruebas.himalayainternetmarketing.com/clave2000/index.php?option=com_aicontactsafe&field='+file_field+'&r_id='+r_id+'&format=raw');
		$('adminForm_'+pf).setProperty('target','iframe_upload_file_'+pf+'_file_'+file_field);
		$('adminForm_'+pf).elements['task'].value = 'uploadFile';
		hideUploadField(file_field, pf);
		hideFileField(file_field, pf);
		showWaitFileField(file_field, pf);
		$('adminForm_'+pf).submit();
		resetUploadField(file_field, pf);
	}
	function endUploadFile(pf, file_field, attachment_name, attachment_id, error_type, error_message) {
		error_type = parseInt(error_type);
		hideWaitFileField(file_field, pf);
		switch( error_type ) {
			case 0 :
				$('adminForm_'+pf).elements[file_field+'_attachment_name'].value = attachment_name;
				$('adminForm_'+pf).elements[file_field+'_attachment_id'].value = attachment_id;
				showFileField(file_field, pf);
				break;
			case 1 :
				alert('¡Este tipo de archivo adjunto no es permitido! ( '+error_message+' ) ');
				cancelUploadFile(file_field, pf);
				break;
			case 2 :
				alert('¡Archivo muy grande! ( '+error_message+' ) ');
				cancelUploadFile(file_field, pf);
				break;
			case 3 :
				alert('¡ Otro error ! ( '+error_message+' ) ');
				cancelUploadFile(file_field, pf);
				break;
		}
		resetSendButtonTarget(pf);
	}
	function resetSendButtonTarget(pf) {
		$('adminForm_'+pf).setProperty('action','./index.php');
		$('adminForm_'+pf).setProperty('target','_self');
		$('adminForm_'+pf).elements['task'].value = 'message';
	}
	function setupCalendars(pf) {
		var calendars_imgs = $$('#adminForm_'+pf+' img.calendar');
		var countCalendars = calendars_imgs.length;
		for(var i=0;i<countCalendars;i++) {
			var imgid = calendars_imgs[i].getProperty('id');
			if (imgid.substr(imgid.length-4)=='_img') {
				fieldid = imgid.substr(0,imgid.length-4);
				Calendar.setup({inputField : fieldid, ifFormat: "%Y-%m-%d", button : imgid, align : "Tl", singleClick : true});
			}
		}
	}*/