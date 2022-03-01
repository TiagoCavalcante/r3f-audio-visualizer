import AudioMotionAnalyzer from "audiomotion-analyzer";

function AnaylzerLivestream({ audioRef, data }) {
  return new AudioMotionAnalyzer(undefined, {
    source: audioRef.current,
    mode: 2,
    useCanvas: false,
    start: false,
    onCanvasDraw: (instance) => {
      instance
        .getBars()
        .forEach(({ value }, index) => data[index] = value[0]);
    }
  });
}

export default AnaylzerLivestream;
