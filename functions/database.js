const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true })

exports.getCollection = async (collection) => {
    let items = []
    
    let productsRef = db.collection(`${collection}`).orderBy("id", "asc");
    let snapshot = await productsRef.get();
    for(const doc of snapshot.docs) {   
          items.push(doc.data());
    }
    
    return items
}

exports.setCollection = async (collection, data) => {
       console.log('Attempting to Set Collection...')
        var addedProducts = []       

        for (index = 0; index < data.length; index++) {
            let crawlProduct = data[index];
            var product = {
                id: crawlProduct.id,
                title: crawlProduct.title,
                description: crawlProduct.description,
                link: crawlProduct.link,
                image: '#'
            }
            const res = db.collection(collection).doc(product.id.toString()).set(product); 
            addedProducts.push(product)

            console.log(`📦 ${crawlProduct.title} added to Database`)
            if (index === data.length - 1) {
                console.log('')
            }
        }

        const output = await Promise.all(addedProducts)

        return console.log(console.log(`\n💾 Database Update Complete! ${output.length} products added. ✔\n`));
}

