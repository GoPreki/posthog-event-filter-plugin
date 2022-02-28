import { PluginEvent, PluginMeta } from '@posthog/plugin-scaffold'

interface EventFilterPluginMeta extends PluginMeta {
    config: {
        events: string
    }
    global: {
        events: Array<string>
    }
}

export function setupPlugin({ config, global }: EventFilterPluginMeta): void {
    const eventNames = config.events.split(',')
    if (!config.events || eventNames.some((name: string) => !name)) {
        throw new Error('Event Names can not be empty')
    }
    global.events = eventNames
}

// /* Runs on every event */
export function processEvent(event: PluginEvent, { global }: EventFilterPluginMeta): PluginEvent | null {
    if (global.events.includes(event.event)) {
        return null
    }

    return event
}
