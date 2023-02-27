'use strict';
// This is a handy import we'll use to grab our extension's object
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Meta = imports.gi.Meta;
const Main = imports.ui.main;

class Extension {
    constructor() {
    }
    window_grab_end(meta_display, meta_window, meta_grab_op, gpointer) {
        let window_rec = meta_window.get_frame_rect();
        let display_rec = Main.layoutManager.getWorkAreaForMonitor(meta_window.get_monitor());
        if (window_rec.width > display_rec.width) {
            meta_window.move_resize_frame(false, display_rec.x, window_rec.y, 
                display_rec.width, window_rec.height);
            window_rec.width = display_rec.width;
            window_rec.x = display_rec.x;
        }
        if (window_rec.height > display_rec.height) {
            meta_window.move_resize_frame(false, window_rec.x, display_rec.y,
                window_rec.width, display_rec.height);
        }
        
    }
    enable() {
        log(`enabling ${Me.metadata.name}`);
        this._on_window_grab_end = global.display.connect('grab-op-end',
         this.window_grab_end.bind(this));
    }
    disable() {
        log(`disabling ${Me.metadata.name}`);
        global.display.disconnect(this._on_window_grab_end);
    }   
}
function init(meta) {
    log(`initializing ${meta.metadata.name}`);
    
    return new Extension();
}
