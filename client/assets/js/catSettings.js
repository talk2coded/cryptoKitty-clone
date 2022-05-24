
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "innerColor" : 13,
    "eyescolor" : 96,
    "earscolor" : 10,
    //Cattributes
    "eyesShape" : 2,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor);
    innerBodyColor(colors[dna.innerColor],dna.innerColor)
    $('#innerbodycolor').val(dna.innerColor);
    eyeColor(colors[dna.eyescolor],dna.eyescolor)
    $('#eyeColor').val(dna.eyescolor);
    earsColor(colors[dna.earscolor],dna.earscolor)
    $('#earColor').val(dna.earscolor);
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape);
    decorationVariation(dna.decorationPattern)
    $('#patternshape').val(dna.decorationPattern);
    patternColor1(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    $('#patternColor1').val(dna.decorationMidcolor);
    patternColor2(colors[dna.decorationSidescolor],dna.decorationSidescolor)
    $('#patternColor2').val(dna.decorationSidescolor);
    animationVariation(dna.animation)
    $("#animationRange").val(dna.animation)

}






// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#innerbodycolor').change(()=>{
  var colorVal = $('#innerbodycolor').val()
 innerBodyColor(colors[colorVal],colorVal)
})

$('#eyeColor').change(()=>{
  var colorVal = $('#eyeColor').val()
 eyeColor(colors[colorVal],colorVal)
})

$('#earColor').change(()=>{
  var colorVal = $('#earColor').val()
 earsColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val()) // between 1 and 7
   eyeVariation(shape)
})

$('#patternshape').change(()=>{
  var shape = parseInt($('#patternshape').val()) // between 1 and 7
   decorationVariation(shape)
})
$('#patternColor1').change(()=>{

  var colorVal = $('#patternColor1').val()
   patternColor1(colors[colorVal],colorVal)
})

$('#patternColor2').change(()=>{
  var colorVal = $('#patternColor2').val()
   patternColor2(colors[colorVal],colorVal)
})

$('#animationRange').change(()=>{
  var animationVal = parseInt($('#animationRange').val())
   animationVariation(animationVal)
})

$("#eyeShapeGroup").hide();
  $("#decoGroup").hide();
  $('#midDecoGroup').hide();
  $('#sideDecoGroup').hide();
  $("#animGroup").hide();
  

$('#btnColorsTab').click(()=>{
  $("#headGroup").show()
  $("#mouthGroup").show()
  $("#eyesGroup").show()
  $("#earsGroup").show()

  $("#eyeShapeGroup").hide();
  $("#decoGroup").hide();
  $('#midDecoGroup').hide();
  $('#sideDecoGroup').hide();
  $("#animGroup").hide();
});


$('#btnAttributesTab').click(()=>{
  $('#headGroup').hide();
  $('#mouthGroup').hide();
  $('#eyesGroup').hide();
  $('#earsGroup').hide();

  $('#eyeShapeGroup').show();
  $('#decoGroup').show();
  $('#midDecoGroup').show();
  $('#sideDecoGroup').show();
  $("#animGroup").show();
});

//Randomize Function
$('#random').click(()=>{
  var bodycolor = Math.floor(Math.random() * 89) + 10;
  headColor(colors[bodycolor],bodycolor)
  $("#bodycolor").val(bodycolor)
  var mouthcolor = Math.floor(Math.random() * 89) + 10;
  innerBodyColor(colors[mouthcolor],mouthcolor)
  $("#mouthcolor").val(mouthcolor)
  var eyescolor = Math.floor(Math.random() * 89) + 10;
  eyeColor(colors[eyescolor],eyescolor)
  $("#eyescolor").val(eyescolor)
  var earscolor = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[earscolor],earscolor)
  $("#earscolor").val(earscolor)
  var eyevar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  eyeVariation(eyevar)
  $("#eyeshape").val(eyevar)
  var decovar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  decorationVariation(decovar)
  $("#decorationstyle").val(decovar)
  var decMidVar = Math.floor(Math.random() * 89) + 10;
  patternColor1(colors[decMidVar],decMidVar)
  $("#decMidColor").val(decMidVar)
  var decSideVar = Math.floor(Math.random() * 89) + 10;
  patternColor2(colors[decSideVar],decSideVar)
  $("#decSideColor").val(decSideVar)
  var anim = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  animationVariation(anim)
  $("#animation").val(anim)
})

$('#reset').click(()=>{

  headColor(colors[defaultDNA.headcolor],defaultDNA.headcolor)
  $("#bodycolor").val(defaultDNA.headcolor)
 
  innerBodyColor(colors[defaultDNA.innerColor],defaultDNA.innerColor)
  $("#mouthcolor").val(defaultDNA.innerColor)
 
  eyeColor(colors[defaultDNA.eyescolor],defaultDNA.eyescolor)
  $("#eyescolor").val(defaultDNA.eyescolor)
  
  earsColor(colors[defaultDNA.earscolor],defaultDNA.earscolor)
  $("#earscolor").val(defaultDNA.earscolor)

  eyeVariation(defaultDNA.eyesShape)
  $("#eyeshape").val(defaultDNA.eyesShape)
  
  decorationVariation(defaultDNA.decorationPattern)
  $("#decorationstyle").val(defaultDNA.decorationPattern)

  patternColor1(colors[defaultDNA.decorationMidcolor],defaultDNA.decorationMidcolor)
  $("#decMidColor").val(defaultDNA.decorationMidcolor)
  
  patternColor2(colors[defaultDNA.decorationSidescolor],defaultDNA.decorationSidescolor)
  $("#decSideColor").val(defaultDNA.decorationSidescolor)

  animationVariation(defaultDNA.animation)
  $("#animation").val(defaultDNA.animation)

  
})




