import { useState, useEffect, useRef } from 'react';
import styles from './App.module.scss';
import ObjectsPanel from './components/ObjectsPanel/ObjectsPanel';
import { useSelector, useDispatch } from 'react-redux';
import { addRoad, treePoints } from './slices/roadsSlice'
import PropsPanel from './components/PropsPanel/PropsPanel';

const stylesRoad = {
  'level1': { color: "orange", thinkness: 7 },
  'level2': { color: "orange", thinkness: 6 },
  'level3': { color: "orange", thinkness: 5 },
  'level4': { color: "gray", thinkness: 4 },
  'level5': { color: "gray", thinkness: 3 },
  'level6': { color: "#aaa", thinkness: 2 },
  'level7': { color: "#aaa", thinkness: 1 },
}
let points = [];
let currentPoint = {x: 0, y: 0};
let nearestPoints = [null, null];

function App() {
  const roads = useSelector((state) => state.roads.items);
  const selectedRoadId = useSelector((state) => state.roads.selectedId);
  const refCanvas = useRef();  
  const refParentCanvas = useRef();  
  const [drawing, setDrawing] = useState(false); 
  const dispatch = useDispatch();

  const initCanvas = (canvas) => {
    canvas.width = refParentCanvas.current.offsetWidth;
    canvas.height = refParentCanvas.current.offsetHeight;
  }

  const handleMouseDown = (e) => {
    if (e.button === 0 && e.ctrlKey) {
      const { clientX, clientY } = e.nativeEvent;
      const nearest = treePoints.nearest({ x: clientX, y: clientY }, 2, 800);

      if (nearest[0]) {
        nearestPoints[0] = nearest[0][0];
      } else {
        nearestPoints[0] = null;
      }
      if (nearest[1]) {
        nearestPoints[1] = nearest[1][0];
      } else {
        nearestPoints[1] = null;
      }
    } else {
      if (e.button === 0) {
        const { clientX, clientY } = e.nativeEvent;
        points.push({ x: clientX, y: clientY });
        setDrawing(true);
        currentPoint = { x: clientX, y: clientY };
      } else {
        if (points.length > 1) {
          dispatch(addRoad(points));
        }

        points = [];
        setDrawing(false);
        currentPoint = { x: 0, y: 0 };
      }
    }

    drawAllRoads(refCanvas.current, points);
  };
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e.nativeEvent;
    
    if (drawing) {
      currentPoint = { x: clientX, y: clientY };
      
      drawAllRoads(refCanvas.current, points);
    }
  };

  useEffect(() => {    
    initCanvas(refCanvas.current);
  }, [])

  function drawAllRoads(canvas, points) {
    const ctx = canvas.getContext("2d");
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const road of roads) {
      drawRoad(road, ctx, road.id === selectedRoadId);
    }

    drawRoad(
      { 
        points: [...points, { x: currentPoint.x, y: currentPoint.y }],
        rate: 'level7'
      },
      ctx);
  }
  
  function drawRoad(road, ctx, isSelected = false) {
    ctx.beginPath();
    for (const point of road.points) {
      ctx.lineTo(point.x, point.y);
    }
    
    if (isSelected) {
      ctx.strokeStyle = 'green';
      ctx.lineWidth = stylesRoad[road.rate].thinkness + 1;
    } else {
      ctx.strokeStyle = stylesRoad[road.rate].color;
      ctx.lineWidth = stylesRoad[road.rate].thinkness;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(nearestPoints[0]?.x, nearestPoints[0]?.y, 5, 0, 2 * Math.PI);
    ctx.arc(nearestPoints[1]?.x, nearestPoints[1]?.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = nearestPoints[0] && nearestPoints[1] ? "blue" : "red";
    ctx.fill();
  }

  useEffect(() => {
    drawAllRoads(refCanvas.current, points);
  }, [roads, selectedRoadId]);

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
