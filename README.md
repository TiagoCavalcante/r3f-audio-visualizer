# @react-three/fiber equalizer

r3f-equalizer is a 3d audio equalizer for React built using [@react-three/fiber](https://github.com/pmndrs/react-three-fiber).

## Quickstart

```bash
npm install r3f-equalizer
```

r3f-equalizer exports a component `Equalizer` (as default), this component receives the following properties:
- `amplitude` (type: `number`) — the amplitude of the volume. Default: `1`
- `audio` (type: `RefObject<HTMLMediaElement>`) — the HTML element where the audio comes from
- `backgroundColor` (type: `string`) — the color of the background. If it's an empty string, the background will be transparent. Default: `""`
- `cubeSideLength` (type: `number`) — the side length of the "dancing cubes". Default: `0.03`
- `cubeSpacing` (type: `number`) — the spacing between the cubes. Default: `4.5`
- `cameraFov` (type: `number`) — the [FOV](https://en.wikipedia.org/wiki/Field_of_view) of the camera. Default: `45`
- `cameraPosition` (type: `number[3]`) — the position of the camera in the 3d space (which the center is `[0, 0, 0]`). Default: `[0, 5, 15]`
- `gridCols` (type: `number`) — the number of columns of the "dancing cubes" grid. Default: `80`
- `gridRows` (type: `number`) — the number of rows of the "dancing cubes" grid. Default: `12`
- `onCreatedCallback` (type: `function`) — function called after the canvas is created. Default: `() => {}`

## Example
```jsx
import React, { useEffect, useRef } from "react"
import Equalizer from "r3f-equalizer"

function App() {
  const audioRef = useRef()

  return <>
    <audio ref={audioRef} src="..." />

    <Equalizer amplitude={5} audio={audioRef} />
  </>
}
```
