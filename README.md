# musificate

A script that generates "music" out of text input.

## Algorithm

The algorithm interprets characters as notes.
Pitch is determined by its keycode (e.g. 'a' ^= 97 ^= C#7), duration by the keycode of the right neighbour (keycode in milliseconds).
Special characters like spaces, commas and colons are interpreted as pauses of varying length.
Uppercase characters mark the beginning of a bass note (same logic as melody notes).
