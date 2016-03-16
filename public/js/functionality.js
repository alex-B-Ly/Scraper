$(document).ready(function(){

  // AJAX call to get titles
  $.getJSON("/entrepreneurContent", function(stuff){
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
      var commentAreaCol = $('<div class="col-xs-12 comment-area text-center">');
      // Link vars
      var titleLink = $('<a>');
      var commentToggle = $('<a class="show-comments" href="#">Show Comments</a>');
      // Delete vars
      var deleteForm = $('<form method="POST">');
      var deleteButton = $('<button>');

      // Generate link title
      titleLink.text(data[i].title)
        .attr('href', data[i].link)
        .addClass('title');

      // Generate delete button
      deleteButton.text('X')
        .addClass('pull-right btn btn-sm btn-default delete-title')
        .attr('name', 'deleteMe')
        .attr('type', 'submit')
        .val(data[i]._id);

      // Append delete button to form
      deleteForm.attr('action', '/delete-title')
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

      var titleID = titleLi.attr('data-id');

      // Generate comment col and use parent li data-id
      commentsBuilder(commentAreaCol, titleID);
      // TODO Add custom class with display:none below
      titleLi.append(commentAreaCol);

      $('#content-list').append(titleLi);
    }
  }

  // COMMENTS AREA BUILDER
  function commentsBuilder(commentsArea, id){
    var commentList = $('<ul>');
    var commentForm = $('<form>');
    var commentText = $('<textarea placeholder="Add a comment">');
    var commentSubmit = $('<button type="submit" class="btn btn-primary comment-button">Submit Comment</button>');

    commentText.attr('name', 'insertcomment');

    commentForm.attr('action','/comment-submit/'+id)
      .attr('method', 'POST')
      .append(commentText)
      .append(commentSubmit);

    commentsArea.append(commentList)
      .append(commentForm);
  }

  // SHOW COMMENTS ONCLICK
  function showMeTheComments(){
    // When show comments clicked, show next comment area
    $(document).on('click', '.show-comments', function(e){
      e.preventDefault();
      $(this).toggleClass('comments-active');

      if($(this).hasClass('comments-active')){
        $(this).text('Hide Comments');
        $(this).parent().next().slideToggle(400);
      }else{
        $(this).text('Show Comments');
        $(this).parent().next().slideToggle(400);
      }
    });
  }

  // FUNCTIONS CALLED
  showMeTheComments();
});