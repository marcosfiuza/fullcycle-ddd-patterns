export type NotificationError = {
    message: string,
    context: string
};

export default class Notification {
    private errors: NotificationError[] = [];

    addError(error: NotificationError) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        return this.errors
            .filter(error => error.context === context || context === undefined)
            .map(error => error.message)
            .join(", ");
    }
};