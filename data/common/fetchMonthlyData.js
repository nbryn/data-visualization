const { getModel } = require('../connection');

async function fetchMonthlyData(collection, matchString) {
    const model = await getModel(collection);

    try {
        const dbResult = await model.aggregate([
            {
                $match: {
                    state: 'ACTIVE',
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$' + matchString },
                        year: { $year: '$' + matchString },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const signups = dbResult
            .map((element) => {
                return {
                    year: element._id.year,
                    month: element._id.month,
                    count: element.count,
                };
            })
            .sort((el1, el2) => el1.year - el2.year);

        return signups;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { fetchMonthlyData };
