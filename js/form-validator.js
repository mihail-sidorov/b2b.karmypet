
function formValidator($form){

    var self = this;

    var timerId;

    var captcha_mouseY;

    var alt_captcha_mouseY;

    // Внутренние методы Валидатора
        function createInfoDiv(classname){
                
            var inform_div = document.createElement('div');        

            inform_div.className = classname + ' inform_div';          
                        
            $form.append(inform_div);

            var ml_elem = document.createElement('ul');

            ml_elem.className = 'inform_ml';

            $form.find('.inform_div').append(ml_elem);
        }
    // Внутренние методы Валидатора КОНЕЦ

    // Поля Валидатора
        self.errors = [];
    // Поля Валидатора КОНЕЦ

    // Методы проверки Валидатора
        self.checkPhone = function(value, nameField){

            if (value){

                if (!value.match('^[0-9\+\(\)\-]{16}$')){

                    self.errors.push('Поле "' + nameField + '" не соответствует формату!');
                }
            }
        }

        self.checkCaptcha = function($element){
            
            if (!$element.prop('checked')){

                self.errors.push('Вы должны принять согласие на обработку персональных данных!');
            }
            // else {

            //     if (!alt_captcha_mouseY || !captcha_mouseY){

            //         self.errors.push('Зафиксировано поведение робота! Отметьте галочку мышкой и нажмите на кнопку мышкой!');
            //     } 
            // }
        }

        self.checkString = function(value, nameField){
        
            if (value){

                var rusChars = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ';

                if (!value.match('^[a-zA-Z'+rusChars+'0-9\_\ ]+$')) {
                    
                    self.errors.push('Поле "' + nameField + '" может содержать латинские или кириллические символы, цифры и знак "_"');
                }
            }
        }

        self.checkText = function(value, nameField){
        
            if (value){

                var rusChars = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ';

                if (!value.match('^[a-zA-Z'+rusChars+'0-9\.\,\;\:\?\!\'\"\(\)\_\ ]+$')) {
                    
                    self.errors.push('Поле "' + nameField + '" содержит недопустимые символы!');
                }
            }
        }

        self.checkEmail = function(value, nameField){
        
            if (value){

                var rusChars = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ';

                if (!value.match('^(['+rusChars+'a-zA-Z0-9_\.-])+@['+rusChars+'a-zA-Z0-9-]+[\.]+(['+rusChars+'a-zA-Z]{2,6}\.)?['+rusChars+'a-z]{2,6}$')) {
                    
                    self.errors.push('Поле "' + nameField + '" не соответствует формату!');
                }
            }
        }
    // Методы проверки Валидатора КОНЕЦ

    // Вывод сообщений валидатора
        self.getInfoMsg = function(){

            var typeError;

            if (self.errors.length) {

                typeError = 'error_div';
            }
            else {

                self.errors = ['Спасибо, заявка отправлена!'];

                typeError = 'success_div';

                $form.addClass('success');
            }

            createInfoDiv(typeError);
            
            self.errors.forEach(function(item){

                $form.find('.inform_div > ul').append('<li>' + item + '</li>');
            });

            $form.find('.inform_div').slideToggle(function(){

                if (!$(this).hasClass('success_div')) {

                    timerId = setTimeout(function(){

                        $form.find('.inform_div').slideToggle();
                    }, 6000);
                }
            });
        }
    // Вывод сообщений валидатора КОНЕЦ

    // Валидация формы
        self.validate = function(){

            self.errors = [];

            clearTimeout(timerId);

            $form.find('.inform_div').remove();

            var $fieldsArr = $form.find('input[type="text"], input[type="tel"], input[type="checkbox"], input[type="hidden"], textarea');

            $fieldsArr.each(function(){

                var nameField = $(this).attr('name').split('-')[0];
                
                var typeCheck = $(this).attr('name').split('-')[1];

                var obligatoryField = $(this).attr('name').split('-')[2];

                if (!nameField || !typeCheck || !obligatoryField) {

                    self.errors = ['Что-то пошло не так! (Имя не соответствует формату проверки)'];

                    return;
                }

                switch(nameField) {
                
                    case 'phone':
        
                        nameField = 'Телефон';
        
                        break;

                    default:

                        break;
                }

                if (obligatoryField === '*') {

                    if ($(this).val() === '') {

                        self.errors.push('Поле "' + nameField + '" обязательно для заполнения!');
                    }
                }

                switch(typeCheck) {

                    case 'phone':
        
                        self.checkPhone($(this).val(), nameField);
        
                        break;
        
                    case 'captcha':
        
                        self.checkCaptcha($(this));
        
                        break;
        
                    case 'string':
        
                        self.checkString($(this).val(), nameField);
        
                        break;

                    case 'text':
        
                        self.checkText($(this).val(), nameField);
        
                        break;
        
                    case 'email':
        
                        self.checkEmail($(this).val(), nameField);
        
                        break;

                    case 'ga_cid':
    
                        break;
                    
                    default:
        
                        self.errors = ['Что-то пошло не так, обновите страницу! (Не соответствие типа проверки)'];
        
                        return;
        
                        break;
                }
            });

            if (self.errors.length){

                self.getInfoMsg();
            }
            else {

                var fields = $form.serialize();

                $form.find('.form_submit_btn').addClass('load');
                
                $.ajax({

                    type: 'POST',
                    url: '/components/form-validator.php',
                    data: fields,           
                    success:  function(response) { 
                    	
                    	ym(55084774, 'reachGoal', 'order');

                        $form.find('.form_submit_btn').removeClass('load');
        
                        if (response) {
        
                            self.errors = JSON.parse(response);
                        }
                        else {
        
                            $form.find('input[name*="captcha"]').prop('checked', true);
                        }
        
                        self.getInfoMsg();
                    }    
                });
            }
        }
    // Валидация формы КОНЕЦ

    // Конструктор формы

        $form.find('input[name*="phone"]').mask("+7(999)999-99-99", {autoclear: false});

        $form.find('input[name*="captcha"]').prop('checked', true);

        $form.find('input[name*="captcha"]').on('click', function(event){

            if (event.clientY) {

                captcha_mouseY = event.clientY;
            }
            else {

                captcha_mouseY = 0;
            }
        });

        $form.find('.form_submit_btn').on('click', function(event){

            event.preventDefault();

            if (event.clientY) {

                alt_captcha_mouseY = event.clientY;
            }
            else {

                alt_captcha_mouseY = 0;
            }

            $form.submit();
        });

        $form.on('submit', function(){

            self.validate();

            return false;
        });
    // Конструктор формы КОНЕЦ
}