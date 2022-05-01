export class TimeHelper {
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
