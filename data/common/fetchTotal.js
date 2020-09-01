const {getModel} = require('../connection');

async function fetchTotal(collection) {
   const model = await getModel(collection);

   const total = await model.countDocuments('');

   return total;
}

module.exports = {fetchTotal};
