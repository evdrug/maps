import "./style.css";
import LocalS  from './dataS';
ymaps.ready(init);
var myMap;
let lm = new LocalS();

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
                        <span class = "adress">{{properties.adress}}</span>
                    </div>
                    <div class="header-content close-b"><i class="fa fa-lg fa-times" aria-hidden="true"></i></div>
                </div>
                <div class="block__content">
                    <div class="block__comment">
                        
                            {% if properties.comment.length == 0 %}
                                <ul class="list">
                                    <li class="comment__item">
                                        Задач нет
                                    </li>
                                </ul>
                                </div>
                                <div class="block__form">
                                    <form action="" class="form">
                                        <input class="coords" name="coords" type="hidden" value="{{properties.pointCoords}}">
                                        <div class="form__label">Задача</div>
                                        <div class="form__list">
                                            <select name="" id="" class="form__select">
                                                <option hidden selected disabled>Тип задачи</option>
                                                <option value="1" class="item-select">Трабл</option>
                                                <option value="2" class="item-select">Заявка</option>
                                            </select>
                                        </div>
                                        <div class="form__list">
                                            <input type="text" class=" form__input" placeholder="Клиент" name ="name-client">
                                        </div>
                                        <div class="form__list">
                                            <textarea class="form__area" name="text-comment" placeholder="Описание задачи"></textarea>
                                        </div>
                                        <div class="form__button">
                                            <button class="button disabled" disabled>Удалить</button>
                            {% else %} 
                                <div class="name-client">Клиент: {{properties.balloonContentHeader}}</div>
                                <div class="type-obr">Тип:  {% if properties.type == 1 %} Трабл {% else %} Заявка {% endif %}</div>
                                <ul class="list">
                                {% for a in properties.comment %} 
                                     <li class="comment__item">
                                        <div class="comment__date">
                                             {{ a.date }}
                                        </div>
                                        <div class="comment__text">
                                            {{ a.text }}
                                        </div>
                                        <div></div>   
                                    </li>                     
                                {% endfor %}
                                </ul>
                                </div>
                                <div class="block__form">
                                    <form action="" class="form">
                                        <div class="form__label">Добавить комментарий</div>
                                        <input class="id" name="id" type="hidden" value="{{properties.id}}">
                                        <div class="form__list">
                                            <textarea class="form__area" name="text-comment" placeholder="Комментарий"></textarea>
                                        </div>
                                        <div class="form__button">
                                            <button class="button remove">Удалить</button>
                            {% endif %}
                                <button class="button add">Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
        
            </div>
        </div>`,
        {
            build: function () {
                CustomLayoutClass.superclass.build.call(this);
                this._$element = this._element.querySelector('.balloon_layout');
                this._$element.querySelector('.close-b').addEventListener('click', this.onCloseClick.bind(this));
                this._$element.querySelector('.add').addEventListener('click', this.addBtn.bind(this));
                if(this._$element.querySelector('.remove')){
                    this._$element.querySelector('.remove').addEventListener('click', this.removeBtn.bind(this));
                }
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
            addBtn: function (e) {
                e.preventDefault();
                let comment = this._$element.querySelector('.form__area').value;
                if(!comment){
                    alert("Укажите комментарий");
                    return 0;
                }
                
                if(!this._$element.querySelector('.remove')) {
                    let type = this._$element.querySelector('.form__select').selectedIndex;
                    let client = this._$element.querySelector('.form__input').value;

                    let coords = this._$element.querySelector('.coords').value.split(',');
                    let adress = this._$element.querySelector('.adress').textContent;
                    if(!type){
                        alert("Выбеоите тип задачи");
                        return 0;
                    }
                    if(!client){
                        alert("Укажите название клиента");
                        return 0;
                    }


                    let data={};
                    data.type = type;
                    data.client = client;
                    data.comment = comment;
                    data.coords = coords;
                    data.adress = adress;
                    data.typeV = (type === 1) ?  "islands#redStretchyIcon" : "islands#darkOrangeStretchyIcon";
                    lm.addData(lm.obj(data));
                    objectManager.removeAll();
                    objectManager.add(lm.getStor());
                    objectManager.objects.balloon.open(lm.arr.length-1);
                }else {
                    let id = this._$element.querySelector('.id').value;
                    lm.setData(id,{date:lm.getDate(),text:comment})
                    objectManager.removeAll();
                    objectManager.add(lm.getStor());
                    objectManager.objects.balloon.open(id);
                }

            },
            removeBtn: function (e) {
                e.preventDefault();
                let id = this._$element.querySelector('.id').value;
                lm.deleteData(id);
                objectManager.removeAll();
                objectManager.add(lm.getStor());
                objectManager.objects.balloon.close(id);
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
        <div class="name-client">Клиент: {{properties.balloonContentHeader}}</div>
        <div class="type-obr">Тип:  {% if properties.type == 1 %} Трабл {% else %} Заявка {% endif %}</div>        
        <div class="list-t">
        {% for a in properties.comment %} 
            <div class="comment__item">
                <div class="comment__date">{{a.date}}</div> 
                <div class="comment__text">{{a.text}}</div> 
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
                    objectManager.objects.balloon.open(e.target.getAttribute('href'));
                });

            },
            onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire('userclose');
            },
        }
     );

    var objectManager = new ymaps.ObjectManager({
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true,
        clusterIconLayout: 'default#pieChart',
        clusterBalloonItemContentLayout:customCluster,
        clusterBalloonCloseButton: false,
        clusterHideIconOnBalloonOpen: false,
    });


    objectManager.objects.options.set('hideIconOnBalloonOpen', false);
    objectManager.objects.options.set('maxHeight', 400);

    objectManager.add(lm.getStor());
    myMap.geoObjects.add(objectManager);

    objectManager.objects.events.add('click', function (e) {
        var objectId = e.get('objectId');
        objectManager.objects.balloon.open(objectId);
    });

    objectManager.objects.options.set({
        balloonLayout: CustomLayoutClass,
    })


    myMap.events.add('click', function(e) {
        var coords = e.get('coords');

        ymaps.geocode(coords).then(function(res) {
            var thisAdress = res.geoObjects.get(0).properties.get('name');
            return thisAdress;
    }).then(function (res) {
            myMap.balloon.open(coords,{
                properties:{
                    pointCoords: coords,
                    adress: res,
                    comment:[],
                }

            },{layout:CustomLayoutClass})
        })


    })


}