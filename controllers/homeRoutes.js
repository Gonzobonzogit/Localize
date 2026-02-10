const router = require('express').Router();
const { Event, Location } = require('../models');

//GET homepage
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: Location,
                    attributes: ['city', 'country']
                }
            ],
            limit:10,
            order: [['event_date', 'ASC']]
        });

        const events = eventData.map(event => event.get({ plain:true }));

        res.render('homepage', {
            events,
            logged_in: req.session.logged_in
        });
     } catch(err){
        res.status(500).json(err);
  }
});

module.exports = router;