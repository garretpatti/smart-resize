'use strict';

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function fillPreferencesWindow(window) {
    const settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.smart-resize');
    
    const page = new Adw.PreferencesPage();
    const gResize = new Adw.PreferencesGroup();
    gResize.set_title("Resizing")
    page.add(gResize);

    /*
     * Resize windows horizontally row
    */
    const rHorResize = new Adw.ActionRow({ title: 'Resize windows horizontally' });
    gResize.add(rHorResize);

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

    rHorResize.add_suffix(tHResize);
    rHorResize.activatable_widget = tHResize;

    /*
     * Resize windows vertically row
    */
    const rVerResize = new Adw.ActionRow({ title: 'Resize windows Vertically' });
    gResize.add(rVerResize);

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


    window.add(page);
}