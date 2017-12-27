import "./style.css"
ymaps.ready(init);
var myMap;

function init() {
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
    var html= '<div class="block">\n' +
        '    <div class="block__header">\n' +
        '        текст\n' +
        '    </div>\n' +
        '    <div class="block__content">\n' +
        '        <ul>\n' +
        '            <li>1</li>\n' +
        '            <li>4</li>\n' +
        '            <li>4</li>\n' +
        '            <li>5</li>\n' +
        '            <li>ss</li>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '    <div class="block__form">\n' +
        '        <input type="text" class="form__input">\n' +
        '    </div>'

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="block">
    <div class="block__header">
        текст
    </div>
    <div class="block__content">
        <ul>
            <li>1</li>
            <li>4</li>
            <li>4</li>
            <li>5</li>
            <li>ss</li>
        </ul>
    </div>
    <div class="block__form">
        <input type="text" class="form__input">
    </div>`
    );

    myPlacemark = window.myPlacemark = new ymaps.Placemark([59.95, 30.33], {
        balloonHeader: 'Заголовок балуна',
        balloonContent: 'Контент балуна'
    }, {
        balloonContentLayout: MyBalloonLayout, balloonPanelMaxMapArea: 0
    });

}