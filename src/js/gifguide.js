$(function() {
  if(!$('body').hasClass('gifguide')) {
    return false;
  }

  // 修改倒计时日期
  changeDay();

  // 设置全局高度
  var windowH = window.innerHeight;

  $('body').height(windowH);

  // 设置全局页面滚动器
  var pageSwiper = $('.swiper-container').swiper({
    mode:'horizontal',
    loop: true,
    progress:true,
    loop: false,
    // 设置转场动画
    onProgressChange: function(swiper){
      for (var i = 0; i < swiper.slides.length; i++){
        var slide = swiper.slides[i];
        var progress = slide.progress;
        var rotate = -90*progress;
        if (rotate<-90) rotate=-90;
        if (rotate>90) rotate=90;
        var translate = progress*swiper.width/2;
        var opacity = 1 - Math.min(Math.abs(progress),1);
        slide.style.opacity = opacity;
        swiper.setTransform(slide,'rotateY('+rotate+'deg) translate3d('+translate+'px,0,0)');
      }
    },
    onTouchStart:function(swiper){
      for (var i = 0; i < swiper.slides.length; i++){
        swiper.setTransition(swiper.slides[i], 0);
      }
    },
    onSetWrapperTransition: function(swiper, speed) {
      for (var i = 0; i < swiper.slides.length; i++){
        swiper.setTransition(swiper.slides[i], speed);
      }
    },
    onSlideChangeEnd: function(swiper) {
      // 转场后判断是第几页然后根据需要是否显示返回按钮
      if(swiper.activeIndex == '0') {
        hideBackBtn();
      } else {
        showBackBtn();
      }
    }
  });

  // 使自适应高度
  $('.swiper-container, .swiper-slide').height(windowH);

  // 负责处理各种导航按钮
  pageNav(pageSwiper);

  // 测试用自动跳转到
  // pageSwiper.swipeTo( 1, 400, false);

  // 载入日程页面
  initSchedule();

});

function changeDay () {
  // 此处不牵扯真正的日期计算，仅仅是当月日期做减法
  var nowDay = new Date().getDate(),
      targetDay = new Date("2015-01-17").getDate(),
      count = targetDay - nowDay,
      status; // 分别对应倒计时阶段、正在进行、过期
  if(count > 0) {
    status = 'countdown';
  } else if(count > -2) {
    status = 'underway';
  } else {
    status = 'timeout';
  }

  if(status == 'countdown') {
    if(count < 10) {
      $('#countdown-day').text('0' + count);
    } else {
      $('#countdown-day').text(count);
    }
  } else {
    $('#countdown-day').text('00');
  }

  if(status == 'underway') {
    $('#countdown-title').text('大会进行中');
  }

  if(status == 'timeout') {
    $('#countdown-title').text('大会已结束');
  }
}

function pageNav (pageSwiper) {
  $('#nav a').on('click', function(event) {
    var target = $(this).data('target')
    if(typeof target == 'number') {
      event.preventDefault();
      pageSwiper.swipeTo( target, 400, false );
      showBackBtn();
    }
  });

  $('#backhome').on('click', function(event) {
    event.preventDefault();
    pageSwiper.swipeTo( 0, 400, false);
    hideBackBtn();
  });
}

function showBackBtn () {
  $('#backhome').removeClass('hidden');
}

function hideBackBtn () {
  var $btn = $('#backhome');
  if(!$btn.hasClass('hidden')) {
    $('#backhome').addClass('hidden');
  }
}


// 用于加载日程的JSON
function initSchedule () {
  var $template = $('#schedule-template');


  // 监听切换按钮
  $('#main-schedule,#minor-schedule').on('click', function() {
    $('.switch .on').removeClass('on');
    $(this).addClass('on');
    var type = $(this).data('type');
    updateAgendaUI (type);

  });
  var jsonData = window.speachJSON;

  // 生成主会场信息
  outputVenue(jsonData[0], 'main');

  // 生成分会场信息
  outputVenue(jsonData[1], 'minor');

  // 初始化默认载入第一个分类
  updateAgendaUI('main');

  function outputVenue (data, type) {
    for (var i = 0; i < data.length; i++) {
      var agenda = data[i],
          $agendaDOM = $template.clone();

      // 对Template进行动态改造
      $agendaDOM.find('.agenda-title').text(agenda.name);
      $agendaDOM.find('.js-agenda-date').text(getAgendaTime(i));

      var $speechTemplate = $agendaDOM.find('#speech-template');


      for (var j = 0; j < agenda.schedule.length; j++) {
        var speech = agenda.schedule[j],
            $speechDOM = $speechTemplate.clone();


        // 对每个Speech的内容动态修改
        $speechDOM.find('.speech-title').html(speech.name || '');
        $speechDOM.find('.company').html(speech.company || '');
        $speechDOM.find('.guest-title').html(speech.title || '');
        $speechDOM.find('.author').html(speech.author || '');


        // 插入每个Speech的模板
        $agendaDOM.append($speechDOM);
      };

      // 清空模板中的样例演讲
      $speechTemplate.remove();

      // 插入Template
      $agendaDOM.addClass(type);
      $agendaDOM.removeAttr('id');
      $('#page-content').append($agendaDOM);
    };
  }
  // 执行替换
}

// 执行主/分会场的UI自更新
function updateAgendaUI (type) {
  $('.schedule .block').each(function() {
    if($(this).hasClass(type)) {
      $(this).removeClass('hidden');
    } else {
      if(!$(this).hasClass('hidden')) {
        $(this).addClass('hidden');
      }
    }
  });

}

function getAgendaTime (i) {
  switch(i) {
    case 0:
      return '第一天上午';
      break;
    case 1:
      return '第一天下午';
      break;
    case 2:
      return '第二天上午';
      break;
    case 3:
      return '第二天下午';
      break;
  }
}
