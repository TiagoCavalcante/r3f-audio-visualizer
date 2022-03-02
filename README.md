# @react-three/fiber equalizer

r3f-equalizer is a 3d audio equalizer for React built using [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

## Quickstart

```bash
npm install r3f-equalizer
```

r3f-equalizer exports a component `Equalizer` (as default) and a function `AnaylzerLivestream`, an wrapper for [audiomotion-analyzer](https://github.com/hvianna/audioMotion-analyzer).

The `Equazlizer` component receives the following properties:
- `amplitude` (type: `number`) — the amplitude of the volume. Default: `1`
- `backgroundColor` (type: `string`) — the color of the background. If it's an empty string, the background will be transparent. Default: `""`
- `cubeSideLength` (type: `number`) — the side length of the "dancing cubes". Default: `0.03`
- `cubeSpacingScalar` (type: `number`) — the spacing between the cubes. Default: `4.5`
- `cameraFov` (type: `number`) — the [FOV](https://en.wikipedia.org/wiki/Field_of_view) of the camera. Default: `45`
- `cameraPosition` (type: `number[3]`) — the position of the camera in the 3d space (which the center is `[0, 0, 0]`). Default: `[0, 5, 15]`
- `gridCols` (type: `number`) — the number of columns of the "dancing cubes" grid. Default: `80`
- `gridRows` (type: `number`) — the number of rows of the "dancing cubes" grid. Default: `12`
- `onCreatedCallback` (type: `function`) — function called after the canvas is created. Default: `() => {}`

Consults the [documentation of audiomotion-analizer](https://github.com/hvianna/audioMotion-analyzer#constructor) for other methods, but the main methods of `AnaylzerLivestream` are the following:
- `connectInput(HTMLAudioElement)` (type: `audioListener`) — starts "hearing" the audio element, returns an object used in disconnection
- `disconnectOutput([audioListener])` (type: `void`) — stops "hearing" all audio elements if no argument is passed, otherwise stops "hearing" only the audio from `audioListener`
- `toggleAnalyzer([boolean])` (type: `void`) — if `true` is passed as a parameter starts the analyzer, if `false` is passed, stops the analyzer, othewise toggle the analyzer's current state

## Example
```jsx
import React, { useEffect, useRef } from "react"
import Equalizer, { AnaylzerLivestream } from "r3f-equalizer"

function App() {
  // audiomotion-analyzer mutes the audio element it is "hearing"
  const audioRef1 = useRef()
  const audioRef2 = useRef()

  useEffect(() => {
    if (audioRef2.current) {
      AnaylzerLivestream().connectInput(audioRef2.current)
    }
  }, [audioRef2.current])

  return <>
    <audio ref={audioRef1} src="..." />
    <audio ref={audioRef2} src="..." />

    <Equalizer amplitude={5} />
  </>
}
```
