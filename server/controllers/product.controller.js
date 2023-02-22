const Product = require('../models/product.model')
const Category = require('../models/category.model')
const mongoose = require('mongoose')
const multer = require('multer');


// MIME type - Multipurpose Internet Mail Extension
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-').split('.').join('');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

const getProductItems = async (req, res) => {
    let filter;
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    const productItem = await Product.find(filter).populate('category')
    // populate('category', 'icon')
    // the second parameter in the populate method returns a specific data
    // use select to choose specific data to be returned
    // uncomment the code below
    // .select('name image -_id')

    if (!productItem) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(productItem)
}

const getFeaturedProducts = async (req, res) => {
    const featuredProduct = await Product.find({ isFeatured: true })

    if (!featuredProduct) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(featuredProduct)
}

const getFeaturedProductsCount = async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const featuredProduct = await Product.find({ isFeatured: true }).limit(
        +count
    )

    if (!featuredProduct) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(featuredProduct)
}

const getProductCount = async (req, res) => {
    const product = await Product.find().populate('category')
    const productCount = await Product.countDocuments()
    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        productCount: `Database has ${productCount} product(s)`,
        // no need to display the below
        // product: product,
    })
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({
            error: 'No such product with such ID found!',
        })
    }
    res.status(200).send(product)
}

const postProduct = async (req, res) => {
    // referencing the category to product
    // To confirm if category from user(front-end) is valid,
    // We create a new category request

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).send('Category Not Found')

    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')
    

    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        longDescription: req.body.longDescription,
        // image: req.body.image,
        // images: req.body.images,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    await product.save()

    if (!product) return res.status(404).send('Invalid Product Input')

    res.send(product)
}

const updateProduct = async (req, res) => {
    // validating parameter id with mongoose

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(404).send('Product ID Not Found!')
    }
    // referencing the category to product
    // To confirm if category from user(front-end) is valid,
    // We create a new category request

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(404).send('Category Not Found')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            longDescription: req.body.longDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )
    if (!product) {
        return res.status(400).send('Product cannot be updated!')
    }
    res.status(201).send(product)
}

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).send('Product successfully deleted!')
            } else {
                return res.status(400).send('Product NOT found!')
            }
        })
        .catch((err) => {
            return res.status(404).json({
                message: 'Invalid command!',
                err,
            })
        })
}

module.exports = {
    getProductItems,
    getFeaturedProducts,
    getFeaturedProductsCount,
    getProductCount,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
    uploadOptions,
}