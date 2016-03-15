$(document).ready(function(){

  // AJAX call to get titles
  $.getJSON("/entrepreneurContent", function(stuff){
    console.log(stuff);
    listBuilder(stuff);
  });

  // LIST BUILDER FUNCTION
  function listBuilder(data){
    for(var i = 0; i<12; i++){
      // list item to be appended to ul
      var titleLi = $('<li>');
      // column vars
      var titleCol = $('<div class="col-xs-12">');
      var commentsCol = $('<div class="col-xs-12">');
      var titleLink = $('<a>');
      var commentToggle = $('<a class="comments comments-inactive" href="#">Show Comments</a>');
      // Delete vars
      var deleteForm = $('<form method="POST">');
      var deleteButton = $('<button>');

      // Generate link title
      titleLink.text(data[i].title)
        .attr('href', data[i].link)
        .addClass('title');

      // Generate delete button
      deleteButton.text('X')
        .addClass('pull-right btn btn-sm btn-default delete-title');

      // Append delete button to form
      deleteForm.attr('action', 'delete-title/'+data[i]._id)
      .append(deleteButton);

      // Append link and delete to titleCol
      titleCol.append(titleLink)
        .append(deleteForm);

      // Comment Toggle
      commentsCol.append(commentToggle);

      // Generate list item with data attribute
      titleLi.append(titleCol)
        .append(commentsCol)
        .attr('data-id', data[i]._id)
        .addClass('list-group-item title-item col-xs-12');

      $('#content-list').append(titleLi);
    }
  }

  // COMMENTS BUILDER

});