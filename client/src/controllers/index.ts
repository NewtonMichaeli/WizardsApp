// Controllers file
// Interfaces for Controllers:
import { getStyles__Props } from "./interfaces"


// Gets multiple styles from a specified styles module
// Input: styles file, styles seperated by ' '
// Output: string containing styles extracted from <file>
export const getStyles: getStyles__Props = (file, styles) =>
    styles.split(' ').map(s => file[s]).join(' ')


// export const send = undefined;