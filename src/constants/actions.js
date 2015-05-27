
import keyMirror from 'keymirror'

export default keyMirror({
    // Triggered when a new files object is returned from server
    FILES: null,

    // Triggered to request a new file path
    PATH: null,

    // Triggered to request the home path
    HOME: null,

    // Triggered to save state
    SAVE: null,

    // Triggered to load state
    LOAD: null,

    // Triggered to award points
    POINTS: null,

    // Triggered when a file corrupts
    CORRUPT: null
})
