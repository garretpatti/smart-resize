'use strict';

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function fillPreferencesWindow(window) {
    // Use the same GSettings schema as in `extension.js`
    const settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.smart-resize');
    
    // Create a preferences page and group
    const page = new Adw.PreferencesPage();
    const gResize = new Adw.PreferencesGroup();
    gResize.set_title("Resizing")
    page.add(gResize);

    // Create a new preferences row
    const rHorResize = new Adw.ActionRow({ title: 'Resize windows horizontally' });
    gResize.add(rHorResize);

    // Create the switch and bind its value to the `show-indicator` key
    const tHResize = new Gtk.Switch({
        active: settings.get_boolean ('horizontal-resize'),
        valign: Gtk.Align.CENTER,
    });
    settings.bind(
        'horizontal-resize',
        tHResize,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Add the switch to the row
    rHorResize.add_suffix(tHResize);
    rHorResize.activatable_widget = tHResize;

    // Create a new preferences row
    const rVerResize = new Adw.ActionRow({ title: 'Resize windows Vertically' });
    gResize.add(rVerResize);

    // Create the switch and bind its value to the `show-indicator` key
    const tVResize = new Gtk.Switch({
        active: settings.get_boolean ('vertical-resize'),
        valign: Gtk.Align.CENTER,
    });
    settings.bind(
        'vertical-resize',
        tVResize,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Add the switch to the row
    rVerResize.add_suffix(tVResize);
    rVerResize.activatable_widget = tVResize;

    const gSnap = new Adw.PreferencesGroup();
    page.add(gSnap);

    const rSnap = new Adw.ActionRow({ title: "Snap windows in place after resize"});
    gSnap.add(rSnap);

    const tSnap = new Gtk.Switch({
        active: settings.get_boolean('snap-in-place'),
        valign: Gtk.Align.CENTER,
    });
    settings.bind(
        'snap-in-place',
        tSnap,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    rSnap.add_suffix(tSnap);
    rSnap.activatable_widget = tSnap;


    // Add our page to the window
    window.add(page);
}