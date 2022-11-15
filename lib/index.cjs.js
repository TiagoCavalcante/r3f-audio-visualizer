'use strict';

var fiber = require('@react-three/fiber');
var postprocessing = require('@react-three/postprocessing');
var PropTypes = require('prop-types');
var React = require('react');
var AudioMotionAnalyzer = require('audiomotion-analyzer');
var three = require('three');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var AudioMotionAnalyzer__default = /*#__PURE__*/_interopDefaultLegacy(AudioMotionAnalyzer);

class Lut {

 	constructor( colormap, count = 32 ) {

		this.isLut = true;

		this.lut = [];
		this.map = [];
		this.n = 0;
		this.minV = 0;
		this.maxV = 1;

		this.setColorMap( colormap, count );

	}

	set( value ) {

		if ( value.isLut === true ) {

			this.copy( value );

		}

		return this;

	}

	setMin( min ) {

		this.minV = min;

		return this;

	}

	setMax( max ) {

		this.maxV = max;

		return this;

	}

	setColorMap( colormap, count = 32 ) {

		this.map = ColorMapKeywords[ colormap ] || ColorMapKeywords.rainbow;
		this.n = count;

		const step = 1.0 / this.n;
		const minColor = new three.Color();
		const maxColor = new three.Color();

		this.lut.length = 0;

		// sample at 0

		this.lut.push( new three.Color( this.map[ 0 ][ 1 ] ) );

		// sample at 1/n, ..., (n-1)/n

		for ( let i = 1; i < count; i ++ ) {

			const alpha = i * step;

			for ( let j = 0; j < this.map.length - 1; j ++ ) {

				if ( alpha > this.map[ j ][ 0 ] && alpha <= this.map[ j + 1 ][ 0 ] ) {

					const min = this.map[ j ][ 0 ];
					const max = this.map[ j + 1 ][ 0 ];

					minColor.set( this.map[ j ][ 1 ] );
					maxColor.set( this.map[ j + 1 ][ 1 ] );

					const color = new three.Color().lerpColors( minColor, maxColor, ( alpha - min ) / ( max - min ) );

					this.lut.push( color );

				}

			}

		}

		// sample at 1

		this.lut.push( new three.Color( this.map[ this.map.length - 1 ][ 1 ] ) );

		return this;

	}

	copy( lut ) {

		this.lut = lut.lut;
		this.map = lut.map;
		this.n = lut.n;
		this.minV = lut.minV;
		this.maxV = lut.maxV;

		return this;

	}

	getColor( alpha ) {

		alpha = three.MathUtils.clamp( alpha, this.minV, this.maxV );

		alpha = ( alpha - this.minV ) / ( this.maxV - this.minV );

		const colorPosition = Math.round( alpha * this.n );

		return this.lut[ colorPosition ];

	}

	addColorMap( name, arrayOfColors ) {

		ColorMapKeywords[ name ] = arrayOfColors;

		return this;

	}

	createCanvas() {

		const canvas = document.createElement( 'canvas' );
		canvas.width = 1;
		canvas.height = this.n;

		this.updateCanvas( canvas );

		return canvas;

	}

	updateCanvas( canvas ) {

		const ctx = canvas.getContext( '2d', { alpha: false } );

		const imageData = ctx.getImageData( 0, 0, 1, this.n );

		const data = imageData.data;

		let k = 0;

		const step = 1.0 / this.n;

		const minColor = new three.Color();
		const maxColor = new three.Color();
		const finalColor = new three.Color();

		for ( let i = 1; i >= 0; i -= step ) {

			for ( let j = this.map.length - 1; j >= 0; j -- ) {

				if ( i < this.map[ j ][ 0 ] && i >= this.map[ j - 1 ][ 0 ] ) {

					const min = this.map[ j - 1 ][ 0 ];
					const max = this.map[ j ][ 0 ];

					minColor.set( this.map[ j - 1 ][ 1 ] );
					maxColor.set( this.map[ j ][ 1 ] );

					finalColor.lerpColors( minColor, maxColor, ( i - min ) / ( max - min ) );

					data[ k * 4 ] = Math.round( finalColor.r * 255 );
					data[ k * 4 + 1 ] = Math.round( finalColor.g * 255 );
					data[ k * 4 + 2 ] = Math.round( finalColor.b * 255 );
					data[ k * 4 + 3 ] = 255;

					k += 1;

				}

			}

		}

		ctx.putImageData( imageData, 0, 0 );

		return canvas;

	}

}

const ColorMapKeywords = {

	'rainbow': [[ 0.0, 0x0000FF ], [ 0.2, 0x00FFFF ], [ 0.5, 0x00FF00 ], [ 0.8, 0xFFFF00 ], [ 1.0, 0xFF0000 ]],
	'cooltowarm': [[ 0.0, 0x3C4EC2 ], [ 0.2, 0x9BBCFF ], [ 0.5, 0xDCDCDC ], [ 0.8, 0xF6A385 ], [ 1.0, 0xB40426 ]],
	'blackbody': [[ 0.0, 0x000000 ], [ 0.2, 0x780000 ], [ 0.5, 0xE63200 ], [ 0.8, 0xFFFF00 ], [ 1.0, 0xFFFFFF ]],
	'grayscale': [[ 0.0, 0x000000 ], [ 0.2, 0x404040 ], [ 0.5, 0x7F7F80 ], [ 0.8, 0xBFBFBF ], [ 1.0, 0xFFFFFF ]]

};

function getValueForNormalizedCoord(data, normalizedCoordinate) {
    // Interpolate from the bar values based on the normalized coordinate
    var rawIndex = normalizedCoordinate * (data.length - 1);
    var valueBelow = data[Math.floor(rawIndex)];
    var valueAbove = data[Math.ceil(rawIndex)];
    return valueBelow + (rawIndex % 1) * (valueAbove - valueBelow);
}
function DataReactiveGrid(_a) {
    var amplitude = _a.amplitude, audio = _a.audio, cubeSideLength = _a.cubeSideLength, cubeSpacing = _a.cubeSpacing, gridCols = _a.gridCols, gridRows = _a.gridRows;
    var mesh = React.useRef();
    var matrix = React.useMemo(function () { return new three.Matrix4(); }, []);
    var data = React.useMemo(function () { return new Array(121).fill(0); }, []);
    var analyzer = React.useMemo(function () {
        if (!data)
            return;
        return new AudioMotionAnalyzer__default["default"](undefined, {
            mode: 2,
            useCanvas: false,
            start: true,
            onCanvasDraw: function (instance) {
                var bars = instance.getBars();
                bars.forEach(function (_a, index) {
                    var value = _a.value;
                    data[index] = value[0];
                });
            }
        });
    }, [data]);
    React.useEffect(function () {
        if (!analyzer)
            return;
        if (!audio.current)
            return;
        analyzer.disconnectInput();
        analyzer.connectInput(audio.current);
    }, [analyzer, audio]);
    React.useEffect(function () {
        var lut = new Lut("cooltowarm");
        var normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
        for (var index = 0, row = 0; row < gridCols; row++) {
            for (var col = 0; col < gridRows; col++) {
                var normGridX = row / gridCols;
                var normGridY = col / gridRows;
                var normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
                mesh.current.setColorAt(index++, lut.getColor(normRadialOffset));
            }
        }
        mesh.current.instanceColor.needsUpdate = true;
    }, [gridRows, gridCols]);
    fiber.useFrame(function () {
        var gridSizeX = gridRows * cubeSpacing * cubeSideLength;
        var gridSizeY = gridRows * cubeSpacing * cubeSideLength;
        var normQuadrantHypotenuse = Math.hypot(0.5, 0.5);
        for (var index = 0, row = 0; row < gridRows; row++) {
            for (var col = 0; col < gridCols; col++) {
                var normGridX = row / gridRows;
                var normGridY = col / gridCols;
                var normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
                mesh.current.setMatrixAt(index++, matrix.setPosition(gridSizeX * (normGridX - 0.5), gridSizeY * (normGridY - 0.5), amplitude * getValueForNormalizedCoord(data, normRadialOffset)));
            }
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });
    return (React__default["default"].createElement("instancedMesh", { ref: mesh, castShadow: true, receiveShadow: true, args: [null, null, gridRows * gridCols] },
        React__default["default"].createElement("boxGeometry", { args: [cubeSideLength, cubeSideLength, cubeSideLength] }),
        React__default["default"].createElement("meshBasicMaterial", null)));
}
DataReactiveGrid.propTypes = {
    amplitude: PropTypes__default["default"].number.isRequired,
    audio: PropTypes__default["default"].object.isRequired,
    cubeSideLength: PropTypes__default["default"].number.isRequired,
    cubeSpacing: PropTypes__default["default"].number.isRequired,
    gridCols: PropTypes__default["default"].number.isRequired,
    gridRows: PropTypes__default["default"].number.isRequired
};

function Equalizer(_a) {
    var _b = _a.amplitude, amplitude = _b === void 0 ? 1 : _b, audio = _a.audio, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? "" : _c, _d = _a.cubeSideLength, cubeSideLength = _d === void 0 ? 0.03 : _d, _e = _a.cubeSpacing, cubeSpacing = _e === void 0 ? 4.5 : _e, _f = _a.cameraFov, cameraFov = _f === void 0 ? 45 : _f, _g = _a.cameraPosition, cameraPosition = _g === void 0 ? [0, 5, 15] : _g, _h = _a.gridCols, gridCols = _h === void 0 ? 80 : _h, _j = _a.gridRows, gridRows = _j === void 0 ? 12 : _j, _k = _a.loadingFallback, loadingFallback = _k === void 0 ? React__default["default"].createElement(React__default["default"].Fragment, null) : _k, _l = _a.onCreatedCallback, onCreatedCallback = _l === void 0 ? function () { } : _l;
    return (React__default["default"].createElement(React.Suspense, { fallback: loadingFallback },
        React__default["default"].createElement(fiber.Canvas, { camera: {
                fov: cameraFov,
                position: cameraPosition,
                up: [0, 0, 1]
            }, onCreated: onCreatedCallback },
            backgroundColor !== ""
                ? React__default["default"].createElement("color", { attach: "background", args: [backgroundColor] })
                : null,
            React__default["default"].createElement(DataReactiveGrid, { amplitude: amplitude, audio: audio, cubeSideLength: cubeSideLength, cubeSpacing: cubeSpacing, gridCols: gridCols, gridRows: gridRows }),
            React__default["default"].createElement(postprocessing.EffectComposer, null,
                React__default["default"].createElement(postprocessing.Bloom, { kernelSize: 3, luminanceThreshold: 0, luminanceSmoothing: 0.4, intensity: 0.3 })))));
}
Equalizer.propTypes = {
    amplitude: PropTypes__default["default"].number,
    audio: PropTypes__default["default"].object.isRequired,
    backgroundColor: PropTypes__default["default"].string,
    cubeSideLength: PropTypes__default["default"].number,
    cubeSpacing: PropTypes__default["default"].number,
    cameraFov: PropTypes__default["default"].number,
    cameraPosition: PropTypes__default["default"].array,
    gridCols: PropTypes__default["default"].number,
    gridRows: PropTypes__default["default"].number,
    loadingFallback: PropTypes__default["default"].element,
    onCreatedCallback: PropTypes__default["default"].func
};

module.exports = Equalizer;
