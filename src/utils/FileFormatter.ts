/**
 * File Formatter Utility
 */
export class FileFormatter {
    /**
     * Convert file size into human readable format
     *
     * @example
     * ```ts
     * FileFormatter.formatBytes(1234567); 
     * // "1.18 MB"
     * ```
     *
     * @param bytes - File size in bytes
     * @param options - { decimals, units }
     * @returns formatted string e.g., "2.35 MB"
     */
    static formatBytes(
        bytes: number,
        options: { decimals?: number; units?: string[] } = {}
    ): string {
        const { decimals = 2, units = ["Bytes", "KB", "MB", "GB", "TB"] } = options;

        if (bytes === 0) return `0 ${units[0]}`;
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${units[i]}`;
    }
}