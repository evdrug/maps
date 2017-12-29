import "./style.css"
ymaps.ready(init);
var myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.33],
        zoom: 10
    });
    myMap.cursors.push('arrow');

    var CustomLayoutClass = ymaps.templateLayoutFactory.createClass(
        `<div class="balloon_layout">
    <div class="block">
        <div class="block__header">
            <div class="header-content">
                <i class="fa fa-lg fa-map-marker head-marker" aria-hidden="true"></i>
                <span>{{properties.adress}}</span>
            </div>
            <div class="header-content close-b"><i class="fa fa-lg fa-times" aria-hidden="true"></i></div>
        </div>
        <div class="block__content">
            <div class="block__comment">
                <ul class="list">
                    {% if properties.comment.length == 0 %}
                        <li class="comment__item">
                            Задач нет
                        </li>
                    {% else %} 
                        {% for a in properties.comment %} 
                        <li>
                            <div class="comment__date">
                                 {{ a.date }}
                            </div>
                            <div class="comment__type">
                                {{ a.type }}
                            </div>
                            <div class="comment__client">
                                {{ a.client }} 
                            </div>
                            
                            <div></div>
                            <div class="comment__text">
                                {{ a.text }}
                            </div>
                            <div></div>   
                        </li>                     
                        {% endfor %}
                    {% endif %}

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
                    {% if properties.comment.length == 0 %}
                        <button class="button disabled" disabled>Удалить</button>
                    {% else %}
                        <button class="button remove">Удалить</button>
                    {% endif %}
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
                this._$element.querySelector('.close-b').addEventListener('click', this.onCloseClick.bind(this));
            },
            getShape: function () {
                CustomLayoutClass.superclass.getShape.call(this);

                var el = this._$element.getBoundingClientRect();
                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [0, 0], [
                        el.width,
                        el.height
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

    var customCluster = ymaps.templateLayoutFactory.createClass(
        `<div class="block__header">
            <div class="header-content">
                <i class="fa fa-lg fa-map-marker head-marker" aria-hidden="true"></i>
                <a class="header-adress" href="{{properties.id}}">{{properties.adress}}</a>
            </div>
            <div class="header-content close-b"><i class="fa fa-lg fa-times" aria-hidden="true"></i></div>
        </div>
        <div class="name-client">{{properties.balloonContentHeader}} - {{properties.type}}</div>
        <div class="list-t">
        {% for a in properties.comment %} 
            <div class="clusterBalloon">
                {{a.date}}
                {{a.text}}
            </div>                   
        {% endfor %}
       </div>`,
        {
            build: function () {
                customCluster.superclass.build.call(this);
                this._$element = this._element.querySelector('.block__header');
                this._$element.querySelector('.close-b').addEventListener('click', this.onCloseClick.bind(this))
                this._$element.querySelector('.header-adress').addEventListener('click', (e)=>{
                    e.preventDefault();
                    console.log(e.target.textContent.trim(),e.target.getAttribute('href'))
                    objectManager.objects.balloon.open(e.target.getAttribute('href'));
                });

            },
            onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire('userclose');
            },
        }
     );

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
                    "id":0,
                    "balloonContentHeader": "Паб",
                    "adress":"Фруктовая линия",
                    "type":"Заявка",
                    "comment":[
                                {"date":"20.12.2017","text":"Надо все включить!)"}
                            ],
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
                    "coordinates": [59.934, 30.33]
                },
                "properties": {
                    "id": 1,
                    "balloonContentHeader": "Нева",
                    "adress":"Фруктовая линия",
                    "type":"Трабл",
                    "comment":[
                                {"date":"20.12.2017","text":"Надо все починить!)"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"},
                                {"date":"22.12.2017","text":"Ничего не вышло("},
                                {"date":"24.12.2017","text":"Не успел"}
                            ],
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
                "id": 2,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.934, 30.334]
                },
                "properties": {
                    "id": 2,
                    "balloonContentHeader": "СПБ",
                    "adress": " Невский проспект, 35",
                    "type":"Заявка",
                    "comment":[{"date":"20.12.2017","text":"Надо все починить!)"}],
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
        clusterDisableClickZoom: true,
        clusterIconLayout: 'default#pieChart',
        clusterBalloonItemContentLayout:customCluster,
        clusterBalloonCloseButton: false,
        clusterHideIconOnBalloonOpen: false
    });




    objectManager.add(json);
    myMap.geoObjects.add(objectManager);

    objectManager.objects.events.add('click', function (e) {
        var objectId = e.get('objectId');
        objectManager.objects.balloon.open(objectId);
    });

    objectManager.objects.options.set({
        balloonLayout: CustomLayoutClass,
    })


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
            return thisAdress;
    }).then(function (res) {
            myMap.balloon.open(coords,{
                properties:{
                    adress: res,
                    comment:[],
                }

            },{layout:CustomLayoutClass})
        })


    })


}