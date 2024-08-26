import { css } from '@emotion/css';
import { FiMic, FiMicOff } from "react-icons/fi";
import { useState } from 'react';

import Common from "@style/common";
import HeaderDummy from "@components/HeaderDummy";
import { VideoComponent } from './VideoComponent'; 
import { ScriptComponent } from './ScriptComponent'; 
import NavBarDummy from '@components/NavBarDummy';

const readPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 전체 페이지 스크롤을 막고, 가사 부분만 스크롤 */
`;

const videoContainerStyle = css`
  position: sticky;
  top: 0; /* 상단에 고정 */
  width: 100%;
  z-index: 100; /* 다른 요소보다 위에 있도록 설정 */
  background-color: white; /* 비디오 뒤 배경 설정 */
`;

const scriptContainerStyle = css`
  flex: 1;
  width: 100%;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  padding: 1em;
`;

export const ReadPage = () => {
  const videoUrl = "/springdays.mp4";
  const lyricsData = [
    {
      korean: "보고 싶다, 이렇게 말하니까 더 보고 싶다",
      english: "I miss you, saying this makes me miss you more",
      romanized: "Bogo sipda, ireoke malhanikka deo bogo sipda"
    },
    {
      korean: "너희 사진을 보고 있어도 보고 싶다",
      english: "Even while looking at your photo, I miss you",
      romanized: "Neohui sajineul bogo isseodo bogo sipda"
    },
    {
      korean: "너무 야속한 시간 나는 우리가 밉다",
      english: "This cruel time, I hate us",
      romanized: "Neomu yasokan sigan naneun uriga mipda"
    },
    {
      korean: "이젠 얼굴 한 번 보는 것 조차 힘들어진 우리가",
      english: "Now, it's hard for us to even see each other once",
      romanized: "Ijen eolgul han beon boneun geot jocha himdeureojin uriga"
    },
    {
      korean: "여긴 온통 겨울 뿐이야 8월에도 겨울이 와",
      english: "Here, it's all winter, even in August, winter comes",
      romanized: "Yeogin ontong gyeoul ppuniya 8woledo gyeouri wa"
    },
    {
      korean: "마음은 시간을 달려가네 홀로 남은 설국열차",
      english: "My heart is running through time, the Snowpiercer left alone",
      romanized: "Maeumeun siganeul dallyeogane hollo nameun seolgukyeolcha"
    },
    {
      korean: "니 손 잡고 지구 반대편까지 가 이 겨울을 끝내고파",
      english: "I want to hold your hand and go to the other side of the earth, to end this winter",
      romanized: "Ni son japgo jigu bandepyeonkkaji ga i gyeoureul kkeunnaegopa"
    },
    {
      korean: "그리움들이 얼마나 눈처럼 내려야 그 봄날이 올까, friend?",
      english: "How much more snow must fall down for that spring day to come, friend?",
      romanized: "Geuriumdeuri eolmana nuncheoreom naeryeoya geu bomnari olkka, friend?"
    },
    {
      korean: "허공을 떠도는 작은",
      english: "Like small pieces floating in the air",
      romanized: "Heogongeul tteodoneun jageun"
    },
    {
      korean: "먼지처럼, 작은 먼지처럼",
      english: "Like dust, like small dust",
      romanized: "Meonjicheoreom, jageun meonjicheoreom"
    },
    {
      korean: "날리는 눈이 나라면",
      english: "If I were the snow flying",
      romanized: "Nallineun nuni naramyeon"
    },
    {
      korean: "조금 더 빨리 네게 닿을 수 있을 텐데?",
      english: "Could I reach you a little faster?",
      romanized: "Jogeum deo ppalli nege daheul su isseul tende?"
    },
    {
      korean: "눈꽃이 떨어져요",
      english: "Snowflakes are falling",
      romanized: "Nunkkoci tteoreojyeoyo"
    },
    {
      korean: "또 조금씩 멀어져요",
      english: "And they're getting farther away little by little",
      romanized: "Tto jogeumssik meoreojyeoyo"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "얼마나 기다려야?",
      english: "How much longer do I have to wait?",
      romanized: "Eolmana gidaryeoya?"
    },
    {
      korean: "또 몇 밤을 더 새워야?",
      english: "How many more nights do I have to stay up?",
      romanized: "Tto myeot bameul deo saewoya?"
    },
    {
      korean: "널 보게 될까? (널 보게 될까?)",
      english: "Will I be able to see you? (Will I be able to see you?)",
      romanized: "Neol boge doelkka? (neol boge doelkka?)"
    },
    {
      korean: "만나게 될까? (만나게 될까?)",
      english: "Will I be able to meet you? (Will I be able to meet you?)",
      romanized: "Mannage doelkka? (mannage doelkka?)"
    },
    {
      korean: "추운 겨울 끝을 지나",
      english: "After the cold winter ends",
      romanized: "Chuun gyeoul kkeuteul jina"
    },
    {
      korean: "다시 봄날이 올 때까지",
      english: "Until the spring day comes again",
      romanized: "Dasi bomnari ol ttaekkaji"
    },
    {
      korean: "꽃 피울 때까지",
      english: "Until the flowers bloom",
      romanized: "Kkot piul ttaekkaji"
    },
    {
      korean: "그곳에 좀 더 머물러줘, 머물러줘",
      english: "Please stay there a little longer, stay",
      romanized: "Geugose jom deo meomulleojwo, meomulleojwo"
    },
    {
      korean: "네가 변한 건지? (네가 변한 건지?)",
      english: "Is it you who changed? (Is it you who changed?)",
      romanized: "Nega byeonhan geonji? (nega byeonhan geonji?)"
    },
    {
      korean: "아니면 내가 변한 건지? (내가 변한 건지?)",
      english: "Or is it me who changed? (Is it me who changed?)",
      romanized: "Animyeon naega byeonhan geonji? (naega byeonhan geonji?)"
    },
    {
      korean: "이 순간 흐르는 시간조차 미워",
      english: "Even this flowing time is hateful",
      romanized: "I sungan heureuneun siganjocha miwo"
    },
    {
      korean: "우리가 변한 거지 뭐? 모두가 그런 거지, 뭐?",
      english: "We all changed, right? Everyone changes, right?",
      romanized: "Uriga byeonhan geoji mwo? Moduga geureon geoji, mwo?"
    },
    {
      korean: "그래, 밉다 니가 넌 떠났지만",
      english: "Yeah, I hate you, though you left",
      romanized: "Geurae, mipda niga neon tteonatjiman"
    },
    {
      korean: "단 하루도 너를 잊은 적이 없었지 난",
      english: "I haven't forgotten you, not even for a day",
      romanized: "Dan harudo neoreul ijeun jeogi eopseotji nan"
    },
    {
      korean: "솔직히 보고 싶은데 이만 너를 지울게",
      english: "Honestly, I miss you but I’ll erase you now",
      romanized: "Soljikhi bogo sipeunde iman neoreul jiulge"
    },
    {
      korean: "그게 널 원망하기보단 덜 아프니까",
      english: "Because it hurts less than resenting you",
      romanized: "Geuge neol wonmanghagibodan deol apeunikka"
    },
    {
      korean: "시린 널 불어내 본다",
      english: "I try to blow you away, like cold wind",
      romanized: "Sirin neol bureonae bonda"
    },
    {
      korean: "연기처럼, 하얀 연기처럼",
      english: "Like smoke, like white smoke",
      romanized: "Yeongicheoreom, hayan yeongicheoreom"
    },
    {
      korean: "말로는 지운다 해도",
      english: "Even though I say I’ll erase you",
      romanized: "Malloneun jiunda haedo"
    },
    {
      korean: "사실 난 아직 널 보내지 못하는데",
      english: "Truth is, I still can't let you go",
      romanized: "Sasil nan ajik neol bonaeji mothaneunde"
    },
    {
      korean: "눈꽃이 떨어져요",
      english: "Snowflakes are falling",
      romanized: "Nunkkoci tteoreojyeoyo"
    },
    {
      korean: "또 조금씩 멀어져요",
      english: "And they're getting farther away little by little",
      romanized: "Tto jogeumssik meoreojyeoyo"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "얼마나 기다려야?",
      english: "How much longer do I have to wait?",
      romanized: "Eolmana gidaryeoya?"
    },
    {
      korean: "또 몇 밤을 더 새워야?",
      english: "How many more nights do I have to stay up?",
      romanized: "Tto myeot bameul deo saewoya?"
    },
    {
      korean: "널 보게 될까? (널 보게 될까?)",
      english: "Will I be able to see you? (Will I be able to see you?)",
      romanized: "Neol boge doelkka? (neol boge doelkka?)"
    },
    {
      korean: "만나게 될까? (만나게 될까?)",
      english: "Will I be able to meet you? (Will I be able to meet you?)",
      romanized: "Mannage doelkka? (mannage doelkka?)"
    },
    {
      korean: "You know it all, you're my best friend",
      english: "You know it all, you're my best friend",
      romanized: "You know it all, you're my best friend"
    },
    {
      korean: "아침은 다시 올 거야",
      english: "Morning will come again",
      romanized: "Achimeun dasi ol geoya"
    },
    {
      korean: "어떤 어둠도, 어떤 계절도",
      english: "No darkness, no season",
      romanized: "Eotteon eodumdo, eotteon gyejeoldo"
    },
    {
      korean: "영원할 순 없으니까",
      english: "Can last forever",
      romanized: "Yeongwonhal sun eopseunikka"
    },
    {
      korean: "벚꽃이 피나봐요",
      english: "Cherry blossoms are blooming",
      romanized: "Beokkoci pinabwayo"
    },
    {
      korean: "이 겨울도 끝이 나요",
      english: "This winter is ending too",
      romanized: "I gyeouldo kkeuti nayo"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      korean: "조금만 기다리면 (기다리면)",
      english: "If I wait just a little more (wait just a little more)",
      romanized: "Jogeumman gidarimyeon (gidarimyeon)"
    },
    {
      korean: "며칠 밤만 더 새우면",
      english: "If I stay up a few more nights",
      romanized: "Myeochil bamman deo saeumyeon"
    },
    {
      korean: "만나러 갈게 (만나러 갈게)",
      english: "I'll come meet you (I'll come meet you)",
      romanized: "Mannareo galge (mannareo galge)"
    },
    {
      korean: "데리러 갈게 (데리러 갈게, yeah, yeah)",
      english: "I'll come take you (I'll come take you, yeah, yeah)",
      romanized: "Derireo galge (derireo galge, yeah, yeah)"
    },
    {
      korean: "추운 겨울 끝을 지나",
      english: "After the cold winter ends",
      romanized: "Chuun gyeoul kkeuteul jina"
    },
    {
      korean: "다시 봄날이 올 때까지",
      english: "Until the spring day comes again",
      romanized: "Dasi bomnari ol ttaekkaji"
    },
    {
      korean: "꽃 피울 때까지",
      english: "Until the flowers bloom",
      romanized: "Kkot piul ttaekkaji"
    },
    {
      korean: "그곳에 좀 더 머물러줘, 머물러줘",
      english: "Please stay there a little longer, stay",
      romanized: "Geugose jom deo meomulleojwo, meomulleojwo"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={readPageStyle}>
      <HeaderDummy />
      <div className={videoContainerStyle}>
        <VideoComponent videoUrl={videoUrl} />
      </div>
      
      <div className={scriptContainerStyle}>
        <ScriptComponent scriptList={lyricsData} currentIndex={currentIndex} />
      </div>
      
      <NavBarDummy />
    </div>
  );
};