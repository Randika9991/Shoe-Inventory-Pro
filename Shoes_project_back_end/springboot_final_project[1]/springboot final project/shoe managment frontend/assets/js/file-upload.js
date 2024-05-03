(function($) {
  'use strict';
  $(function() {
    $('.file-upload-browse').on('click', function() {
      var file = $(this).parent().parent().parent().find('.file-upload-default');
      file.trigger('click');
    });
    $('.file-upload-default').on('change', function() {
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });
  });
})(jQuery);


// $(document).ready(function(){
//   $('.file-upload-browse').on('click', function(){
//     // Trigger click event on the file input element when the "Upload" button is clicked
//     $(this).closest('.form-group').find('.file-upload-default').click();
//   });
//
//   // Listen for change event on the file input element
//   $('.file-upload-default').on('change', function(){
//     // Get the name of the selected file
//     var fileName = $(this)[0].files[0].name;
//
//     console.log(fileName)
//
//     // Set the value of the text input to the file name
//     $(this).closest('.form-group').find('.file-upload-info').val(fileName);
//   });
// });