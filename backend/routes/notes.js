const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//ROUT 1: Get all the notes using : GET "/api/auth/getuser .Login Required"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
  res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
  
});

//ROUT 1: Add a new note using : POST "/api/auth/addnote .Login Required"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 letters").isLength({min: 5}),
    
  ],
  async (req, res) => {
    try {
        const  {title, description, tag} = req.body;
        //Ifthere are error return Bad Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note ({
            title, description,tag,user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Some Error occured");
    }

  }
);
//ROUT 3: Updating an existing note using : POST "/api/auth/updatenote .Login Required"
router.put('/updatenote/:id',fetchuser,async (req, res) => {
  const {title,description,tag} = req.body;
  //Create a newNote object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //find the note ro he updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")};
  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
  res.json({note});
})

//ROUTE 4: Deleting an existing note using : DELETE "/api/auth/deletenote .Login Required"
router.delete('/deletenote/:id',fetchuser,async (req, res) => {
  const {title,description,tag} = req.body;
  try {
    //find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")};
  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"Success":"Note has been deleted", note: note});

  } catch (error) {
    
  }
})

  module.exports = router;
