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

    var CustomLayoutClass = ymaps.templateLayoutFactory.createClass(
        `<div class="balloon_layout">
    <div class="block">
        <div class="block__header">
            <div class="header-content">
                <i class="fa fa-lg fa-map-marker head-marker" aria-hidden="true"></i>
                Невский пр., 78, Санкт-Петербург, 191025
            </div>
            <div class="header-content close-b"><i class="fa fa-lg fa-times" aria-hidden="true"></i></div>
        </div>
        <div class="block__content">
            <div class="block__comment">
                <ul class="list">
                    <li>1</li>
                    <li>4</li>
                    <li>4</li>
                    <li>5</li>
                    <li>ss</li>
                    <li>1</li>
                    <li>4</li>
                    <li>4</li>
                    <li>5</li>
                    <li>ss</li>
                </ul>
            </div>
            <div class="block__form">
                <form action="" class="form">
                    <div class="form__label">Задача</div>
                    <div class="form__list">
                        <select name="" id="" class="form__select">
                            <option hidden selected disabled>Тип задачи</option>
                            <option value="1" class="item-select">Трабл</option>
                            <option value="2" class="item-select">Заявка</option>
                        </select>
                    </div>
                    <div class="form__list">
                        <input type="text" class=" form__input" placeholder="Клиент">
                    </div>
                    <div class="form__list">
                        <textarea class="form__area" name="text" placeholder="Описание задачи"></textarea>
                    </div>
                    <div class="form__button">
                        <button class="button remove">Удалить</button>
                        <button class="button add">Добавить</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>`,{
            build: function () {
                CustomLayoutClass.superclass.build.call(this);
                this._$element = this._element.querySelector('.balloon_layout');
                this.applyElementOffset.call(this);
                this._$element.querySelector('.close-b').addEventListener('click', this.onCloseClick.bind(this))
            },
            getShape: function () {
                CustomLayoutClass.superclass.getShape.call(this);

                var top = this._$element.getBoundingClientRect().top ;
                var left = this._$element.getBoundingClientRect().left ;
                console.log(top,left,this._$element.offsetWidth,this._$element.offsetHeight)
                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [left, top-20], [
                         left + this._$element.offsetWidth ,
                        top + this._$element.offsetHeight
                    ]
                ]));
            },
            onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire('userclose');
            },
            applyElementOffset: function () {
            },
        }
    );

    myPlacemark = window.myPlacemark = new ymaps.Placemark([59.95, 30.33], {
        hash: { key1: "value1", key2: "value2", key3: "value3" }
    }, {
        balloonLayout: CustomLayoutClass
    });
    myMap.geoObjects.add(myPlacemark)

    myMap.events.add('click', function(e) {
        var coords = e.get('coords');

        ymaps.geocode(coords).then(function(res) {
            var thisAdress = res.geoObjects.get(0).properties.get('name');
            console.log(thisAdress);
    });})


}