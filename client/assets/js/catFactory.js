
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .body').css('background', '#' + color)  //This changes the color of the cat
    $('.tail_1').css('borderTopColor', '#' + color)
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


function innerBodyColor(color,code) {
    $('.inner_body, .left_inner_ear, .right_inner_ear').css('background', '#' + color)  //This changes the color of the cat
    $('#innerbody').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnainnerbody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyeColor(color,code) {
    $('.pupils').css('background', '#' + color)  //This changes the color of the cat
    $('#eye').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
    $('.ear, .paw').css('background', '#' + color)  //This changes the color of the cat
    $('#ears').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}


//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2: 
            normalEyes()
            $('#eyeName').html('Chill')
             eyesType1()
            break
        case 3: 
            normalEyes()
            $('#eyeName').html('Curious')
             eyesType2()
            break
        case 4: 
            normalEyes()
            $('#eyeName').html('Anxious')
             eyesType3()
            break
        case 5: 
            normalEyes()
            $('#eyeName').html('Cool')
             eyesType4()
            break
        case 6: 
            normalEyes()
            $('#eyeName').html('tears')
             eyesType5()
            break
        case 7: 
            normalEyes()
            $('#eyeName').html('Angry')
             eyesType6()
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#patternName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#patternName').html('Persian')
            decoration1()
            break
        case 3:
            $('#patternName').html('Siamese')
            decoration2()
            break
        case 4:
            $('#patternName').html('Maine')
                decoration3()
                break
    }
}

async function normalEyes() {
    await $('.eye').find('span').css('border', 'none')
}

async function eyesType1() {
     $('.eye').find('span').css('border-top', '10px solid')
}

async function eyesType2() {
    $('.eye').find('span').css('border-bottom', '10px solid')
}

async function eyesType3() {
    $('.eye').find('span').css('border-left', '10px solid')
}

async function eyesType4() {
    $('.eye').find('span').css('border-right', '10px solid')
}
async function eyesType5() {
    $('.eye').find('span').css('border', '10px solid')
}
async function eyesType6() {
    $('.eye').find('span').css('border', '20px solid')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
async function decoration3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function patternColor1(color,code) {
    $('.cat__head-dots').css('background', '#' + color)  //This changes the color of the cat
    $('#patternMid').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function patternColor2(color,code) {
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)  //This changes the color of the cat
    $('#patternSides').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function animationVariation(num){
    $('dnaanimation').html(num);
    $('#animation').html('code: '+num)
    switch (num) {
        case 1: 
            animationType1();
            break;
        case 2:
            animationType2();
            break;
        case 3:
            animationType3();
            break;
        case 4:
            animationType4();
            break;
        case 5:
            animationType5();
            break;
        default:
            break;
    }
}

function resetAnimation(){
    $('#head').removeClass('movingHead');
    $('.pupils').removeClass('movingEye'); 
    $('.right_ear').removeClass('attentionRight'); 
    $('.left_ear').removeClass('attentionLeft');  
    $('.tail_1').removeClass('movingTail'); 
}

function animationType1(){
    // reset here
    resetAnimation();
    $('#head').addClass('movingHead');
}
function animationType2(){
    // reset here
    resetAnimation();
    $('.pupils').addClass('movingEye');  
}

function animationType3(){
    // reset here
    resetAnimation();
    $('.right_ear').addClass('attentionRight');  
}

function animationType4(){
    // reset here
    resetAnimation();
    $('.left_ear').addClass('attentionLeft');  
}

function animationType5(){
    // reset here
    resetAnimation();
    $('.tail_1').addClass('movingTail');  
}


