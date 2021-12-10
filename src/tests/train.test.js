import { locomotive } from '../data/train.js'
import { iterateWagons, filterOldBrakes } from '../utils/train.js'

test(`'filterOldBrakes' should return true when brake revision is older than 1 year`, async () => {
    const wagon = {
        name: 'W-10396',
        lastBrakeRevision: '2020-11-30',
        next: null,
    }
    expect(filterOldBrakes(wagon)).toBe(true)
})

test(`'filterOldBrakes' should return false when brake revision is not older than 1 year`, async () => {
    const wagon = {
        name: 'W-10396',
        lastBrakeRevision: '2021-12-01',
        next: null,
    }
    expect(filterOldBrakes(wagon)).toBe(false)
})

test(`'iterateWagons' without filter function should execute the action function for all items`, async () => {
    const wagon3 = { name: 'Wagon 3', next: null }
    const wagon2 = { name: 'Wagon 2', next: wagon3 }
    const wagon1 = { name: 'Wagon 1', next: wagon2 }
    const locomotive = { name: 'Locomotive', isLocomotive: true, next: wagon1 }

    const trainArray = []
    iterateWagons(locomotive, wagon => trainArray.push(wagon))
    expect(trainArray.length).toBe(4)
})

test(`'iterateWagons' with filterOldBrakes should execute the action only for wagons where brake revision is older than 1 year`, async () => {
    const wagon4 = {
        name: 'Wagon 4',
        lastBrakeRevision: '2016-12-30',
        next: null,
    }
    const wagon3 = {
        name: 'Wagon 3',
        lastBrakeRevision: '2021-12-01',
        next: wagon4,
    }
    const wagon2 = {
        name: 'Wagon 2',
        lastBrakeRevision: '2015-12-31',
        next: wagon3,
    }
    const wagon1 = {
        name: 'Wagon 1',
        lastBrakeRevision: '2021-12-02',
        next: wagon2,
    }
    const locomotive = { name: 'Locomotive', isLocomotive: true, next: wagon1 }

    const trainArray = []
    iterateWagons(locomotive, wagon => trainArray.push(wagon), filterOldBrakes)
    expect(trainArray.length).toBe(2)
    expect(trainArray.map(w => w.name)).toStrictEqual(['Wagon 2', 'Wagon 4'])
})
