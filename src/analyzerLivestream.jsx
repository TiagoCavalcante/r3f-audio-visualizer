import AudioMotionAnalyzer from "audiomotion-analyzer";
import useStore from './store';

function AnaylzerLivestream() {
  return new AudioMotionAnalyzer(undefined, {
    mode: 2,
    useCanvas: false,
    start: false,
    onCanvasDraw: (instance) => {
      useStore.setState({
        data: instance.getBars().map(({ value }) => value[0])
      });
    }
  });
}

export default AnaylzerLivestream;
