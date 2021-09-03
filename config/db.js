// Simulated Database
let budget = 4000;

const envelopes = [
    {
        id: 1,
        name: 'groceries',
        weight: 0.15,
        value: 0
    },
    {
        id: 2,
        name: 'rent',
        weight: 0.4,
        value: 0
    },
    {
        id: 3,
        name: 'gasoline',
        weight: 0.10,
        value: 0
    },
    {
        id: 4,
        name: 'restaurants',
        weight: 0.15,
        value: 0
    },
    {
        id: 5,
        name: 'savings',
        weight: 0.1,
        value: 0
    },
    {
        id: 6,
        name: 'leisure',
        weight: 0.1,
        value: 0
    }
]

const setValues = (capital) => {
    envelopes.forEach(envelope => {
        envelope.value = envelope.weight * capital;
    });
}

const searchById = (id) => {
    const index = envelopes.findIndex((envelope) => id == envelope.id)
    if (index === -1) {
        return undefined;
    } else {
        return index;
    }
}

const updateDbIndex = (body) => {
    if (body) {
        try {
            const {id, name, weight} = body;
            let index = searchById(id);
            Object.assign(envelopes[index], ({name: name, weight: weight}));
            return envelopes[index];
        } catch(e) {
            console.log(e);
        }
    } else {
        return null;
    }
};

const deleteDbIndex = (id) => {
    const index = searchById(id);
    if (index) {
        const envelopeToDelete = envelopes[index];
        const keys = Object.keys(envelopes[index]);
        keys.forEach(key => {
            if (key !== 'id') {
                envelopes[index][key] = null;
            }
        })
        return envelopeToDelete;
    } else {
        return null;
    }
}

const deleteAll = () => {
    envelopes.forEach((element, index) => {
        const keys = Object.keys(element);
        keys.forEach(key => {
            if (key !== 'id') {
                element[key] = null;
            }
        })
        
    });
    return envelopes;
}

module.exports = { envelopes, setValues, budget, searchById, updateDbIndex, deleteDbIndex, deleteAll }