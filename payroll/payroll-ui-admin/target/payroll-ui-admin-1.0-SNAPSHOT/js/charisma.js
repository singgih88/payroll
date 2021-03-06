jQuery(function($) {
    $('#fromDate').mask('9999/99/99');
    $('#toDate').mask('9999/99/99');
    $('#startTime').mask('99:99:99');
    $('#endTime').mask('99:99:99');
});
$(document).ready(function() {
    $("#form").keypress(keyCheck);

    function keyCheck(e) {
        e = e || window.event;
        var key;
        if (window.event)
            key = e.which ? window.event.witch : window.event.key;
        return (e.which != 13);
    }
    //ajax menu checkbox
    /*    $('#is-ajax').click(function(e) {
     $.cookie('is-ajax', $(this).prop('checked'), {expires: 365});
     });
     $('#is-ajax').prop('checked', $.cookie('is-ajax') === 'true' ? true : false);
     */
    //disbaling some functions for Internet Explorer
    if ($.browser.msie)
    {
        $('#is-ajax').prop('checked', true);
        $('#for-is-ajax').hide();
        $('#toggle-fullscreen').hide();
        $('.login-box').find('.input-large').removeClass('span10');

    }

    //highlight current / active link
    $('ul.main-menu li a').each(function() {
        if ($($(this))[0].href === String(window.location))
            $(this).parent().addClass('active');
    });

    //establish history variables
    var history = window.History, // Note: We are using a capital H instead of a lower h
            State = history.getState(),
            $log = $('#log');

    //bind to State Change
    history.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
        var State = history.getState(); // Note: We are using History.getState() instead of event.state
        $.ajax({
            url: State.url,
            success: function(msg) {
                $('#content').html($(msg).find('#content').html());
                $('#loading').remove();
                $('#content').fadeIn();
                docReady();
            }
        });
    });

    //ajaxify menus
    $('a.ajax-link').click(function(e) {
        if ($.browser.msie)
            e.which = 1;
        if ($(this).parent().hasClass('active'))
            return;
        e.preventDefault();
        if ($('.btn-navbar').is(':visible')) {
            $('.btn-navbar').click();
        }
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink = $(this);
        history.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');
    });

    //animating menus on hover
    /* $('ul.main-menu li:not(.nav-header)').hover(function() {
     $(this).animate({'margin-left': '+=5'}, 300);
     },
     function() {
     $(this).animate({'margin-left': '-=5'}, 300);
     });
     */
    //other things to do on document ready, seperated for ajax calls
    docReady();
});


function docReady() {
    //prevent # links from moving to top
    $('a[href="#"][data-top!=true]').click(function(e) {
        e.preventDefault();
    });

    //rich text editor
    $('.cleditor').cleditor();

    //datepicker
    $('.datepicker').datepicker();

    //notifications
    $('.noty').click(function(e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });


    //uniform - styler for checkbox, radio and file input
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

    //chosen - improves select
    $('[data-rel="chosen"],[rel="chosen"]').chosen();

    //tabs
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //makes elements soratble, elements that sort need to have id attribute to save the result
    $('.sortable').sortable({
        revert: true,
        cancel: '.btn,.box-content,.nav-header',
        update: function(event, ui) {
            //line below gives the ids of elements, you can make ajax call here to save it to the database
            //console.log($(this).sortable('toArray'));
        }
    });

    //slider
    $('.slider').slider({range: true, values: [10, 65]});

    //tooltip
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement": "bottom", delay: {show: 400, hide: 200}});

    //auto grow textarea
    $('textarea.autogrow').autogrow();

    //popover
    $('[rel="popover"],[data-rel="popover"]').popover();

    //iOS / iPhone style toggle switch
    $('.iphone-toggle').iphoneStyle();

    //star rating
    $('.raty').raty({
        score: 4 //default stars
    });


    //datatable
    $('.datatable').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });
    $('.btn-close').click(function(e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function(e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible'))
            $('i', $(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
        else
            $('i', $(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
        $target.slideToggle();
    });
//    $('.btn-setting').live("click", function(e) {
//        e.preventDefault();
//        $('#myModal').modal('show');
//    });
    $('.btn-debitAccountModel').live("click", function(e) {
        e.preventDefault();
        $('#debitAccountAddModal').modal('show');
        $('#debitAccountNo').val("");
    });

    $('.btn-creditAccountModel').live("click", function(e) {
        e.preventDefault();
        $('#creditAccountAddModal').modal('show');
        $('#creditAccountNo').val("");
    });

    $('.btn-limitDetail').live("click", function(e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });

    $('.btn-rejectLimit').live("click", function(e) {
        e.preventDefault();
        $('#rejectionReasonModal').modal('show');
    });

    $('.btn-channelDetail').live("click", function(e) {
        e.preventDefault();
        $('#verifyableChannelModal').modal('show');
    });

    $('.btn-rejectChannel').live("click", function(e) {
        e.preventDefault();
        $('#rejectionReasonModal').modal('show');
    });

    $('.btn-companyApplicationModel').live("click", function(e) {
        e.preventDefault();
        $('#companyApplicationModel').modal('show');
        $('#companyApplicationCode').val("");
        $('#channelCode').val("");
        $('#feeAccount').val("");
        $('#applicationDescription').val("");
        $('#uniform-defaultApplication > span').removeClass('checked');
        $('input[id=defaultApplication]').attr('checked', false);
        $('#uniform-applicationActive > span').removeClass('checked');
        $('input[id=applicationActive]').attr('checked', false);
        $('#uniform-balanceInquiryPerDay > span').removeClass('checked');
        $('input[id=balanceInquiryPerDay]').attr('checked', false);
        $('#uniform-miniStatement > span').removeClass('checked');
        $('input[id=miniStatement]').attr('checked', false);
        $('#uniform-fundTransfer > span').removeClass('checked');
        $('input[id=fundTransfer]').attr('checked', false);
        $('#uniform-requestTerminal > span').removeClass('checked');
        $('input[id=requestTerminal]').attr('checked', false);
        $('#uniform-reversal> span').removeClass('checked');
        $('input[id=reversal]').attr('checked', false);
        $('#uniform-automatic> span').removeClass('checked');
        $('input[id=automatic]').attr('checked', false);
        $('#automaticReversal').hide();
    });

    $('.btn-companyDetail').live("click", function(e) {
        e.preventDefault();
        $('#verifyableCompanyModal').modal('show');
    });

    $('.btn-rejectCompany').live("click", function(e) {
        e.preventDefault();
        $('#rejectionReasonModal').modal('show');
    });
    $('.btn-gatewayDetail').live("click", function(e) {
        e.preventDefault();
        $('#verifyableGatewayModal').modal('show');
    });
    //initialize the external events for calender

    $('#external-events div.external-event').each(function() {

        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    //initialize the calendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }

        }
    });

}


//additional functions for data table
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings)
{
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
}
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function(oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function(e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                    '<ul>' +
                    '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                    '</ul>'
                    );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', {action: "previous"}, fnClickHandler);
            $(els[1]).bind('click.DT', {action: "next"}, fnClickHandler);
        },
        "fnUpdate": function(oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                            .insertBefore($('li:last', an[i])[0])
                            .bind('click', function(e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                }

                // add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});
