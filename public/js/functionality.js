$(document).ready(function() {
  $.getJSON("/entrepreneurContent", function(data){
    for(var i = 0; i<data.length; i++){
      var titleLi = $('<li>');
      var titleLink = $('<a>');
      titleLink.text(data[i].title);
      titleLink.attr('href', data[i].link);
      titleLi.append(titleLink);
      console.log(titleLi);
      $('#test').append(titleLi);
      console.log(data[i]);
    }
  });

});