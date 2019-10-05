const reducer = (state, action) => {
    if (state === undefined) {
        return {
            posts: []
        }
    }

    switch (action.type) {
        default: return state;
    }
}

export default reducer;