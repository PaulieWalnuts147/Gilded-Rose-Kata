const BRIE = 'Aged Brie';
const PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured Mana Cake';


export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    increaseQuality(value = 1) {
        this.quality += value;
        if (this.quality > 50 ) {
            this.quality = 50;
        }
    }

    decreaseQuality(value = 1) {
        this.quality -= value;
        if (this.quality < 0) {
            this.quality = 0;
        }
    }

    decreaseSellIn() {
        this.sellIn --;
    }

    setQualityToZero() {
        this.quality = 0;
    }
}

class GildedRose {
    constructor(items = []) {
        this.items = items;
    }

    tick() {
        this.items.forEach(function(product) {
            GildedRose.updateProduct(product);
        });
    }

    static updateProduct (product) {
        switch(product.name) {
            case CONJURED:
                GildedRose.updateConjuredProduct(product);
                break;
            case BRIE:
                GildedRose.updateBrieProduct(product);
                break;
            case PASS:
                GildedRose.updateBackstagePassProduct(product);
                break;
            case SULFURAS:
                product.quality = 80; //never changes
                break;
            default:
                GildedRose.updateDefaultProduct(product);
        }
    }

    static updateConjuredProduct(product) {
        product.decreaseQuality(2);
        product.decreaseSellIn();
    }

     static updateBrieProduct(product) {
        product.increaseQuality();
        product.decreaseSellIn();
        GildedRose.increaseQualityIfProductIsExpired(product);
     }

     static updateBackstagePassProduct(product) {
        product.increaseQuality();
        GildedRose.increaseQualityIfSellinLessThanOrEqualTo(5, product);
        GildedRose.increaseQualityIfSellinLessThanOrEqualTo(10, product);
        product.decreaseSellIn();
        GildedRose.setQualityToZeroIfProductIsExpired(product);
    }

    static increaseQualityIfSellinLessThanOrEqualTo(i, product) {
        if (product.sellIn <= i) {
            product.increaseQuality();
        }
    }

    static updateDefaultProduct(product) {
        product.decreaseQuality();
        product.decreaseSellIn();
        GildedRose.decreaseQualityIfProductIsExpired(product);
    }

    static increaseQualityIfProductIsExpired(product) {
        if (GildedRose.isExpired(product)) {
            product.increaseQuality();
        }
    }

    static decreaseQualityIfProductIsExpired(product) {
        if (GildedRose.isExpired(product)) {
            product.decreaseQuality();
        }
    }

    static setQualityToZeroIfProductIsExpired(product) {
        if (GildedRose.isExpired(product)) {
            product.setQualityToZero();
        }
    }

    static isExpired(product) {
        return product.sellIn < 0;
    }
}

export default GildedRose;