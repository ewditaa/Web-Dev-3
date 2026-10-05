const express = require("express");

const router = express.Router();

const students = require("../data/students");


// ==========================================
// GET ALL STUDENTS
// GET /students
// ==========================================

router.get("/", (req, res) => {

    res.status(200).json(students);

});


// ==========================================
// GET STUDENT BY ID
// GET /students/:id
// ==========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);

});


// ==========================================
// ADD NEW STUDENT
// POST /students
// ==========================================

router.post("/", (req, res) => {

    const { name, age, course } = req.body;

    // Check required fields
    if (!name || !age || !course) {
        return res.status(400).json({
            message: "Name, age and course are required"
        });
    }

    // Generate new ID
    const newId = students.length > 0
        ? Math.max(...students.map(student => student.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name: name,
        age: age,
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });

});


// ==========================================
// UPDATE STUDENT
// PUT /students/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    // Student not found
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    // Check required fields
    if (!name || !age || !course) {
        return res.status(400).json({
            message: "Name, age and course are required"
        });
    }

    // Update student
    student.name = name;
    student.age = age;
    student.course = course;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });

});


// ==========================================
// DELETE STUDENT
// DELETE /students/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    // Student not found
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


module.exports = router;