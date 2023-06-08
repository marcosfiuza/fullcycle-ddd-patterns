export type NotificationErrorProps = {
    message: string,
    context: string
};

export default class Notification {
    protected _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    messages(context?: string): string {
        return this._errors
            .filter(error => error.context === context || context === undefined)
            .map(error => error.message)
            .join(", ");
    }

    hasErrors(context?: string): boolean {
        return this._errors
            .filter(error => error.context === context || context === undefined)
            .length > 0;
    }

    getErrors(context?: string): NotificationErrorProps[] {
        return this._errors
            .filter(error => error.context === context || context === undefined);
    }

    clearErrors(context?: string) {
        this._errors = this._errors
            .filter(error => error.context !== context && context !== undefined);
    }
};