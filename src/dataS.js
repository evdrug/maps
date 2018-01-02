class LocalS {
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
    setData (id=none){

    }

    getData(id=none){

    }

    addData(obj){
        this.arr.push(obj)
        this.setStor(this.arr)
    }

    deleteData(id=none){

    }
}