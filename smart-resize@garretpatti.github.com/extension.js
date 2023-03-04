'use strict';
// This is a handy import we'll use to grab our extension's object
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Meta = imports.gi.Meta;
const Main = imports.ui.main;

class Extension {
    constructor() {
    }
    _window_grab_end(meta_display, meta_window, meta_grab_op, gpointer) {
        this._auto_move_resize(meta_window);
    }
    _auto_move_resize(meta_window) {
        let window_rec = meta_window.get_frame_rect();
        let display_rec = Main.layoutManager.getWorkAreaForMonitor(meta_window.get_monitor());
        let hor_resize = this.settings.get_boolean('horizontal-resize');
        let ver_resize = this.settings.get_boolean('vertical-resize');
        let snap_n_place = this.settings.get_boolean('snap-in-place');

        if (hor_resize && window_rec.width > display_rec.width) {
            let left_overlap = window_rec.x - display_rec.x;
            let right_overlap = left_overlap + window_rec.width; 
            if(snap_n_place) {
                window_rec.x = display_rec.x;
            } else if (right_overlap > left_overlap) {
                window_rec.x = window_rec.x + (window_rec.width - display_rec.width);
            }
            window_rec.width = display_rec.width;
        }
        if (ver_resize && window_rec.height > display_rec.height) {
            let top_overlap = window_rec.y - display_rec.y;
            let bottom_overlap = top_overlap + window_rec.height; 
            if(snap_n_place) {
                window_rec.y = display_rec.y;
            } else if (top_overlap > bottom_overlap) {
                window_rec.y = window_rec.y + (window_rec.height - display_rec.height);
            }
            window_rec.height = display_rec.height;
        }
        meta_window.move_resize_frame(false, window_rec.x, window_rec.y, 
            window_rec.width, window_rec.height);
    }
    enable() {
        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.smart-resize')
        this._on_window_grab_end = global.display.connect('grab-op-end',
         this._window_grab_end.bind(this));
    }
    disable() {
        global.display.disconnect(this._on_window_grab_end);
    }   
}
function init(meta) {
    return new Extension();
}