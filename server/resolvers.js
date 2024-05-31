const DataLoader = require('dataloader')
const Risk = require('./models/Risk')
const Category = require('./models/Category')

const categoryLoader = new DataLoader(async (categoryIds) => {
    const categories = await Category.find({ _id: { $in: categoryIds } })
    return categoryIds.map(id => categories.find(category => category._id.toString() === id.toString()))
})

const resolvers = {
    Risk: {
        category: (risk) => categoryLoader.load(risk.categoryId),
    },
    Query: {
        risks: async (_, { resolved, page = 1, limit = 10 }) => {
            const query = resolved ? {} : { resolved }
            return await Risk.find(query).skip((page - 1) * limit).limit(limit)
        },
        categories: async (_, { page = 1, limit = 10 }) => {
            return await Category.find().skip((page - 1) * limit).limit(limit)
        },
    },
    Mutation: {
        createRisk: async (_, { name, description, categoryId, resolved, createdBy }) => {
            const risk = new Risk({ name, description, categoryId, resolved, createdBy })
            await risk.save()
            return risk
        },
        removeRisk: async (_, { id }) => {
            try {
                const deletedRisk = await Risk.findByIdAndDelete(id)
                return {
                    success: true,
                    message: `Risk "${deletedRisk.name}" deleted successfully`
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                }
            }
        },
        updateRiskStatus: async (_, { id, resolved }) => {
            return await Risk.findByIdAndUpdate(id, { resolved }, { new: true })
        },
        updateRisk: async (_, { id, name, description }) => {
            return await Risk.findByIdAndUpdate(id, { name, description }, { new: true })
        },
        createCategory: async (_, { name, description, createdBy }) => {
            const category = new Category({ name, description, createdBy })
            await category.save()
            return category
        },
        removeCategory: async (_, { categoryId }) => {
            try {
                const risks = await Risk.find({ categoryId })
                if (risks.length > 0) {
                    throw new Error('Cannot delete category. There are risks associated with this category.')
                }
                const deletedCategory = await Category.findByIdAndDelete(categoryId)
                if (!deletedCategory) {
                    throw new Error('Category not found')
                }
                return {
                    success: true,
                    message: `Category "${deletedCategory.name}" deleted successfully`
                }
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                }
            }
        },
        updateCategory: async (_, { id, name, description }) => {
            return await Category.findByIdAndUpdate(id, { name, description }, { new: true })
        },
    },
}

module.exports = resolvers
