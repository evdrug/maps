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
    myMap.events.add('click', function (e) {
            var coords = e.get('coords');
            myMap.balloon.open(coords,{ contentHeader: 'Однажды',
                contentBody: 'В студёную зимнюю пору' +
                ' <span style="color:red; font-weight:bold">Я</span>' +
                ' из лесу <b>вышел</b>',
            }, {
                minWidth:300,
                minHeight: 300,
                offset: [60,330]
            })
        });

    // var myPlacemarkWithContent = new ymaps.Placemark([59.93, 30.33], {
    //     hintContent: 'Собственный значок метки с контентом',
    //     clusterCaption: '1',
    //     balloonContent: 'А эта — новогодняя',
    //     iconContent: '12'
    // });
    //
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