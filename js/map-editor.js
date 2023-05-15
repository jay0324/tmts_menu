var map = (function() {
    var scaleFrom = 1,
        scaleTo = 1,
        scaleMin = 1,
        scaleMax = 3,
        scalable = ['width', 'height', 'top', 'left'],
        snapX = 4,
        snapY = 4,

        container = $('#map-container'),
        mapImage = $('#map-image'),
        mapMask = $('#map-mask'),
        panelList = $('#booth-list'),
        panelProperties = $('#booth-properties'),
        buttonZoomOut = $("#map-zoomout"),
        buttonZoomIn = $("#map-zoomin"),
        formMap = $('#map-form'),

        boothWidth = 60,
        boothHeight = 60,

        boothSelector = '.draggable-booth';
        highlightClass = 'booth-highlight';

    var init = function() {
        // responsive container height
        $(window).on('resize load', function() {
            container.css('height', $(window).height() - $('#map-toolbar').height() - 200);
            mapMask.css({'width': mapImage.outerWidth() * scaleTo, 'height': mapImage.outerHeight() * scaleTo});
        });

        // zoomIn and zoomOut
        buttonZoomOut.on('click', zoomOut);
        buttonZoomIn.on('click', zoomIn);

        // new booth
        formMap.on('submit', function(e) {
            e.preventDefault();

            var boothNumber = $(this).find('input[name=booth-number]');
            var boothId = boothNumber.val().toUpperCase();

            if ($("#draggable-" + boothId).length > 0) {
                alert("攤位已存在");
                return false;
            }


            addBooth({
                id: boothId,
                top: container.scrollTop() + parseInt(container.innerHeight() / 2) - parseInt(boothHeight / 2),
                left: container.scrollLeft() + parseInt(container.innerWidth() / 2) - parseInt(boothWidth / 2)
            });

            drawPanelList();

            //reset booth number
            boothNumber.val('');
        });

        // update booth
        panelProperties.on('submit', function (e) {
            e.preventDefault();
            var form = $(this);

            var properties = {
                original: form.find('input[name=booth-number-original]').val(),
                id: form.find('input[name=booth-number]').val().toUpperCase(),
                width:  parseInt(form.find('input[name=booth-width]').val()),
                height:  parseInt(form.find('input[name=booth-height]').val()),
                top: parseInt(form.find('input[name=booth-top]').val()),
                left:  parseInt(form.find('input[name=booth-left]').val()),
            };

            updateBooth(properties);
        });

        $('#map-store-form').on('submit', function(e) {
            e.preventDefault();

            var data = [];

            $('.draggable-booth').each(function() {
                var booth = $(this);
                var properties = getBoothProperties(booth);
                var ratio = 1 / scaleTo;
                data.push({
                    id: properties.id,
                    width: Math.round(properties.width * ratio),
                    height: Math.round(properties.height * ratio),
                    top: Math.round(properties.top * ratio),
                    left: Math.round(properties.left * ratio),
                });
            });

            var actions = $(this).attr('action');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $(this).find('input[name=_token]').val()
                }
            });
            swal({
                title: "儲存攤位",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "確定",
                closeOnConfirm: false,
                cancelButtonText: "取消"
            },
            function(){
                $.ajax({
                    method: 'post',
                    url: actions,
                    data: {
                        booths: data
                    },
                    success: function (data) {
                        console.log(data);
                        //$.pjax.reload('#pjax-container');

                        //if (typeof data === 'object') {
                            //if (data.status) {
                                swal('攤位已儲存', '', 'success');
                            //} else {
                            //    swal(data.message, '', 'error');
                            //}
                        //}
                    }
                });
            });
        });
    };

    var zoomOut = function() {
        scaleFrom = scaleTo;

        scaleTo--;

        if (scaleTo < scaleMin) {
            scaleTo = scaleMin;
        }

        redrawBooths();
    };

    var zoomIn = function() {
        scaleFrom = scaleTo;

        scaleTo++;

        if (scaleTo > scaleMax) {
            scaleTo = scaleMax;
        }

        redrawBooths();
    };

    var redrawBooths = function() {
        mapImage.css('transform', 'scale(' + scaleTo + ')');
        mapMask.css({'width': mapImage.outerWidth() * scaleTo, 'height': mapImage.outerHeight() * scaleTo});

        container.scrollTop(0);
        container.scrollLeft(0);

        var ratio = scaleTo / scaleFrom;

        $(boothSelector).each(function () {
            var booth = $(this);
            var properties = getBoothProperties(booth);

            // update with scaled properties
            booth.outerWidth(Math.round(properties.width * ratio));
            booth.outerHeight(Math.round(properties.height * ratio));
            booth.css({top: Math.round(properties.top * ratio), left: Math.round(properties.left * ratio)});
        });

        drawPanelList();
    };



    var drawPanelList = function() {
        var html = '';
        var booths = $(boothSelector).sort(function (x, y) {
            return $(x).attr('id') > $(y).attr('id') ? 1 : -1;
        });

        booths.each(function() {
            var booth = $(this);
            html += '<a class="list-group-item" href="#" data-id="' + booth.attr('data-id') + '">' + booth.attr('data-id') + '</a>';
        });
        panelList.html(html);

        watchBooths();
    };

    var watchBooths = function() {
        $(boothSelector).draggable({
            start: function() {
                $(this).addClass(highlightClass);
            },
            stop: showBoothProperties,
            grid:[snapX, snapY]
        }).resizable({
            start: function() {
                $(this).addClass(highlightClass);
            },
            stop: showBoothProperties,
            grid: snapX
        }).on('click', showBoothProperties);

        panelList.find('a').on('click', showBoothProperties);

        $('.booth-icon-delete, .booth-delete').on('click', function (e) {
            e.preventDefault();
            $('#draggable-' + $(this).attr('data-id')).remove();
            drawPanelList();
        });
    };

    var drawBooths = function(booths) {
        if (!booths) {
            container.find('.overlay').hide();
            return false;
        }

        booths.forEach(function (booth) {
            addBooth(booth);
        });

        drawPanelList();

        container.find('.overlay').hide(); // hide loading
    };

    var addBooth = function(booth) {
        /*
        if (isRedraw === true) {
            scalable.forEach(function(item) {
                if (booth[item]) {
                    booth[item] *= scaleTo;
                }
            });
        }
        */

        // snap to grid
        booth.top -= parseInt(booth.top) % snapY;
        booth.left -= parseInt(booth.left) % snapX;
        booth.width = parseInt(booth.width);
        booth.height = parseInt(booth.height);

        container.append('<div id="draggable-' + booth.id + '" data-id="' + booth.id + '" class="draggable-booth" style="top:' + booth.top + 'px;left:' + booth.left + 'px;width: ' + booth.width + 'px;height: ' + booth.height + 'px"><a href="#" class="booth-icon-delete" data-id="' + booth.id + '"><span class="glyphicon glyphicon-remove"></span></a><span class="booth-id">' + booth.id + '</span></div>');
    };

    var updateBooth = function(properties) {
        var booth = $('#draggable-' + properties.id);
        // if booth id has been changed, replace it with new id
        if (properties.original != properties.id) {
            booth = $('#draggable-' + properties.original);
            booth.attr('id', 'draggable-' + properties.id);
            booth.attr('data-id', properties.id);
            booth.find('.booth-icon-delete').attr('data-id', properties.id);
            booth.find('.booth-id').text(properties.id);
            form.find('input[name=booth-number-original]').val(properties.id);
        }

        booth.outerWidth(properties.width);
        booth.outerHeight(properties.height);
        booth.css({top: properties.top, left: properties.left});

        drawPanelList();
    };

    var getBoothProperties = function(booth) {
        var position = booth.position();

        return {
            id: booth.attr('data-id'),
            width: booth.outerWidth(),
            height: booth.outerHeight(),
            top: parseInt(container.scrollTop() + position.top),
            left: parseInt(container.scrollLeft() + position.left)
        };
    };

    var showBoothProperties = function () {
        var booth = $('#draggable-' + $(this).attr('data-id'));
        var properties = getBoothProperties(booth);
        booth.removeClass('booth-highlight');

        panelProperties.find('button[name=booth-delete]').attr('data-id', properties.id);
        panelProperties.find('input[name=booth-number-original]').val(properties.id);
        panelProperties.find('input[name=booth-number]').val(properties.id);
        panelProperties.find('input[name=booth-width]').val(properties.width);
        panelProperties.find('input[name=booth-height]').val(properties.height);
        panelProperties.find('input[name=booth-top]').val(properties.top);
        panelProperties.find('input[name=booth-left]').val(properties.left);
    };

    return {
        init: init,
        drawBooths: drawBooths
    };
})();