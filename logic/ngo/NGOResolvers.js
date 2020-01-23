const ngoResolvers = {
    Query: {
      groups: (root, context) => ({ root, context }),

    },
    Groups: {
      name: async (root, context) => {
        const groupTotal = await fetchTotal("groups");
  
        return groupTotal;
      },
      cycle: async (root, context) => {
        const groupTotal = await fetchTotal("groups");
  
        return groupTotal;
      },
      meetings: async (root, context) => {
        const groupTotal = await fetchTotal("groups");
  
        return groupTotal;
      },
      shares: async (root, context) => {
        const groupTotal = await fetchTotal("groups");
  
        return groupTotal;
      },
      loans: async (root, context) => {
        const groupTotal = await fetchTotal("groups");
  
        return groupTotal;
      },
    }
}

module.exports = ngoResolvers;