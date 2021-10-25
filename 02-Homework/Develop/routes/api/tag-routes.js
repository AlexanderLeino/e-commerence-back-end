const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const allTags = await Tag.findAll({
      // be sure to include its associated Products
      include: [{model: Product}],
      
    })
    res.status(200).json(allTags)
    
    console.log('Get route has been hit')
    
  }catch(e){
    res.json(e)
  }
  

});

router.get('/:id', async (req, res) => {
  try{
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneTag)
    console.log('Get one category route has been hit')
  } catch(e){
    res.json(e)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try { const newTag = await Tag.create(req.body)
        res.status(200).json(newTag)


  } catch(e) {
    res.json(e)
  }
});

router.put('/:id', async (req, res) => {
  Tag.update(
    {
      tagName: req.body.tagName
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
// update a category by its id value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
 try {
        const deleteTag = await Tag.destroy({
          where: {id: req.params.id
          }
        })
        res.status(200).json(deleteTag)
 }
 catch(e) {
      res.status(500).json(err)
 }
});
module.exports = router;
