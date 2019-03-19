# Musificate

Musificate generates music out of text input.
It was created to compare different algorithms for procedurally generated music.

## Getting Started

```sh
$ npm install -g musificate
```

```sh
musificate input.txt -o out.mid
```

## Algorithm

The algorithm interprets characters as notes.
Pitch is determined by its keycode (e.g. 'a' ^= 97 ^= C#7), duration by the keycode of the right neighbour (keycode in milliseconds).
Special characters like spaces, commas and colons are interpreted as pauses of varying length.
Uppercase characters mark the beginning of a bass note (same logic as melody notes).
