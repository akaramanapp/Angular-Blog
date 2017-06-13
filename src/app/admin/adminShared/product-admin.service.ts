import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../adminShared/product'

@Injectable()

export class ProductService {

    createProduct(product: Product) {
        console.log('servise gelen:'+product);
        let storageRef = firebase.storage().ref();
        storageRef.child('product_images/' + product.imgTitle).putString(product.img, 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('products/');
                let newProduct = dbRef.push();
                newProduct.set({
                    name: product.name,
                    desc: product.description,
                    imgTitle: product.imgTitle,
                    img: url,
                    price: product.price,
                    id: newProduct.key
                });
            })
            .catch((error) => {
                alert('failed upload:'+ error);
            })

    }
    editProduct(update: Product){
        let dbRef = firebase.database().ref('products/').child(update.id)
        .update({
            name: update.name,
            desc: update.description,
            price: update.price
        });
        alert('product updated')
    }
    
    removeProduct(deleteProduct: Product){
        let dbRef = firebase.database().ref('products/').child(deleteProduct.id).remove();
        alert('Product deleted');
        let imageRef = firebase.storage().ref().child('product_images/'+deleteProduct.imgTitle)
        .delete()
        .then(function(){
            alert('deleted image');
        }).catch(function(error){
            alert(error)
        })
    }
}