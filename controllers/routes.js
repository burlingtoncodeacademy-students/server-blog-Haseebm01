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

            // let foundID = false;
            // let result;
            // const post_id = req.params.post_id;
            // // console.log(post_id);

            // blog.every(record => {
            //     if(record.post_id == post_id) {
            //         result = record;
            //         foundID = true;
            //     } 

            //     return foundID;
            // })
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

            // foundID ?

            // res.status(200).json({
            //     status: `Found item at ID: ${post_id}`,
            //     result
            // }) :
            // res.status(404).json({
            //     message: `Record not found`
            // })

        } catch (err) {
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

    // Put one by ID - Update an existing entery
    router.put('/:post_id', (req, res) => {
        
        try {

            //1. Grab ID value
            const post_id = Number(req.params.post_id);

            //2. Consider what is the new data within the body
            const { title, author, body } = req.body;

            //3. Detail those updates (in an obj)
            const updatedObj = {
                post_id, title, author, body
            }

            //4. Locate our Blog
            fs.readFile(fsPath, (err, data) => {
                if(err) throw err;

                const database = JSON.parse(data);

            //5. Locate our document & change it
            database.forEach((obj, i) => {
                if(obj.post_id === post_id) {
                    database[i] = updatedObj;
                }
            })

            //6. Update our Blog
            fs.writeFile(fsPath, JSON.stringify(database), err => console.log(err));
            })

            res.status(200).json({
                message: `Entry updated!`
            })

        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    });

    // Delete one by ID
    router.delete('/post_id', (req, res) => {

        try {

            //1. Find out what ID we need 
            const post_id = Number(req.params.post_id);

            //2. Locate our database
            fs.readFile(fsPath, (err, data) => {
                if(err) throw err;

                const blog = JSON.parse(data);

            //3. Locate our document & Remove it
            const keptDocuments = blog.filter(i => i.post_id !== post_id)
            // console.log('Kept: ', keptDocuments); 

            //4. Update blog with current list
            fs.writeFile(fsPath, JSON.stringify(keptDocuments), err => console.log(err));
            });

            //5. Respond to the client
            res.status(200).json({
                message: `Entry has been deleted`
            })
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    });




    module.exports = router;