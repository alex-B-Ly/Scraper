$(document).ready(function(){

  // AJAX call to get titles
  $.getJSON("/entrepreneurContent", function(stuff){
    console.log(stuff);
    listBuilder(stuff);
  });

  // LIST BUILDER FUNCTION
  function listBuilder(data){
    for(var i = 0; i<12; i++){
      var titleLi = $('<li>');
      var titleLink = $('<a>');

      titleLink.text(data[i].title)
        .attr('href', data[i].link)
        .addClass('title');

      titleLi.append(titleLink)
        .attr('data-id', data[i]._id)
        .addClass('list-group-item');

      $('#content-list').append(titleLi);
    }
  }

});