var units = "freedom"
var heights =
{
  'caterpillar' : [[3,0],[4,0]],
  'crippler' : [[5,9],[7,0]],
  'ferriswheel' : [[1,0],[4,0]],
  'pirateship' : [[4,0],[5,0]],
  'rollercoaster' : [[5,0],[7,0]],
  'typhoon' : [[4,0],[6,0]]
}

$(document).ready(function(){
  $('#freedom').click(function(){
    $('#large-unit').attr("placeholder", "Feet")
    $('#small-unit').attr("placeholder", "Inches")
    units = "freedom"
  })
  $('#metric').click(function(){
    console.log('metric clicked')
    $('#large-unit').attr("placeholder", "Meters")
    $('#small-unit').attr("placeholder", "Centimeters")
    units = "metric"
  })

  $('#submit-button').click(function(){
    clearHighlighted()
    var largeUnit = $('#large-unit').val()
    var smallUnit = $('#small-unit').val()
    var userFeet = parseFloat(metricToFreedom(largeUnit,smallUnit)[0])
    var userInches = metricToFreedom(largeUnit,smallUnit)[1]
    for (var ride in heights) {
      var footMinimum = heights[ride][0][0]
      var inchMinimum = heights[ride][0][1]
      var footMaximum = heights[ride][1][0]
      if (userFeet < footMaximum) {
        if (userFeet === footMinimum) {
          console.log("user feet are equal...")
          if (userInches >= inchMinimum) {
            console.log("user inches are higher")
            console.log("fading in " + ride)
            $('#'+ride).fadeTo(300,1)
          }
        } else if (userFeet > footMinimum) {
          console.log("user feet higher")
          console.log("fading in " + ride)
          $('#'+ride).fadeTo(300,1)
        }
      }
    }
  })
})
function clearHighlighted() {
  for (var ride in heights) {
    $('#'+ride).css("opacity",0.25)
  }
}
function metricToFreedom(largeUnit,smallUnit) {
  var result = []
  var feet = largeUnit
  var inches = smallUnit
  if (units === "metric") {
    feet = (largeUnit * 3.2808).toPrecision(3)
    inches = (smallUnit / 2.54).toPrecision(3)
  }
  result.push(feet)
  result.push(inches)
  console.log(result)
  return result
}
