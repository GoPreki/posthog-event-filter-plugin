import { PluginEvent, PluginMeta } from '@posthog/plugin-scaffold'

export function setupPlugin({ config, global }: PluginMeta): void {
    const eventNames = config.events.split(",")
    if (!config.events || eventNames.some((name: string) => !name)) {
        throw new Error('Event Names can not be empty')
    }
    global.events = eventNames
}

// /* Runs on every event */
export function processEvent(event: PluginEvent, { global }: PluginMeta): PluginEvent | null {
    if (global.events.includes(event.event)) {
        return null;
    }

    return event;
}