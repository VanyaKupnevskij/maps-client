import { useState } from 'react';
import styles from './ObjectsPanel.module.scss';
import { useSelector } from 'react-redux';

function ObjectsPanel() {
  const roads = useSelector((state) => state.roads.items);
  // const [roads, setRoads] = useState([{id:1, name:'#1 road'}]);
  const [buildings, setBuildings] = useState([]);
  const [adresses, setAdresses] = useState([]);
  const [currentTab, setCurrentTab] = useState('roads');
  
  function handleTabChange(newState) {
    setCurrentTab(newState);
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
                roads.map(road => <li key={road.id}>{road.name}</li>)
              }
            </ul>
          </div>
      }
      
      {
        currentTab === 'buildings' &&
          <div className={styles.tab_buildings}>
            <ul className={styles.tab_content}>
              <li>#1 house</li>
              <li>#2 house</li>
              <li>#3 house</li>
            </ul>
          </div>
      }

      {
        currentTab === 'adresses' &&
          <div className={styles.tab_adresses}>
            <ul className={styles.tab_content}>
              <li>#1 adress</li>
              <li>#2 adress</li>
              <li>#3 adress</li>
            </ul>
          </div>
      }
    </div>
  );
}

export default ObjectsPanel;
