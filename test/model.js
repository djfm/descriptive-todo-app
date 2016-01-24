/* global describe, it */
import chai from 'chai';
chai.should();

import Model from '../lib/Model';

describe('A Model', function () {

    class Product extends Model {}
    Product.needs = {
        name: {
            type: 'text',
        },
        price: {
            type: 'number',
        }
    };

    class Picture extends Model {}
    Picture.needs = {
        title: {
            type: 'text',
        },
        url: {
            type: 'text',
        }
    };

    class ProductWithPictures extends Model {}
    ProductWithPictures.needs = Object.assign({}, Product.needs, {
        pictures: {
            type: Picture,
            atLeast: 0,
            atMost: 2
        }
    });

    describe('a simple model', function () {
        it('should have a list of slots that has initially all fields', function () {
            const product = new Product();
            product.getSlots().should.deep.equal([{
                key: 'name',
                type: 'text'
            }, {
                key: 'price',
                type: 'number'
            }]);
        });

        it('should reduce the number of slots once a field is filled', function () {
            const product = new Product();
            product.name = 'Blue Dress';
            product.getSlots().should.deep.equal([{
                key: 'price',
                type: 'number'
            }]);
        });
    });

    describe('a model with children', function () {
        it('should have a slots for child objects', function () {
            const product = new ProductWithPictures();
            product.getSlots().should.deep.equal([{
                key: 'name',
                type: 'text'
            }, {
                key: 'price',
                type: 'number'
            }, {
                key: 'pictures[0].title',
                type: 'text'
            }, {
                key: 'pictures[0].url',
                type: 'text'
            }]);
        });

        it('should reduce the number of slots once a child field is filled', function () {
            const product = new ProductWithPictures();

            const pic = new Picture();
            pic.title = 'Hello!';
            product.pictures = [pic];

            product.getSlots().should.deep.equal([{
                key: 'name',
                type: 'text'
            }, {
                key: 'price',
                type: 'number'
            }, {
                key: 'pictures[0].url',
                type: 'text'
            }]);
        });

        it('should add them again once a child field is completed...', function () {
            const product = new ProductWithPictures();

            const pic = new Picture();
            pic.title = 'Hello!';
            pic.url = 'World!';
            product.pictures = [pic];

            product.getSlots().should.deep.equal([{
                key: 'name',
                type: 'text'
            }, {
                key: 'price',
                type: 'number'
            }, {
                key: 'pictures[1].title',
                type: 'text'
            }, {
                key: 'pictures[1].url',
                type: 'text'
            }]);
        });

        it('...unless the max is reached', function () {
            const product = new ProductWithPictures();

            const pic = () => {
                const pic = new Picture();
                pic.title = 'Hello!';
                pic.url = 'World!';
                return pic;
            };


            product.pictures = [pic(), pic()];

            product.getSlots().should.deep.equal([{
                key: 'name',
                type: 'text'
            }, {
                key: 'price',
                type: 'number'
            }]);
        });
    });

    describe('a polynomial structure', function () {
        class A extends Model {}
        class B extends Model {}
        class C extends Model {}

        A.needs = {
            bs: { type: B, atLeast: 0 }
        };

        B.needs = {
            b: {type: 'text'},
            cs: { type: C, atLeast: 0 }
        };

        C.needs = {
            c: { type: 'text' }
        };

        it('should offer all alternatives', function () {
            const a = new A();
            const b = new B();
            b.b = 'hi';
            a.bs = [b];

            a.getSlots().should.deep.equal([
                {
                    key: 'bs[0].cs[0].c',
                    type: 'text'
                }, {
                    key: 'bs[1].cs[0].c',
                    type: 'text'
                }
            ]);
        });
    });

});
