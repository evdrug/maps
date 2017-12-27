import "./style.css"
ymaps.ready(init);
var myMap;

function init(){
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.33],
        zoom: 10
    });
    myMap.cursors.push('arrow');

    var json = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "id": 0,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.93, 30.33]
                },
                "properties": {
                    "balloonContentHeader": "Магазин",
                    "balloonContent": "Магазин на углу",
                    "data": {
                        "organization": "shop",
                        "open": "9am - 9pm"
                    }
                },
                "options": {
                    "preset": "islands#redStretchyIcon"
                }
            },
            {
                "type": "Feature",
                "id": 1,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.934, 30.334]
                },
                "properties": {
                    "balloonContentHeader": "Аптека",
                    "balloonContent": "Аптека",
                    "data": {
                        "organization": "pharmacy",
                        "open": "8am - 10pm"
                    }
                }
            }
        ]
    }

    var objectManager = new ymaps.ObjectManager({
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });
    // objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('clusterIconLayout', 'default#pieChart');
    objectManager.add(json);
    myMap.geoObjects.add(objectManager);
    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="popover top">' +
        '<a class="close" href="#">&times;</a>' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
        '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
        '</div>' +
        '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);

                this._element = $('.popover', this.getParentElement());

                this.applyElementOffset();

                this._element.find('.close')
                    .on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                this._element.find('.close')
                    .off('click');

                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._element)) {
                    return;
                }

                this.applyElementOffset();

                this.events.fire('boundschange');
            },

            /**
             * Сдвигаем балун чтобы "хвостик" указывал на точку привязки.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function () {
                this._element.css({
                    left: -(this._element[0].offsetWidth / 2),
                    top: -(this._element[0].offsetHeight + this._element.find('.arrow')[0].offsetHeight)
                });
            },

            /**
             * Закрывает баллун при клике на крестик, кидая событие "userclose" на макете.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function (e) {
                e.preventDefault();

                this.events.fire('userclose');
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getClientBounds: function () {
                if(!this._isElement(this._element)) {
                    return MyBalloonLayout.superclass.getClientBounds.call(this);
                }

                var position = this._element.position();

                return [
                    [position.left, position.top], [
                        position.left + this._element[0].offsetWidth,
                        position.top + this._element[0].offsetHeight + this._element.find('.arrow')[0].offsetHeight
                    ]
                ];
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
            }
        })

        // Создание вложенного макета содержимого балуна.
        var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
            '<div class="popover-content">$[properties.balloonContent]</div>'
        )
    // myMap.events.add('click', function (e) {
    //         var coords = e.get('coords');
    //     myMap.balloon.open(coords, {
    //         myBodyContent: '<b>ddddd</b>',
    //         myFooterContent: 'footer content'
    //     }, {
    //         balloonContentBodyLayout: myBalloonContentBodyLayout,
    //         preset: 'twirl#nightStretchyIcon'
    //     });
    //     });

    // var myPlacemarkWithContent = new ymaps.Placemark([59.93, 30.33], {
    //     hintContent: 'Собственный значок метки с контентом',
    //     clusterCaption: '1',
    //     balloonContent: 'А эта — новогодняя',
    //     iconContent: '12'
    // });

    var placemark = new ymaps.Placemark([59.83, 30.33], {

    }, {
        balloonShadow: false,
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout
        // Не скрываем иконку при открытом балуне.
        // hideIconOnBalloonOpen: false,
        // И дополнительно смещаем балун, для открытия над иконкой.
        // balloonOffset: [3, -40]
    });

    myMap.geoObjects.add(placemark);

    // var myPlacemarkWithContent2 = new ymaps.Placemark([59.934, 30.334], {
    //     hintContent: 'Собственный значок метки с контентом',
    //     clusterCaption: '1',
    //     balloonContent: 'А эта — новогодняя2',
    //     iconContent: '12-2'
    // },{
    //     draggable: true,
    //     preset: 'islands#darkGreenStretchyIcon'
    // });
    //
    // myPlacemarkWithContent2.events.add('dragend', function(e) {
    //     // Получение ссылки на объект, который был передвинут.
    //     var thisPlacemark = e.get('target');
    //     // Определение координат метки
    //     var coords = thisPlacemark.geometry.getCoordinates();
    //     console.log(coords);
    //     // и вывод их при щелчке на метке
    //     thisPlacemark.properties.set('balloonContent', coords);
    // });
    //
    //
    // var clusterer = new ymaps.Clusterer({
    //     clusterIconLayout: 'default#pieChart',
    //     clusterDisableClickZoom: true
    // });
    //
    // clusterer.add(myPlacemarkWithContent)
    //     .add(myPlacemarkWithContent2);
    //
    // var objects = ymaps.geoQuery([{
    //     type: 'Point',
    //     coordinates: [59.94, 30.38]
    // }, {
    //     type: 'Point',
    //     coordinates: [59.945, 30.385]
    // }, {
    //     type: 'Point',
    //     coordinates: [59.947, 30.327]
    // }, {
    //     type: 'Point',
    //     coordinates: [59.95, 30.33]
    // }]);
    //
    // objects.searchInside(myMap)
    // // И затем добавим найденные объекты на карту.
    //     .addToMap(myMap);
    //
    // myMap.events.add('boundschange', function () {
    //     // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
    //     var visibleObjects = objects.searchInside(myMap).addToMap(myMap);
    //     // Оставшиеся объекты будем удалять с карты.
    //     objects.remove(visibleObjects).removeFromMap(myMap);
    // });
    //
    // myMap.geoObjects.add(clusterer);
    // myMap.events.add('click',function (e) {
    //     console.log(e.get('target'));
    //     console.log(e.get('coords'));
    // })
}