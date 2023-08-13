// Catalog class that is used to keep track of catalog items //
class Catalog {
    constructor(category, description, id, image, price, rating, title){
        this.category = category;
        this.description = description;
        this.id = id;
        this.image = image;
        this.price = parseFloat(price).toFixed(2);  // keeps the price consistent
        this.rating = rating;
        this.title = title;
    }

    // start of setters and getters //
    get curCategory(){         
        return this._category;
    }
    set newCategory(val){     
        this._category = val;
    }

    get curDescription(){        
        return this._description;
    }
    set newDescription(val){      
        this._description = val;
    }

    get curId(){       
        return this._id;
    }
    set newId(val){    
        this._id = val;
    }

    get curImage(){       
        return this._image;
    }
    set newImage(val){    
        this._image = val;
    }

    get curPrice(){         
        return this._price;
    }
    set newPrice(val){       
        this._price = val;
    }

    get curRating(){         
        return this._rating;
    }
    set newRating(val){       
        this._rating = val;
    }

    get curTitle(){         
        return this._title;
    }
    set newTitle(val){       
        this._title = val;
    }
    // end of setters and getters //
}