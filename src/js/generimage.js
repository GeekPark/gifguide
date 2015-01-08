$(function() {
  if(!$('body').hasClass('imagepage')) {
    return false;
  }

  $('.schedule .block').eq(0).remove();
  $('.schedule .block').removeClass('hidden');

  var $scheduleTitle = $('#schedule-title-template').clone();
  $scheduleTitle.find('span').text('分论坛');
  $('.schedule .block').eq(3).after($scheduleTitle);

});
