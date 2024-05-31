const mongoose = require('mongoose')
const Risk = require('./models/Risk')
const Category = require('./models/Category')
require('dotenv').config()

function Random(maxValue) {
    return Math.floor(Math.random() * maxValue)
}

async function ClearDatabase() {
    await Risk.deleteMany({})
    await Category.deleteMany({})
    console.log('Database was cleared. All Risks and Categories deleted')
}

async function SeedDatabase() {
    const categoryNames = [
        'Financial', 'Operational', 'Strategic', 'Compliance', 'Reputation',
        'Cybersecurity', 'Environmental', 'Health and Safety', 'Human Resources',
        'Supply Chain', 'Market', 'Legal', 'Technological', 'Project Management',
        'Product', 'Customer', 'Innovation', 'Infrastructure', 'Cultural', 'Political'
    ]

    const categories = categoryNames.map((name) => ({
        name,
        description: `${name} related risks`,
        createdBy: 'System'
    }))

    const categoryDocs = await Category.insertMany(categories)

    const risks = []

    for (let i = 0; i < 1000; i++) {
        const category = categoryDocs[Random(categoryDocs.length)]
        risks.push({
            name: `Risk ${i + 1}`,
            description: `Description for risk ${i + 1}`,
            categoryId: category._id,
            resolved: Random(100) % 2 === 1,
            createdBy: 'System',
        })
    }

    await Risk.insertMany(risks)

    console.log('Database seeded!')
}

module.exports = {
    SeedDatabase,
    ClearDatabase,
}