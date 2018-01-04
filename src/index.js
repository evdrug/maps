import "./style.css";
import LocalS  from './dataS';
import clusterMain  from './clusterMain';
import castBalloon  from './castomBalloon';
console.log(clusterMain);
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
        castBalloon,
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
        clusterMain,
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