'use strict';

var examples = {
    'love': {
        list: (function generateLoveList() {
            var list = ['12 自律', '9 克制', '7 坚持', '6 乐观', '5 忍耐'];
            var nums = [5, 4, 3, 2, 2];
            var words = ("专注,付出,信义,光彩,单纯,奇迹,奋发,守信,惬意,愉快,感恩,振奋,热忱,理想,理解,童真,自信,光明,努力,友善,和谐,奋斗,安康,安详,尊重,慷慨,欢快,欣喜,清新,爱护,畅快,祝福,顺利,魅力,鼓舞,信任,创新,合作,善良,团结,希望,幸运,忠诚,悠闲,敬业,梦想,欣慰,淳朴,爱,繁荣,荣耀,谦卑,丰收,互敬,亲切,健康,公正,助人,厚道,和善,奉献,安宁,宽容,幸福,康健,得意,快乐,愉悦,感动,成功,成就,成长,温暖,激昂,热爱,生机,福气,积极,耐心,自由,舒适,丰盛,仁爱,优雅,健全,充实,兴奋,勤奋,包容,和睦,坚毅,安全,开怀,开朗,感激,执着,机智,欢乐,独立,真情,祥和,精进,耐性,诚心,信赖,光辉,创造,勇气,友情,坚决,坚强,坚持,奋进,平和,恬静,敬重,智慧,欣赏,满足,热情,爱心,祥瑞,稳定,纯洁,聪明,胜利,诚实,诚恳,进步,互助,公平,关怀,关爱,分享,勇敢,卓越,友谊,向上,和平,喜悦,宽厚,尊严,崇高,微笑,支持,温厚,温情,激励,珍贵,畅想,美好,诚挚,轻松,鼓励,乐观,优良,信心,光荣,友好,回忆,坚韧,宁静,守望,宽心,敬爱,明朗,温柔,温馨,珍惜,真挚,真诚,睿智,谦和,谦逊,赞美,坚强,勇敢,自信,坚韧,勤奋,梦想,持续,感恩,拼搏,进步,奋斗,挑战,耐心,乐观,积极向上,持之以恒,激情,热爱生活,自强不息,追求卓越,勇往直前,热情洋溢,活力四射,励志,阳光,温暖,真诚,善良,宽容,乐于助人,爱心,美好,幸福,快乐,愉快,安心,平静,宁静,自由,自在,惬意,舒适,美满,成功,成就,优秀,杰出,出色,完美,精彩,精湛,极致,尽善尽美,独具匠心,独树一帜,独领风骚,无与伦比,非同凡响,超群绝伦,卓尔不群,鹤立鸡群,独占鳌头,龙飞凤舞,鹰击长空,鱼跃龙门,虎啸山林,马到成功,一帆风顺,风起云涌,云淡风轻,风和日丽,阳光明媚,雨过天晴,金榜题名,一举成名,扬眉吐气,气壮山河,气贯长虹,气宇轩昂,威震四海,雄视天下,一统天下,横扫千军,纵横天下,破釜沉舟,一鼓作气,旗开得胜,势如破竹,高歌猛进,勇攀高峰,一往无前,勇冠三军,无坚不摧,无往不胜,所向披靡,战无不胜,攻无不克,百战百胜,举世无敌,一代宗师").split(',');

            nums.forEach(function (n) {
                words.forEach(function (w) {
                    list.push(n + ' ' + w);
                });
            });

            return list.join('\n');
        })(),
        option: '{\n' +
            '  gridSize: Math.round(16 * $(\'#canvas\').width() / 1024),\n' +
            '  weightFactor: function (size) {\n' +
            '    return Math.pow(size, 2.3) * $(\'#canvas\').width() / 1024;\n' +
            '  },\n' +
            '  fontFamily: \'田英章行书\',\n' +
            '  color: function (word, weight) {\n' +
            '    return (weight === 12) ? \'#f02222\' : \'#c09292\';\n' +
            '  },\n' +
            '  rotateRatio: 0,\n' +
            '  rotationSteps: 0,\n' +
            '  backgroundColor: \'rgba(0, 0, 0, 0)\'\n' +
            '}'
    }
};

var maskCanvas;

jQuery(function ($) {
    var $form = $('#form');
    var $canvas = $('#canvas');
    var $htmlCanvas = $('#html-canvas');
    var $canvasContainer = $('#canvas-container');
    var $loading = $('#loading');

    var $list = $('#input-list');
    var $options = $('#config-option');
    var $width = $('#config-width');
    var $height = $('#config-height');
    var $mask = $('#config-mask');
    var $dppx = $('#config-dppx');
    var $css = $('#config-css');
    var $webfontLink = $('#link-webfont');

    if (!WordCloud.isSupported) {
        $('#not-supported').prop('hidden', false);
        $form.find('textarea, input, select, button').prop('disabled', true);
        return;
    }

    var $box = $('<div id="box" hidden />');
    $canvasContainer.append($box);
    window.drawBox = function drawBox(item, dimension) {
        if (!dimension) {
            $box.prop('hidden', true);

            return;
        }

        var dppx = $dppx.val();

        $box.prop('hidden', false);
        $box.css({
            left: dimension.x / dppx + 'px',
            top: dimension.y / dppx + 'px',
            width: dimension.w / dppx + 'px',
            height: dimension.h / dppx + 'px'
        });
    };

    // Update the default value if we are running in a hdppx device
    if (('devicePixelRatio' in window) &&
        window.devicePixelRatio !== 1) {
        $dppx.val(window.devicePixelRatio);
    }

    $canvas.on('wordcloudstop', function wordcloudstopped(evt) {
        $loading.prop('hidden', true);
    });

    $form.on('submit', function formSubmit(evt) {
        evt.preventDefault();

        changeHash('');
    });

    $('#config-mask-clear').on('click', function () {
        maskCanvas = null;
        // Hack!
        $mask.wrap('<form>').closest('form').get(0).reset();
        $mask.unwrap();
    });

    // Load the local image file, read it's pixels and transform it into a
    // black-and-white mask image on the canvas.
    $mask.on('change', function () {
        maskCanvas = null;

        var file = $mask[0].files[0];

        if (!file) {
            return;
        }

        var url = window.URL.createObjectURL(file);
        var img = new Image();
        img.src = url;

        img.onload = function readPixels() {
            window.URL.revokeObjectURL(url);

            maskCanvas = document.createElement('canvas');
            maskCanvas.width = img.width;
            maskCanvas.height = img.height;

            var ctx = maskCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var imageData = ctx.getImageData(
                0, 0, maskCanvas.width, maskCanvas.height);
            var newImageData = ctx.createImageData(imageData);

            for (var i = 0; i < imageData.data.length; i += 4) {
                var tone = imageData.data[i] +
                    imageData.data[i + 1] +
                    imageData.data[i + 2];
                var alpha = imageData.data[i + 3];

                if (alpha < 128 || tone > 128 * 3) {
                    // Area not to draw
                    newImageData.data[i] =
                        newImageData.data[i + 1] =
                            newImageData.data[i + 2] = 255;
                    newImageData.data[i + 3] = 0;
                } else {
                    // Area to draw
                    newImageData.data[i] =
                        newImageData.data[i + 1] =
                            newImageData.data[i + 2] = 0;
                    newImageData.data[i + 3] = 255;
                }
            }

            ctx.putImageData(newImageData, 0, 0);
        };
    });

    // if ($mask[0].files.length) {
    //     $mask.trigger('change');
    // }

    $('#btn-save').on('click', function save(evt) {
        var url = $canvas[0].toDataURL();
        if ('download' in document.createElement('a')) {
            this.href = url;
        } else {
            evt.preventDefault();
            alert('Please right click and choose "Save As..." to save the generated image.');
            window.open(url, '_blank', 'width=500,height=300,menubar=yes');
        }
    });

    $('#btn-canvas').on('click', function showCanvas(evt) {
        $canvas.removeClass('hide');
        $htmlCanvas.addClass('hide');
        $('#btn-canvas').prop('disabled', true);
        $('#btn-html-canvas').prop('disabled', false);
    });

    $('#btn-html-canvas').on('click', function showCanvas(evt) {
        $canvas.addClass('hide');
        $htmlCanvas.removeClass('hide');
        $('#btn-canvas').prop('disabled', false);
        $('#btn-html-canvas').prop('disabled', true);
    });

    $('#btn-canvas').prop('disabled', true);
    $('#btn-html-canvas').prop('disabled', false);

    var $examples = $('#examples');
    $examples.on('change', function loadExample(evt) {
        changeHash(this.value);

        this.selectedIndex = 0;
        $examples.blur();
    });

    var run = function run() {
        $loading.prop('hidden', false);

        // Load web font
        $webfontLink.prop('href', $css.val());

        // devicePixelRatio
        var devicePixelRatio = parseFloat($dppx.val());

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // Set the width and height
        var width = $width.val() ? $width.val() : viewportWidth;
        var height = $height.val() ? $height.val() : viewportHeight;
        var pixelWidth = width;
        var pixelHeight = height;

        if (devicePixelRatio !== 1) {
            $canvas.css({'width': width + 'px', 'height': height + 'px'});

            pixelWidth *= devicePixelRatio;
            pixelHeight *= devicePixelRatio;
        } else {
            $canvas.css({'width': '', 'height': ''});
        }

        $canvas.attr('width', pixelWidth);
        $canvas.attr('height', pixelHeight);

        $htmlCanvas.css({'width': pixelWidth + 'px', 'height': pixelHeight + 'px'});

        // Set the options object
        var options = {};
        if ($options.val()) {
            options = (function evalOptions() {
                try {
                    return eval('(' + $options.val() + ')');
                } catch (error) {
                    alert('The following Javascript error occurred in the option definition; all option will be ignored: \n\n' +
                        error.toString());
                    return {};
                }
            })();
        }

        // Set devicePixelRatio options
        if (devicePixelRatio !== 1) {
            if (!('gridSize' in options)) {
                options.gridSize = 8;
            }
            options.gridSize *= devicePixelRatio;

            if (options.origin) {
                if (typeof options.origin[0] == 'number')
                    options.origin[0] *= devicePixelRatio;
                if (typeof options.origin[1] == 'number')
                    options.origin[1] *= devicePixelRatio;
            }

            if (!('weightFactor' in options)) {
                options.weightFactor = 1;
            }
            if (typeof options.weightFactor == 'function') {
                var origWeightFactor = options.weightFactor;
                options.weightFactor =
                    function weightFactorDevicePixelRatioWrap() {
                        return origWeightFactor.apply(this, arguments) * devicePixelRatio;
                    };
            } else {
                options.weightFactor *= devicePixelRatio;
            }
        }

        // Put the word list into options
        if ($list.val()) {
            var list = [];
            $.each($list.val().split('\n'), function each(i, line) {
                if (!$.trim(line))
                    return;

                var lineArr = line.split(' ');
                var count = parseFloat(lineArr.shift()) || 0;
                list.push([lineArr.join(' '), count]);
            });
            options.list = list;
        }

        if (maskCanvas) {
            options.clearCanvas = false;

            /* Determine bgPixel by creating
               another canvas and fill the specified background color. */
            var bctx = document.createElement('canvas').getContext('2d');

            bctx.fillStyle = options.backgroundColor || '#fff';
            bctx.fillRect(0, 0, 1, 1);
            var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

            var maskCanvasScaled =
                document.createElement('canvas');
            maskCanvasScaled.width = $canvas[0].width;
            maskCanvasScaled.height = $canvas[0].height;
            var ctx = maskCanvasScaled.getContext('2d');

            ctx.drawImage(maskCanvas,
                0, 0, maskCanvas.width, maskCanvas.height,
                0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var newImageData = ctx.createImageData(imageData);
            for (var i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] > 128) {
                    newImageData.data[i] = bgPixel[0];
                    newImageData.data[i + 1] = bgPixel[1];
                    newImageData.data[i + 2] = bgPixel[2];
                    newImageData.data[i + 3] = bgPixel[3];
                } else {
                    // This color must not be the same w/ the bgPixel.
                    newImageData.data[i] = bgPixel[0];
                    newImageData.data[i + 1] = bgPixel[1];
                    newImageData.data[i + 2] = bgPixel[2];
                    newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 0;
                }
            }

            ctx.putImageData(newImageData, 0, 0);

            ctx = $canvas[0].getContext('2d');
            ctx.drawImage(maskCanvasScaled, 0, 0);

            maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
        }

        // Always manually clean up the html output
        if (!options.clearCanvas) {
            $htmlCanvas.empty();
            $htmlCanvas.css('background-color', options.backgroundColor || '#fff');
        }

        // All set, call the WordCloud()
        // Order matters here because the HTML canvas might by
        // set to display: none.
        WordCloud([$canvas[0], $htmlCanvas[0]], options);
    };

    var loadExampleData = function loadExampleData(name) {
        var example = examples[name];

        $options.val(example.option || '');
        $list.val(example.list || '');
        $css.val(example.fontCSS || '');
        $width.val(example.width || '');
        $height.val(example.height || '');
    };

    var changeHash = function changeHash(name) {
        if (window.location.hash === '#' + name ||
            (!window.location.hash && !name)) {
            // We got a same hash, call hashChanged() directly
            hashChanged();
        } else {
            // Actually change the hash to invoke hashChanged()
            window.location.hash = '#' + name;
        }
    };

    var hashChanged = function hashChanged() {
        var name = window.location.hash.substr(1);
        if (!name) {
            // If there is no name, run as-is.
            run();
        } else if (name in examples) {
            // If the name matches one of the example, load it and run it
            loadExampleData(name);
            run();
        } else {
            // If the name doesn't match, reset it.
            window.location.replace('#');
        }
    }

    $(window).on('hashchange', hashChanged);

    if (!window.location.hash ||
        !(window.location.hash.substr(1) in examples)) {
        // If the initial hash doesn't match to any of the examples,
        // or it doesn't exist, reset it to #love
        window.location.replace('#love');
    } else {
        hashChanged();
    }
});
