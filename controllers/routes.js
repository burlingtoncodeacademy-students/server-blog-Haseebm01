    const router = require('express').Router();
    const blog = require('../api/blog.json');
    const fs = require('fs'); 
    const fsPath = ('./api/blog.json');

    // Get All
    router.get('/get-all', (req, res) => {

        try {
            res.status(200).json({ 
                results: blog
            });
        
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        } 
    });  

    // Get one by ID
    router.get('/:post_id', (req, res) => {
        try {
            const post_id = req.params.post_id;

            let result = blog.filter(i => i.post_id == post_id);

            if(result.length > 0) {
                res.status(200).json({
                    status: `Found item at ID: ${post_id}`,
                    result
                });
            } else {
                res.status(404).json({
                    message: `Record not found.`
                })
            }
        }catch (err) {
            res.status(500).json({
                ERROR: err.message
            })
        }
    });

    // Get all by author
    router.get('/author/:author', (req,res) => {
         try {
            const author = req.params.author;

            let results = [];

            blog.forEach(obj => {
                if(obj.author.toLowerCase() == author.toLowerCase())
                {
                    results.push(obj);
                }
            }); 

            results.length > 0 ?
            res.status(200).json({
                results 
            }) :
            res.status(404).json({
                message: `No ${author} found`
            });
         } catch (err) {
            res.status(500).json({
                message: `Error: ${err.message}`
            });
         }
    });
    // Post one - create a new entry
    router.post('/new-entry', (req, res) => {

        try {
            const { title, author, body } = req.body;

            // const obj = {
            //     post_id: blog.length + 1,
            //     title: title,
            //     author: author,
            //     body: body
            // }

            const obj = {
                post_id: blog.length + 1,
                title,
                author,
                body
            }
            fs.readFile(fsPath, (err, data) => {
                if(err) throw err;

                const blog = JSON.parse(data);
                blog.push(obj);

                fs.writeFile(fsPath, JSON.stringify(blog), err => console.log(err));
            }); 

            res.status(200).json({
                message: `New Character Created`,
                result: blog
            });

        } catch(err) {
            res.status(500).json({
                message: `Error: ${err.message}`
            })
        }
    });








    module.exports = router;