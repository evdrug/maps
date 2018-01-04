let castBalloon = `<div class="balloon_layout">
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
        </div>`;

export default castBalloon