export default class LocalS {
    constructor (){
        if(!localStorage.geo) {
             this.setStor([])
        }
        this.arr = this.getStor().features

    }

    getStor (){
        return  JSON.parse(localStorage.geo)
    }

    setStor (arr) {
        localStorage.geo = JSON.stringify(
            {
            "type": "FeatureCollection",
            "features": arr
            }
        );
    }
    setData (id=none,comment){
        for(let i = 0; i<this.arr.length; i++){
            if(this.arr[i].id == id){
                this.arr[i].properties.comment.push(comment);
            }
        }

        this.setStor (this.arr);
    }

    getData(id=none){

    }

    getDate (){
        let d = new Date();
        let hours = d.getHours(),
            min = d.getMinutes(),
            day = d.getDate(),
            month = d.getMonth(),
            year = d.getFullYear();
        return `${day}.${month+1}.${year} ${hours}:${min}`;
    }

    obj(data){
        let count = this.arr.length;
        data.id = count++;
        data.time = this.getDate();

        return  {
                    "type": "Feature",
                    "id": data.id,
                    "geometry": {
                        "type": "Point",
                        "coordinates": data.coords
                    },
                    "properties": {
                        "id":data.id,
                        "balloonContentHeader": data.client,
                        "adress":data.adress,
                        "type":data.type,
                        "comment":[
                            {"date":data.time,"text":data.comment}
                        ],
                    },
                    "options": {
                        "preset": data.typeV
                    }
                };
    }

    addData(obj){
        this.arr.push(obj)
        this.setStor(this.arr)
    }

    deleteData(id=none){
        for(let i = 0; i<this.arr.length; i++){
            if(this.arr[i].id == id){
                this.arr.splice(this.arr.indexOf(id), 1);
            }
        }

        this.setStor (this.arr);
    }
}

