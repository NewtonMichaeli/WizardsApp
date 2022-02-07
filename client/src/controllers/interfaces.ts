// Interfaces for controllers (index.ts)


export interface getStyles__Props {
    (
        file: {readonly [key: string]: string},
        styles: string
    ): string
}