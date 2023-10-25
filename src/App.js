import { useState, useEffect, useRef } from 'react';
import styles from './App.module.scss';
import ObjectsPanel from './components/ObjectsPanel/ObjectsPanel';
import { useSelector, useDispatch } from 'react-redux';
import { addRoad } from './slices/roadsSlice'
import PropsPanel from './components/PropsPanel/PropsPanel';

function App() {
  const roads = useSelector((state) => state.roads.items);
  const [points, setPoints] = useState([]);
  const refCanvas = useRef();  
  const refParentCanvas = useRef();  
  const [currentPoint, setCurrentPoint] = useState({x: 0, y: 0});
  const [drawing, setDrawing] = useState(false); 
  const dispatch = useDispatch();

  const initCanvas = (canvas) => {
    canvas.width = refParentCanvas.current.offsetWidth;
    canvas.height = refParentCanvas.current.offsetHeight;
  }

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      const { clientX, clientY } = e.nativeEvent;
      setPoints((prevPoints) => [...prevPoints, { x: clientX, y: clientY }]);
      setDrawing(true);
      setCurrentPoint({ x: clientX, y: clientY });
    } else {
      if (points.length > 1) {
        dispatch(addRoad(points));
      }

      setPoints([]);
      setDrawing(false);
      setCurrentPoint({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e.nativeEvent;

    if (drawing) {
      setCurrentPoint({ x: clientX, y: clientY });
    }
  };

  useEffect(() => {    
    initCanvas(refCanvas.current);
  }, [])

  function drawAllRoads(canvas, points) {
    const ctx = canvas.getContext("2d");
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const road of roads) {
      drawRoad(road, ctx);
    }

    drawRoad(
      { 
        points: [...points, { x: currentPoint.x, y: currentPoint.y }] 
      },
      ctx);
  }
  
  function drawRoad(road, ctx) {
    ctx.beginPath();
    for (const point of road.points) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.closePath();
    
  }

  useEffect(() => {
    drawAllRoads(refCanvas.current, points)
  }, [points, currentPoint, roads]);

  return (
    <div className={styles.App}>
      <div className={styles.map} ref={refParentCanvas}>
        <canvas
          ref={refCanvas}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        />
      </div>
      <div className={styles.aside_panel}>
        <PropsPanel/>
        <ObjectsPanel/>
      </div>
    </div>
  );
}

export default App;
