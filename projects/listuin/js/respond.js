(function($){

    
//CHOOSE RANDOM NUMBER 
var $randomNumber = Math.random();  
  
//COMMENTS SECTION

var $commentBox = $('.coment-box');

var comment1 = '<img src="img/testimonial1.jpg" /><blockquote><p class="testimonial">“ Before I discoverd this website I literely had fifthine tabs reserved for web designecontant, now I have one. Thank you :) “</p></blockquote>';
var comment2 = '<img src="img/testimonial2.jpg" /><blockquote><p class="testimonial">“ Thank you so much for this website! The content quality is incredible and almost everything is very useful to me. “</p></blockquote>';
var comment3 = '<img src="img/testimonial3.jpg" /><blockquote><p class="testimonial">“ Great website, content is very useful and it helps me alot in my work. You guys have made my life easier. “</p></blockquote>';

if ($randomNumber <= 0.30) {
    $commentBox.empty();
    $commentBox.append(comment1);
}else if ($randomNumber > 0.60) {
    $commentBox.empty();
    $commentBox.append(comment2);
}else {
    $commentBox.empty();
    $commentBox.append(comment3);
}


// SOCIAL NETWORK PAGE LOAD ANIMATION
/*
var count = 1;
var $icons = $('.social-networks .fa');

var interval = setInterval(function() { 
   if (count <= $icons.length + 1) { 
      console.log(count);
      
     switch (count) {
       case 1:
         $icons.first().css('color', '#3b5998');
         break;
       case 2:
         $icons.first().css('color', '');
         $icons.eq(1).css('color', '#55acee');
         break;
       case 3:
         $icons.eq(1).css('color', '');
         $icons.eq(2).css('color', '#dd4b39');
         break;
       case 4:
         $icons.eq(2).css('color', '');
         $icons.eq(3).css('color', '#007bb5');
         break;
       case 5:
         $icons.eq(3).css('color', '');
         $icons.eq(4).css('color', '#3b5998');
         break;
       case 6:
         $icons.eq(4).css('color', '');
         $icons.eq(5).css('color', '#55acee');
         break;
       case 7:
         $icons.eq(5).css('color', '');
         $icons.eq(6).css('color', '#dd4b39');
         break;    
       case 8:
         $icons.eq(6).css('color', '');       
       default: {
          console.log('SocialN animation done');
          break;   
       }         
     }
     count++;
   }
   else { 
      clearInterval(interval);
   }
}, 250);

*/


/********************************************** LOAD LOCAL SOTRAGET AND ALL THE CHANGES ***/

if(localStorage.redCover == 'hideRedCover'){ $('#create-list').hide(); }
if(localStorage.myPageLinks == 'show') { $('#my-list-link').show(); }  
$('#link-list').append(localStorage.myList);
if($('#link-list li').length === 0 ) { $('#empty-list-msg').show();}    
  
$('#title-of-list').html(localStorage.createListName);
$('#profile-photo').attr('src', localStorage.profileImage);

// HIDE EXTERNAL LIST ITME IF LIST IS FULL
if ($('#link-list li').length >= 20) {
    $('#external-list').hide();
}    
   

/********************************************************************** CREATE MY LIST *****/ 


// CREATE LIST - zamjeni s ajaxom kad skontas
$('#create-list').on('click', function(){
        resetCreateMenu();
        $(this).fadeOut('300');
        $('#show-create-popup').fadeIn('300');  
});
    
// RESET CREATE MENU
function resetCreateMenu() {
    $titleInput.val('');
    $titleCreateTitle.html('My list');
    $('#length').html('0');
    $('#create-img').attr('src', 'img/my-list/1.png');
    $('#list-create-error').html('');
}

var $titleInput = $('#title-cr-list');    
var $titleCreateTitle = $('#title-of-create');
var $lenght = parseInt($('#length').html());

// WRITE DOWN THE LIST NAME
$titleInput.keyup(function(){
    
    var $input = $(this).val();
    var $inputLength = parseInt($input.length);
    var $result = $lenght + $inputLength;
    $('#length').html($result);
    
    
    if ($input.length < 14) {
    $titleCreateTitle.html($input);
    } else{
        $titleCreateTitle.text($titleCreateTitle.text().substr(0, 8)+ '...');
    }
    
    if ($input.length === 0) {
            $titleCreateTitle.html('My list');
        }
});

//CHOSE PHOTO
var $photoNumber = 2;

$('#create-img').on('click', function(){
    $(this).attr('src', 'img/my-list/' + $photoNumber + '.png');
    $photoNumber++;
    if ($photoNumber > 7) {
        $photoNumber = 1;
    }
});


// SAVE THE LIST BY CLICK
$('#save-create-list').on('click', function(e){
    var $title = $('#title-cr-list').val();
    if ($title === '') {
        $('#list-create-error').html('Please enter a title');
        e.preventDefault();
    }else{
        createMyProfile();
        e.preventDefault();
    }
}); 

//CHECK IF THE MAIN PAGE IS LOADES AND SAVE THE LIST BY ENTER
//(SO THIS CODE WILL WORK ONLY ON INDEX PAGE)
if ($('body').is('#main-page')) {
$(document).on('keypress', function(e){
    if (e.which == 13) {
            var $title = $('#title-cr-list').val();
            if ($title === '') {
            $('#list-create-error').html('Please enter a title');
            e.preventDefault();
        }else{
            createMyProfile();
            e.preventDefault();
        }
    }
});
}

// CREATE THE PROFILE
function createMyProfile() {
    var $title = $('#title-cr-list').val();

    //hide and save red cover
    $('#create-list').hide();
    localStorage.redCover = 'hideRedCover';

    //give list name
    $('#title-of-list').html($title);
    localStorage.createListName = $('#title-of-list').text();

    //change list photo
    var $img = $('#create-img').attr('src');
    $('#profile-photo').attr('src', $img);
    localStorage.profileImage = $('#profile-photo').attr('src');

    $('.hide-popup').fadeOut('300');

    //show links for my page on other pages
    $('#my-list-link').show();
    localStorage.myPageLinks = 'show';
    
    //conuter
    localStorage.listCount = 0;
}
    
// REMOVE MY LIST
$('#remove-my-list').on('click', function(){
    $('.close-create-popup').fadeIn('300');
});

$('#yes-remove-list').on('click', function(e){
    closePopup();  
    localStorage.clear();
    $("#create-list").show();
    e.preventDefault();
});


/*************************************************************** ADD AND REMOVE ITEMS ****/ 


    

    
    
// PIN ITEM
$('.pin').on('click', function(e){
    var $this = $(this);
    
    //change counter
    var $listCount = localStorage.listCount;
    var $count = parseInt($listCount);
    var $couter = $count++;
    localStorage.setItem('listCount', $count);
    
    var $listEmpty = $(this).next();
    
    if(!localStorage.profileImage) {
        $listEmpty.html('Create a list first').fadeIn('200');

        setTimeout(function(){
            $listEmpty.fadeOut('200');
        }, 1000);
        e.stopPropagation();
    }else if($couter >= 20) {
            $listEmpty.html('Your list is full!').fadeIn('200');

            setTimeout(function(){
                $listEmpty.fadeOut('200');
            }, 1000);
            localStorage.setItem('listCount', 20);
            e.stopPropagation();
        }else {

            // store the title and href
            var $url = $(this).next().next().attr('href');
            var $title = $(this).closest('li').find('h4').html();
            
            // show the msg
            $('#pin-this-tem').find('#pin-msg').html($title + ' is added to your list!');
            // create the list
            var $listItem = '';

            // MSG
            $('#pin-this-tem').slideDown('slow').fadeOut('300');

            //clone
            var $link = '<li class="my-list-item"><i class="fa fa-times-circle list-itme-icons remove-list-i"></i><i class="fa fa-paint-brush list-itme-icons change-color"></i><i class="fa fa-font list-itme-icons a-chage-text"></i><input type="text" maxlength="25" class="change-title-ln" size="70"><a href="' +$url + '" class="bc-bolor" target="_blank"><p class="color1"><i class="fa fa-share-square-o"></i><span class="l-title">' +$title+ '</span></p></a></li>';

            //save in my list
            function appendToStorage(name, data){
                var old = localStorage.getItem(name);
                if(old === null) old = "";
                localStorage.setItem(name, old + data);
            }

            appendToStorage('myList', $link); 
        }
    
});

// PIN THE GROUP ITEM
$('.pin-list').on('click', function(e){
     var $this = $(this);
    
    //change counter
    var $listCount = localStorage.listCount;
    var $count = parseInt($listCount);
    var $couter = $count++;
    localStorage.setItem('listCount', $count);
    
    var $listEmpty = $(this).next();

    if(!localStorage.profileImage) {
        $listEmpty.html('Create a list first').fadeIn('200');

        setTimeout(function(){
            $listEmpty.fadeOut('200');
        }, 1000);
        e.stopPropagation();
    }else if($couter >= 20) {
            $listEmpty.html('Your list is full!').fadeIn('200');

            setTimeout(function(){
                $listEmpty.fadeOut('200');
            }, 1000);
            localStorage.setItem('listCount', 20);
            e.stopPropagation();
        }else {

            // store the title and href
            var $url = $(this).next().next().attr('href');
            var $title = $(this).closest('li').find('h4').html();
            
            // show the msg
            $('#pin-this-tem').find('#pin-msg').html($title + ' is added to your list!');
            // create the list
            var $listItem = '';

            // MSG
            $('#pin-this-tem').slideDown('slow').fadeOut('300');

            //clone
            var $link = '<li class="my-list-item"><i class="fa fa-times-circle list-itme-icons remove-list-i"></i><i class="fa fa-paint-brush list-itme-icons change-color"></i><i class="fa fa-font list-itme-icons a-chage-text"></i><input type="text" maxlength="25" class="change-title-ln" size="70"><a href="' +$url + '" class="bc-bolor" target="_blank"><p class="color1"><i class="fa fa-share-square-o"></i><span class="l-title">' +$title+ '</span></p></a></li>';

            //save in my list
            function appendToStorage(name, data){
                var old = localStorage.getItem(name);
                if(old === null) old = "";
                localStorage.setItem(name, old + data);
            }

            appendToStorage('myList', $link); 
        }
});    

// REMOVE LIST ITEM 
var $storeColor;
var $storeId;    

$(document).on('click', '.remove-list-i', function(){
    $('.close-create-popup').fadeIn('300'); 
    $(this).closest('li').attr('data-info', 'remove');
    $storeId = $(this).closest('li').attr('id');
});

$('#remove-li').on('click', function(e){
    //change counter
    var $listCount = localStorage.listCount;
    var $count = parseInt($listCount);
    var $counter = $count - 1;
    localStorage.setItem('listCount', $counter);
    
    removeThisLink();
    saveList();
    countItems();
    e.preventDefault();
});

function removeThisLink(){
    $('#link-list').find('li[data-info="remove"]').remove();
    $('.close-create-popup').hide();
}

/********************************************************** MY LIST ITEMS MANIPULATIN ****/ 

    
//SORTABLE LIST - WOKING ONLY ON MY LIST PAGE AS
//ONLY THAT PAGE HAS JQUERY UI SCIPT
if($('body').hasClass('my-list')) {    
$('#link-list').sortable({
    axis: 'y'
});
}    
$('#link-list').on('mouseup', 'li', function(){
    setTimeout(function(){
        saveList();
    },100);
});    
    
    
//CHANGE COLOR OF THE ITEMS
var $colorCounter = 2;

$(document).on('click', '.change-color', function(){
    $(this).closest('li').find('.bc-bolor p').attr('class', '');
    $(this).closest('li').find('.bc-bolor p').addClass('color' + $colorCounter);
    $colorCounter++;
    if ($colorCounter > 6) {
        $colorCounter = 1;
    }   
    
    saveList();
});

//CHANGE THE TITLE
$(document).on('click', '.a-chage-text', function(){
    $(this).closest('li').find('.l-title').empty();
    $(this).closest('li').find('.change-title-ln').show().focus();
});

//CHANGE THE TITLE ON BLUR AND ENTER
$(document).on('keypress', '.change-title-ln', function(e){
    var $input = $(this).closest('li').find('.change-title-ln').val();
    var $this = $(this);
    if (e.which == 13) {
        if ($('.change-title-ln').is(':visible')){
            $this.closest('li').find('.l-title').text($input);
            $this.closest('li').find('.change-title-ln').hide();
        }
        //save in local storage
        saveList();
    }
    
});    
    
// dodaj save na blur <------------------------
    
    
//REMOVE ALL LINKS IN MY LIST   
$('#remove-all-links a').on('click', function(e){
    $('#remove-all-links span').show();
    e.preventDefault();
});    
//REMOVE ALL ITEMS - YES
$('#yes').on('click', function(){
    $('#link-list li').remove();
    $('#remove-all-links span').hide();
    saveList();
    $('#list-num-of-items').html('0');
    $('#empty-list-msg').show();
    $('#addExternal').show();
    //reset counter
    localStorage.setItem('listCount', 0);
});    

$('#no').on('click', function(){
    $('#remove-all-links span').hide();
});   
    

   
    
/************************************************************ ADD EXTERNAL LINK ***/

    
//EXTERNAL POPUP    
$('#add-external-link').on('click', function(e){
    e.preventDefault();
    //change counter
    var $listCount = localStorage.listCount;
    var $count = parseInt($listCount);
    var $couter = $count++;
    localStorage.setItem('listCount', $count);

    if($couter >= 20) {
        e.preventDefault();
        localStorage.setItem('listCount', 20);
    }else {

        $('.add-external-popup').fadeIn('300');
        //empty error messages
        $('#error-external-title').html('&nbsp;');
        $('#error-external-url').html('&nbsp;');

        // empty input messages
        $('#external-title').val(''); 
        $('#external-url').val('');
    }
});
 


//ADD EXTENRAL LINK
$('#add-external-url').on('click', function(e){
    
    var $title = $('#external-title').val();
    var $url = $('#external-url').val();
    var $errorExternalTitle = $('#error-external-title');
    var $errorExternalUrl = $('#error-external-url'); 

    var $counterStr = localStorage.listCount;
    var $couter = parseInt($counterStr);

    //change counter
    if ( $couter == 20) {
        e.preventDefault();
    }else {

    if($title.length > 0 && $url.length > 0) {
        
        var $link = '<li class="my-list-item"><i class="fa fa-times-circle list-itme-icons remove-list-i"></i><i class="fa fa-paint-brush list-itme-icons change-color"></i><i class="fa fa-font list-itme-icons a-chage-text"></i><input type="text" maxlength="25" class="change-title-ln" size="70"><a href="' +$url + '" class="bc-bolor" target="_blank"><p class="color1"><i class="fa fa-share-square-o"></i><span class="l-title">' +$title+ '</span></p></a></li>';

        $('.add-external-popup').fadeOut('300');
    }else {
         if($title.length === 0){
            $errorExternalTitle.html('Please enter a title'); 
             
        }else {
            $errorExternalTitle.html('&nbsp;'); 
        } 

        if($url.length === 0) {
            $errorExternalUrl.html('Please enter a url'); 
        }else {
             $errorExternalUrl.html('&nbsp;');
            }
    }
    //add link
    $('#link-list').append($link);
    
    saveList();   
    countItems();
    e.preventDefault();
    }    
});    

    
//ADD EXTERNAL LINK WITH ENTER
//dodati
  
    
/************************************************************** SAVE MY LIST *****/
    
function saveList() {
    var $myList = $('#link-list').html();
    localStorage.setItem('myList', $myList);
}
    
    
    
/*************************************************** COUNT ITEMS IN THE LIST *****/    
    
//LIST ITEM COUNT    
function countItems() {
    var $listLength = parseInt($('#link-list li').length);
    var $counter = $('#list-num-of-items');
    
    $counter.html($listLength);
    
    //hide and show empty list
    if ($listLength == 0) {
        $('#empty-list-msg').show();
    } else {
        $('#empty-list-msg').hide();
    }
    
    //hide and show add external link
    if ($listLength >= 20) {
        $('#addExternal').hide();
    } else {
        $('#addExternal').show();
    }
    
}    
countItems();
    
    
/*************************************************************** CLOSE POUPS *****/

// X CLOSE
$('#close').on('click', function(){
    closePopup();
});

// CANCLE CLOSE
$('.cancle').on('click', function(e){
    closePopup();
    e.preventDefault();
});

// CLOSE ALL POPUPS
function closePopup() {
    var $popup = $('.hide-popup');

    if($('#show-create-popup').is(':visible')) {
        $('#create-list').fadeIn('300');
    }
    
    $popup.fadeOut('300');
}



/************************************************************ FIX POSIBLES ERRORS *********/


var $errorTitle = $('#title-of-list').html();
if ($errorTitle == 'undefined' || $errorTitle == 'null') {$('#title-of-list').html('My list');}
var $errorProfileImg = $('#profile-photo').attr('src');
if ($errorProfileImg == 'undefined' || $errorProfileImg == 'null') {$('#profile-photo').attr('src', 'img/my-list/1.png');}






// LOCAL STORAGE

/*
if (localStorage) {
  // LocalStorage is supported!
} else {
  // No support. Use a fallback such as browser cookies or store on the server.
}

// Functions
localStorage.setItem('name', 'Matt West');

// Object
localStorage.name = 'Matt West';

// Array
localStorage['name'] = 'Matt West';

*/
  
  
  
})(jQuery);