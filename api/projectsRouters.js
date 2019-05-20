// IMPORTS
const express = require("express");

// Importing Models for DB
const Projects = require("../data/helpers/projectModel");

// Router
const router = express.Router();

// - GET - //
router.get("/", async (req, res) => {
  console.log("projectsRouter GET/ ");
  try {
    console.log("HELLO");

    const projects = await Projects.get();
    console.log(projects);

    res.status(200).json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The projects information could not be found" });
  }
});

router.get("/:id", async (req, res) => {
  console.log("projectsRouter GET/:id ");
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      error: `The project information for id# ${id} could not be found`
    });
  }
});

// - POST - //

/* 
    Shape Accepted
    {
        "name": "nameString here",
        "description": "descriptionString here"
    }
*/

router.post("/", async (req, res) => {
  console.log("projectsRouter POST/");
  console.log(req.body);
  try {
    const newProject = await Projects.insert(req.body);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      res.status(400).json({ message: "please fix shape of newProject" });
    }
  } catch (err) {
    res.status(500).json({ error: `Could not POST item` });
  }
});

// - PUT - //
/* 
    Shape Accepted
    {
        "name": "nameString here",
        "description": "descriptionString Here",
        "completed": bool here
    }
*/

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("projectsRouter PUT/:id");

  try {
    const editProject = await Projects.update(id, req.body);
    res.status(200).json(editProject);
  } catch (err) {
    res.status(500).json({ error: `Could not UPDATE project ${id}` });
  }
});

// - DELETE - //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("actionsRouter DELETE/:id");

  try {
    const deletedProject = await Projects.remove(id);
    res.status(204).json(deletedProject);
  } catch (err) {
    res.status(500).json({ error: `Could not DELETE action ${id}` });
  }
});

// EXPORTS
module.exports = router;
