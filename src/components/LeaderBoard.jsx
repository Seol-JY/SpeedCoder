import localStore from '../utils/localStore'
import { useState, useEffect } from 'react'
export default function LeaderBoard() {
    const [items, setItems] = useState([]);
    useEffect(()=>{
        setItems(localStore.selectData);
    },[])
    return (
        <ul className="sidebarsection-rank">
            {items.map((s, i) => {
                return <li key={i}><div className="sidebarsection-rank-items">
                        <ul>
                            <p><span>#</span>{i+1}</p>
                            <p>CPM:{s.cpm}</p>
                        </ul>
                        <ul>
                            <p>{s.name}</p>
                            <p>{s.message}</p>
                            <p>{s.file}</p>
                        </ul>
                    </div></li>
                    })
            }
        </ul>
    )
}