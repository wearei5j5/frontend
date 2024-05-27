import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import style from '@/styles/rcSlider.module.css';

export default function RcSlider({ value, onChange }) {
  const createSliderWithTooltip = Slider.createSliderWithTooltip;

  return (
    <div className="px-3">
      <Slider
        min={0}
        max={60}
        value={value}
        onChange={onChange}
        dots={false}
        className={style.customRcSlider}
        marks={{
          0: <div className="text-xs text-g100">0</div>,
          10: <div className="text-xs text-g100">10</div>,
          20: <div className="text-xs text-g100">20</div>,
          30: <div className="text-xs text-g100">30</div>,
          40: <div className="text-xs text-g100">40</div>,
          50: <div className="text-xs text-g100">50</div>,
          60: <div className="text-xs text-g100">60</div>,
        }}
        trackStyle={{ background: '#501EE0', height: 6 }}
        railStyle={{ backgroundColor: '#EEE9FC', height: 6 }}
        handleStyle={{
          height: 14,
          width: 14,
          border: '1px solid rgba(0,0,0,0.1)',
          backgroundColor: 'white',
          opacity: 1,
          '&::active': {},
        }}
        handleRender={(renderProps) => (
          <div {...renderProps.props}>
            <div className="range-value">{value}</div>
          </div>
        )}
      />
    </div>
  );
}
