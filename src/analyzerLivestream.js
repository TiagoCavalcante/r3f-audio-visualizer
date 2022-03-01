import AudioMotionAnalyzer from "audiomotion-analyzer";

function AnaylzerLivestream({ audioRef, setData }) {
  return new AudioMotionAnalyzer(null, {
    source: audioRef.current,
    mode: 2,
    useCanvas: false, // don't use the canvas
    volume: 1,
    onCanvasDraw: ({ getBars }) => setData(
      getBars().map(({ value }) => value[0])
    )
  });
}

export default AnaylzerLivestream;
