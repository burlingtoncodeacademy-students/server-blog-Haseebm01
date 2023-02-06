const router = require('express').Router();
const blog = require('../helpers/blog.json');
const fs = require('fs'); 


router.get('/', (req, res) => {

    try {
        res.status(200).json({ 
            results: db
        })
    
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});












module.exports = router;