const initialState = 0;

export default function selectedBurger(state = initialState, action) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}

export const getSelectedBurger = (state) => state.selectedBurger;
