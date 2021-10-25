const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allCategories = await Category.findAll({
      // be sure to include its associated Products
      include: [{model: Product}],
      
    })
    res.status(200).json(allCategories)
    
    console.log('Get route has been hit')
    
  }catch(e){
    res.json(e)
  }
  

});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try{
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneCategory)
    console.log('Get one category route has been hit')
  } catch(e){
    res.json(e)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try { const newCategory = await Category.create(req.body)
        res.status(200).json(newCategory)


  } catch(e) {
    res.json(e)
  }
});

router.put('/:id', async (req, res) => {
  console.log('The put route was hit')
  console.log(req.params.id)
try {
  await Category.update(
    {category_name: req.body.category_name},
    {where: req.params.id}
  )
}catch(e) {
  res.json(e).status(500)
}
})

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
 try {
        const deleteCategory = await Category.destroy({
          where: {id: req.params.id
          }
        })
        res.status(200).json(deleteCategory)
 }
 catch(e) {
      res.status(500).json(err)
 }
});

module.exports = router;
