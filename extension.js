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
    /**
     * This function is called when your extension is enabled, which could be
     * done in GNOME Extensions, when you log in or when the screen is unlocked.
     *
     * This is when you should setup any UI for your extension, change existing
     * widgets, connect signals or modify GNOME Shell's behaviour.
     */
    enable() {
        log(`enabling ${Me.metadata.name}`);
        this._on_window_grab_end = global.display.connect('grab-op-end', this.window_grab_end.bind(this));
    }
    

    /**
     * This function is called when your extension is uninstalled, disabled in
     * GNOME Extensions, when you log out or when the screen locks.
     *
     * Anything you created, modifed or setup in enable() MUST be undone here.
     * Not doing so is the most common reason extensions are rejected in review!
     */
    disable() {
        log(`disabling ${Me.metadata.name}`);
        global.display.disconnect(this._on_window_grab_end);
    }   
}


/**
 * This function is called once when your extension is loaded, not enabled. This
 * is a good time to setup translations or anything else you only do once.
 *
 * You MUST NOT make any changes to GNOME Shell, connect any signals or add any
 * MainLoop sources here.
 *
 * @param {ExtensionMeta} meta - An extension meta object, described below.
 * @returns {Object} an object with enable() and disable() methods
 */
function init(meta) {
    log(`initializing ${meta.metadata.name}`);
    
    return new Extension();
}
