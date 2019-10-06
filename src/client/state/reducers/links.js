const reducer = (state, action) => {
    if (state === undefined) {
        return {
            serverData: []
        }
    }

    switch (action.type) {
        default: return state;
    }
}

export default reducer;