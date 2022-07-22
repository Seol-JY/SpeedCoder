import fetcher from '../utils/fetcher';
import { useState, useEffect, useCallback } from 'react'
import { useInView } from "react-intersection-observer"
import LeaderBoardContents from './LeaderBoardContents';

const log = console.log;

export default function LeaderBoard() {
    const [prev, prevInView] = useInView();  // 무한 스크롤용 ref - 이전
    const [next, nextInView] = useInView();  // 무한 스크롤용 ref - 이후
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([]);

    const getItems = useCallback( async () => {
        if(page<=1) {setPage(1)}   // page 0이하로 내려가는거 막음
        setLoading(true);
        console.log("페이지"+page);
        //localStore.selectData(page)
        fetcher.load(page).then((data)=>{
            setItems(data);
            setLoading(false);
        })
      }, [page])

    useEffect(() => {
        getItems()
    }, [getItems])
    
    useEffect(()=>{
        if ( prevInView && !loading) {
            
            console.log("prev");
            setPage(prevState => prevState - 1);
          }
    },[prevInView])

    useEffect(()=>{
        if (nextInView && !loading) {
            console.log("next");
            setPage(prevState => prevState + 1)
          }
    },[nextInView])

    return (
        <ul className="sidebarsection-rank">
            {
                items.map((s, i) => {
                    if(i===3) {
                        return<li key={s._id} ref={prev}><LeaderBoardContents s={s}/></li>  
                    }
                    if(i===items.length-1) {
                        return<li key={s._id} ref={next}><LeaderBoardContents s={s}/></li>  
                    }
                    return <li key={s._id}><LeaderBoardContents s={s}/></li>
                })
            }
        </ul>
    )
}