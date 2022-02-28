const { createEvent, createIdentify, getMeta, resetMeta, clone } = require('@posthog/plugin-scaffold/test/utils')

const { processEvent, setupPlugin } = require('..')

beforeEach(() => {
    resetMeta({
        config: {
            events: '$autocapture,CUSTOM_CLICK',
        },
        global: {
            events: ['$autocapture', 'CUSTOM_CLICK'],
        },
    })
})

test('processEvent filters events as wanted', async () => {
    // create a random event
    const event = createEvent({ event: '$autocapture', properties: { amount: '20', currency: 'USD' } })

    // must clone the event since `processEvent` will mutate it otherwise
    const processedEvent = await processEvent(clone(event), getMeta())
    expect(processedEvent).toBeNull()

    // create an event that should NOT be filtered
    event.event = 'random'

    const processedEvent1 = await processEvent(clone(event), getMeta())
    expect(processedEvent1).toEqual(event)
})

test('processEvent does not crash with identify', async () => {
    // create a random event
    const event0 = createIdentify()
    // must clone the event since `processEvent` will mutate it otherwise
    const event = await processEvent(clone(event0), getMeta())
    expect(event).toEqual(event0)
})

test('setupPlugin works as expected', async () => {
    let meta = {
        config: {
            events: '$autocapture,CUSTOM_CLICK',
        },
        global: {},
    }

    await setupPlugin(meta)
    expect(meta.global.events).toEqual(['$autocapture', 'CUSTOM_CLICK'])
})
