import { useState } from 'react';
import styles from './ObjectsPanel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoad } from '../../slices/roadsSlice'

function ObjectsPanel() {
  const roads = useSelector((state) => state.roads.items);
  const selectedRoadId = useSelector((state) => state.roads.selectedId);
  const [buildings, setBuildings] = useState([]);
  const [adresses, setAdresses] = useState([]);

  const [currentTab, setCurrentTab] = useState('roads');
  const dispatch = useDispatch();
  
  function handleTabChange(newState) {
    setCurrentTab(newState);
  }

  function handleSelectRoad(id) {
    dispatch(selectRoad(id));
  }

  return (
    <div className={styles.root}>
      <nav className={styles.tab_controls}>
        <h3 className={styles.tab_title + (currentTab === 'roads' ? ' ' + styles.tab_title__active : '')}
          onClick={() => handleTabChange('roads')}>
          roads
        </h3>
        <h3 className={styles.tab_title + (currentTab === 'buildings' ? ' ' + styles.tab_title__active : '')}
          onClick={() => handleTabChange('buildings')}>
          buildings
        </h3>
        <h3 className={styles.tab_title + (currentTab === 'adresses' ? ' ' + styles.tab_title__active : '')}
          onClick={() => handleTabChange('adresses')}>
          adresses
        </h3>
      </nav>
      {
        currentTab === 'roads' &&
          <div className={styles.tab_roads}>
            <ul className={styles.tab_content}>
              {
                roads.map(road => 
                <li key={road.id}
                    onClick={() => handleSelectRoad(road.id)}
                    className={styles.list_item + (
                      selectedRoadId === road.id ? " " + styles.list_item__selected : "")}>
                  {road.name}
                </li>)
              }
            </ul>
          </div>
      }
      
      {
        currentTab === 'buildings' &&
          <div className={styles.tab_buildings}>
            <ul className={styles.tab_content}>
              <li className={styles.list_item}>#1 house</li>
              <li className={styles.list_item}>#2 house</li>
              <li className={styles.list_item}>#3 house</li>
            </ul>
          </div>
      }

      {
        currentTab === 'adresses' &&
          <div className={styles.tab_adresses}>
            <ul className={styles.tab_content}>
              <li className={styles.list_item}>#1 adress</li>
              <li className={styles.list_item}>#2 adress</li>
              <li className={styles.list_item}>#3 adress</li>
            </ul>
          </div>
      }
    </div>
  );
}

export default ObjectsPanel;
