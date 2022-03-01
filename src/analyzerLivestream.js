import AudioMotionAnalyzer from "audiomotion-analyzer";

function AnaylzerLivestream({ audioRef, data }) {
  return new AudioMotionAnalyzer(null, {
    source: audioRef.current,
    mode: 2,
    useCanvas: false,
    volume: 1,
    onCanvasDraw: (instance) => {
      instance
        .getBars()
        .forEach(({ value }, index) => data[index] = value[0]);
    }
  });
}

export default AnaylzerLivestream;
