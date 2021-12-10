// Maybe this will be useful 😉
const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

const defaultFilterFn = () => true
const defaultActionFn = wagon => console.log(`${wagon.emoji} ${wagon.name}`)

export const iterateWagons = (start, actionFn, filterFn) => {}

export const filterOldBreaks = wagon => {
    return true
}
