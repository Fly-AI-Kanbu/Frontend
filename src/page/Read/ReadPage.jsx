import { css } from '@emotion/css';
import { useState } from 'react';
import HeaderDummy from "@components/HeaderDummy";
import NavBarDummy from '@components/NavBarDummy';
import { VideoComponent } from './VideoComponent'; 
import { ScriptComponent } from './ScriptComponent';

const readPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const videoContainerStyle = css`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
`;

const scriptContainerStyle = css`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;


export const ReadPage = () => {
  const videoUrl = "/springdays.mp4";
  const lyricsData = [
    {
      timestamp: 18, 
      korean: "보고 싶다, 이렇게 말하니까 더 보고 싶다",
      english: "I miss you, saying this makes me miss you more",
      romanized: "Bogo sipda, ireoke malhanikka deo bogo sipda"
    },
    {
      timestamp: 25,
      korean: "너희 사진을 보고 있어도 보고 싶다",
      english: "Even while looking at your photo, I miss you",
      romanized: "Neohui sajineul bogo isseodo bogo sipda"
    },
    {
      timestamp: 29,
      korean: "너무 야속한 시간 나는 우리가 밉다",
      english: "This cruel time, I hate us",
      romanized: "Neomu yasokan sigan naneun uriga mipda"
    },
    {
      timestamp: 33,
      korean: "이젠 얼굴 한 번 보는 것 조차 힘들어진 우리가",
      english: "Now, it's hard for us to even see each other once",
      romanized: "Ijen eolgul han beon boneun geot jocha himdeureojin uriga"
    },
    {
      timestamp: 37,
      korean: "여긴 온통 겨울 뿐이야 8월에도 겨울이 와",
      english: "Here, it's all winter, even in August, winter comes",
      romanized: "Yeogin ontong gyeoul ppuniya 8woledo gyeouri wa"
    },
    {
      timestamp: 40,
      korean: "마음은 시간을 달려가네 홀로 남은 설국열차",
      english: "My heart is running through time, the Snowpiercer left alone",
      romanized: "Maeumeun siganeul dallyeogane hollo nameun seolgukyeolcha"
    },
    {
      timestamp: 45,
      korean: "니 손 잡고 지구 반대편까지 가 이 겨울을 끝내고파",
      english: "I want to hold your hand and go to the other side of the earth, to end this winter",
      romanized: "Ni son japgo jigu bandepyeonkkaji ga i gyeoureul kkeunnaegopa"
    },
    {
      timestamp: 50,
      korean: "그리움들이 얼마나 눈처럼 내려야 그 봄날이 올까, friend?",
      english: "How much more snow must fall down for that spring day to come, friend?",
      romanized: "Geuriumdeuri eolmana nuncheoreom naeryeoya geu bomnari olkka, friend?"
    },
    {
      timestamp: 55,
      korean: "허공을 떠도는 작은",
      english: "Like small pieces floating in the air",
      romanized: "Heogongeul tteodoneun jageun"
    },
    {
      timestamp: 58,
      korean: "먼지처럼, 작은 먼지처럼",
      english: "Like dust, like small dust",
      romanized: "Meonjicheoreom, jageun meonjicheoreom"
    },
    {
      timestamp: 63,
      korean: "날리는 눈이 나라면",
      english: "If I were the snow flying",
      romanized: "Nallineun nuni naramyeon"
    },
    {
      timestamp: 67,
      korean: "조금 더 빨리 네게 닿을 수 있을 텐데?",
      english: "Could I reach you a little faster?",
      romanized: "Jogeum deo ppalli nege daheul su isseul tende?"
    },
    {
      timestamp: 72,
      korean: "눈꽃이 떨어져요",
      english: "Snowflakes are falling",
      romanized: "Nunkkoci tteoreojyeoyo"
    },
    {
      timestamp: 76,
      korean: "또 조금씩 멀어져요",
      english: "And they're getting farther away little by little",
      romanized: "Tto jogeumssik meoreojyeoyo"
    },
    
    {
      timestamp: 81,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 85,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 90,
      korean: "얼마나 기다려야?",
      english: "How much longer do I have to wait?",
      romanized: "Eolmana gidaryeoya?"
    },
    {
      timestamp: 94,
      korean: "또 몇 밤을 더 새워야?",
      english: "How many more nights do I have to stay up?",
      romanized: "Tto myeot bameul deo saewoya?"
    },
    {
      timestamp: 99,
      korean: "널 보게 될까? (널 보게 될까?)",
      english: "Will I be able to see you? (Will I be able to see you?)",
      romanized: "Neol boge doelkka? (neol boge doelkka?)"
    },
    {
      timestamp: 103,
      korean: "만나게 될까? (만나게 될까?)",
      english: "Will I be able to meet you? (Will I be able to meet you?)",
      romanized: "Mannage doelkka? (mannage doelkka?)"
    },
    {
      timestamp: 109,
      korean: "추운 겨울 끝을 지나",
      english: "After the cold winter ends",
      romanized: "Chuun gyeoul kkeuteul jina"
    },
    {
      timestamp: 114,
      korean: "다시 봄날이 올 때까지",
      english: "Until the spring day comes again",
      romanized: "Dasi bomnari ol ttaekkaji"
    },
    {
      timestamp: 117,
      korean: "꽃 피울 때까지",
      english: "Until the flowers bloom",
      romanized: "Kkot piul ttaekkaji"
    },
    {
      timestamp: 121,
      korean: "그곳에 좀 더 머물러줘, 머물러줘",
      english: "Please stay there a little longer, stay",
      romanized: "Geugose jom deo meomulleojwo, meomulleojwo"
    },
    {
      timestamp: 127,
      korean: "네가 변한 건지? (네가 변한 건지?)",
      english: "Is it you who changed? (Is it you who changed?)",
      romanized: "Nega byeonhan geonji? (nega byeonhan geonji?)"
    },
    {
      timestamp: 129,
      korean: "아니면 내가 변한 건지? (내가 변한 건지?)",
      english: "Or is it me who changed? (Is it me who changed?)",
      romanized: "Animyeon naega byeonhan geonji? (naega byeonhan geonji?)"
    },
    {
      timestamp: 130,
      korean: "이 순간 흐르는 시간조차 미워",
      english: "Even this flowing time is hateful",
      romanized: "I sungan heureuneun siganjocha miwo"
    },
    {
      timestamp: 133,
      korean: "우리가 변한 거지 뭐? 모두가 그런 거지, 뭐?",
      english: "We all changed, right? Everyone changes, right?",
      romanized: "Uriga byeonhan geoji mwo? Moduga geureon geoji, mwo?"
    },
    {
      timestamp: 136,
      korean: "그래, 밉다 니가 넌 떠났지만",
      english: "Yeah, I hate you, though you left",
      romanized: "Geurae, mipda niga neon tteonatjiman"
    },
    {
      timestamp: 138,
      korean: "단 하루도 너를 잊은 적이 없었지 난",
      english: "I haven't forgotten you, not even for a day",
      romanized: "Dan harudo neoreul ijeun jeogi eopseotji nan"
    },
    {
      timestamp: 140,
      korean: "솔직히 보고 싶은데 이만 너를 지울게",
      english: "Honestly, I miss you but I’ll erase you now",
      romanized: "Soljikhi bogo sipeunde iman neoreul jiulge"
    },
    {
      timestamp: 143,
      korean: "그게 널 원망하기보단 덜 아프니까",
      english: "Because it hurts less than resenting you",
      romanized: "Geuge neol wonmanghagibodan deol apeunikka"
    },
    {
      timestamp: 145,
      korean: "시린 널 불어내 본다",
      english: "I try to blow you away, like cold wind",
      romanized: "Sirin neol bureonae bonda"
    },
    {
      timestamp: 148,
      korean: "연기처럼, 하얀 연기처럼",
      english: "Like smoke, like white smoke",
      romanized: "Yeongicheoreom, hayan yeongicheoreom"
    },
    {
      timestamp: 153,
      korean: "말로는 지운다 해도",
      english: "Even though I say I’ll erase you",
      romanized: "Malloneun jiunda haedo"
    },
    {
      timestamp: 157,
      korean: "사실 난 아직 널 보내지 못하는데",
      english: "Truth is, I still can't let you go",
      romanized: "Sasil nan ajik neol bonaeji mothaneunde"
    },
    {
      timestamp: 162,
      korean: "눈꽃이 떨어져요",
      english: "Snowflakes are falling",
      romanized: "Nunkkoci tteoreojyeoyo"
    },
    {
      timestamp: 166,
      korean: "또 조금씩 멀어져요",
      english: "And they're getting farther away little by little",
      romanized: "Tto jogeumssik meoreojyeoyo"
    },
    {
      timestamp: 170,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 175,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 180,
      korean: "얼마나 기다려야?",
      english: "How much longer do I have to wait?",
      romanized: "Eolmana gidaryeoya?"
    },
    {
      timestamp: 184,
      korean: "또 몇 밤을 더 새워야?",
      english: "How many more nights do I have to stay up?",
      romanized: "Tto myeot bameul deo saewoya?"
    },
    {
      timestamp: 188,
      korean: "널 보게 될까? (널 보게 될까?)",
      english: "Will I be able to see you? (Will I be able to see you?)",
      romanized: "Neol boge doelkka? (neol boge doelkka?)"
    },
    {
      timestamp: 193,
      korean: "만나게 될까? (만나게 될까?)",
      english: "Will I be able to meet you? (Will I be able to meet you?)",
      romanized: "Mannage doelkka? (mannage doelkka?)"
    },
    {
      timestamp: 199,
      korean: "You know it all, you're my best friend",
      english: "You know it all, you're my best friend",
      romanized: "You know it all, you're my best friend"
    },
    {
      timestamp: 204,
      korean: "아침은 다시 올 거야",
      english: "Morning will come again",
      romanized: "Achimeun dasi ol geoya"
    },
    {
      timestamp: 208,
      korean: "어떤 어둠도, 어떤 계절도",
      english: "No darkness, no season",
      romanized: "Eotteon eodumdo, eotteon gyejeoldo"
    },
    {
      timestamp: 213,
      korean: "영원할 순 없으니까",
      english: "Can last forever",
      romanized: "Yeongwonhal sun eopseunikka"
    },
    {
      timestamp: 216,
      korean: "벚꽃이 피나봐요",
      english: "Cherry blossoms are blooming",
      romanized: "Beokkoci pinabwayo"
    },
    {
      timestamp: 219,
      korean: "이 겨울도 끝이 나요",
      english: "This winter is ending too",
      romanized: "I gyeouldo kkeuti nayo"
    },
    {
      timestamp: 224,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 228,
      korean: "보고 싶다 (보고 싶다)",
      english: "I miss you (I miss you)",
      romanized: "Bogo sipda (bogo sipda)"
    },
    {
      timestamp: 233,
      korean: "조금만 기다리면 (기다리면)",
      english: "If I wait just a little more (wait just a little more)",
      romanized: "Jogeumman gidarimyeon (gidarimyeon)"
    },
    {
      timestamp: 238,
      korean: "며칠 밤만 더 새우면",
      english: "If I stay up a few more nights",
      romanized: "Myeochil bamman deo saeumyeon"
    },
    {
      timestamp: 242,
      korean: "만나러 갈게 (만나러 갈게)",
      english: "I'll come meet you (I'll come meet you)",
      romanized: "Mannareo galge (mannareo galge)"
    },
    {
      timestamp: 246,
      korean: "데리러 갈게 (데리러 갈게, yeah, yeah)",
      english: "I'll come take you (I'll come take you, yeah, yeah)",
      romanized: "Derireo galge (derireo galge, yeah, yeah)"
    },
    {
      timestamp: 253,
      korean: "추운 겨울 끝을 지나",
      english: "After the cold winter ends",
      romanized: "Chuun gyeoul kkeuteul jina"
    },
    {
      timestamp: 257,
      korean: "다시 봄날이 올 때까지",
      english: "Until the spring day comes again",
      romanized: "Dasi bomnari ol ttaekkaji"
    },
    {
      timestamp: 261,
      korean: "꽃 피울 때까지",
      english: "Until the flowers bloom",
      romanized: "Kkot piul ttaekkaji"
    },
    {
      timestamp: 264,
      korean: "그곳에 좀 더 머물러줘, 머물러줘",
      english: "Please stay there a little longer, stay",
      romanized: "Geugose jom deo meomulleojwo, meomulleojwo"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTimeUpdate = (currentTime) => {
    const newIndex = lyricsData.findIndex((item) => item.timestamp > currentTime) - 1;
    setCurrentIndex(Math.max(newIndex, 0));
  };

  const currentScript = lyricsData[currentIndex] || null;
  const prevScript = lyricsData[currentIndex - 1] || null;
  const nextScript = lyricsData[currentIndex + 1] || null;

  return (
    <div className={readPageStyle}>
      <HeaderDummy />
      <div className={videoContainerStyle}>
        <VideoComponent videoUrl={videoUrl} onTimeUpdate={handleTimeUpdate} />
      </div>
      <div className={scriptContainerStyle}>
        {currentScript ? (
          <ScriptComponent 
            currentScript={currentScript} 
            prevScript={prevScript} 
            nextScript={nextScript} 
          />
        ) : (
          <div>No lyrics available</div>
        )}
      </div>
      <NavBarDummy />
    </div>
  );
};