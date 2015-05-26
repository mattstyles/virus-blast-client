
import keyMirror from 'keymirror'

export default keyMirror({
    // Triggered when a new files object is returned from server
    FILES: null,

    // Triggered to request a new file path
    PATH: null,

    // Triggered to request the home path
    HOME: null,

    SAVE: null,
    LOAD: null
})
