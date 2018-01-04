var customCluster = `<div class="block__header">
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
       </div>`;

export default customCluster;