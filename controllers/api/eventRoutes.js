const router = require('express').Router();
const { Event, Location } = require('../../models');

//GET for all events
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [{ model: Location }]
        });
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET single event
router.get('/:id', async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [{ model: Location }]
        });

        if(!eventData){
            res.status(404).json({ message: "No event found with this id!" });
            return;
        }

        res.status(200).json(eventData);
    } catch(err) {
        res.status(500).json(err);
    }
});

//POST create new event
router.post('/', async (req, res) => {
    try {
        const eventData = await Event.create(req.body);
        res.status(200).json(eventData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;