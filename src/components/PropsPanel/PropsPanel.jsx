import { useEffect, useState } from 'react';
import styles from './PropsPanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedRoad, updateSelectedRoad } from '../../slices/roadsSlice'

function PropsPanel() {
  const roads = useSelector((state) => state.roads.items);
  const selectedRoadId = useSelector((state) => state.roads.selectedId);
  const selectedRoad = roads.find((road) => road.id === selectedRoadId);
  const [tempNameRoad, setTempNameRoad] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setTempNameRoad(selectedRoad?.name);
  }, [selectedRoad?.name])
  
  function handleChangeName(newName) {
    setTempNameRoad(newName);
  }
  
  function handleDeleteRoad() {
    dispatch(deleteSelectedRoad());
  }
  
  function handleSaveRoad() {
    dispatch(updateSelectedRoad({...selectedRoad, name: tempNameRoad}));
  }
    
  return (
    <div className={styles.root}>
      <h3 className={styles.caption}>Properties</h3>
      {
        selectedRoad ? 
        <div className={styles.list_props}>
          <div className={styles.prop}>
            <h4 className={styles.prop_title}>ID</h4> 
            <span className={styles.prop_data}>{selectedRoadId}</span>
          </div>
          <div className={styles.prop}>
          <h4 className={styles.prop_title}>Name</h4> 
          <input 
            className={styles.prop_input} 
            type="text" 
            value={tempNameRoad} 
            onChange={(e) => handleChangeName(e.target.value)}/>
          </div>

          <div className={styles.buttons}>
            <button className={styles.btn + " " + styles.btn_delete} onClick={() => handleDeleteRoad()}>Delete</button>
            <button className={styles.btn + " " + styles.btn_save} onClick={() => handleSaveRoad()}>Save</button>
          </div>
        </div> :
        <>
          <h4 className={styles.info_not_selected}>Not selected road</h4>
        </>
      }
    </div>
  );
}

export default PropsPanel;
