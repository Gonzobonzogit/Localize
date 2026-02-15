const sequelize = require('../config/connection');
const { Location, Event } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //Seed Locations
    const locations = await Location.bulkCreate([
        { country: 'USA', city: 'New York', continent: 'North America' },
        { country: 'France', city: 'Paris', continent: 'Europe' },
        { country: 'Japan', city: 'Tokyo', continent: 'Asia' },
        { country: 'Brazil', city: 'Rio De Janeiro', continent: 'South America' },
        { country: 'Australia', city: 'Sydney', continent: 'Oceania' }
    ]);

    //Seed Events
    await Event.bulkCreate([
        {
            title: 'Summer Music Festival',
            description: 'Annual summer music festival featuring local and international artists',
            event_date: new Date('2025-06-15'),
            category: 'Music',
            location_id: 1 // New York
        },
        {
            title: 'Tech Conference 2025',
            description: 'Major tech conference with keynote speakers and workshops',
            event_date: new Date('2025-09-20'),
            category: 'Technology',
            location_id: 2 // Paris
        },
        {
            title: 'Food Expo',
            description: 'Culinary exhibition showcasing international cuisine',
            event_date: new Date('2025-08-10'),
            category: 'Food',
            location_id: 3 // Tokyo
        }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
};

seedDatabase();