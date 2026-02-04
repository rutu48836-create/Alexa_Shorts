import { useState,useEffect,useRef } from "react";
import { Nav } from "../Components/NavBar";
import styles from '../Styles/Home.module.css'
import ShortsDisplay from "../Components/Shorts";
import {ArrowUp,Cog,Sparkle,Link,File,ImagePlay,ScrollText} from 'lucide-react';
import { Sidebar } from "../Components/SideBar";
import { useAuth } from "../Components/Auth.jsx";
import { useNavigate } from "react-router";
import {API_URL} from '../../vite.config.js'

export function Home(){
  
  const [link, setLink] = useState('');
  const [shorts, setShorts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numShorts, setNumShorts] = useState(3);
  const [conversionMode, setConversionMode] = useState('auto');
  const [credits,setCredits] = useState(50)
  const [captionStyle, setCaptionStyle] = useState('default')
  const [settingsOpen,setSettingsOpen] = useState(false)
  const [Broll,setBroll] = useState('none')


   const navigate = useNavigate()

    const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/Login')
      return
    }

    async function create_user() {
      try {
        const res = await fetch(`${API_URL}/api/create-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email
          })
        })

        const data = await res.json()

        if (!res.ok) {
          console.error("Failed to create user:", data.error)
          return false
        }

        console.log("User creation result:", data)
        return true
      } catch (err) {
        console.error("Create user error:", err)
        return false
      }
    }

    async function loadCredits() {
      try {
        const res = await fetch(`${API_URL}/api/user/${user.uid}`)
        const data = await res.json()

        if (res.ok) {
          console.log("Credits loaded:", data.credits)
          setCredits(data.credits)
        } else {
          console.error("Failed to load credits:", data.error)
        }
      } catch (err) {
        console.error("Load credits error:", err)
      }
    }

    async function initialize() {
      await create_user()
      setTimeout(() => {
        loadCredits()
      }, 500)
    }

    initialize()
  }, [user, navigate])

   async function useService(){
      const res = await fetch(`${API_URL}/api/use-service`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: user.uid })
  })

 const data = await res.json()

  if (!res.ok) {
    alert(data.error)
    return false
  }

  setCredits(data.credits)
  return true

  }

  console.log(captionStyle)
 
  const Validate = async () => {

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    
    if (!link.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!youtubeRegex.test(link)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    // Deduct credits FIRST
  const success = await useService()
  if (!success) return

    // Clear previous state
    setError(null);
    setShorts(null);
    setLoading(true);


     try {
      const response = await fetch(`${API_URL}/api/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          youtubeUrl: link,
          numShorts: numShorts ,
            mode: conversionMode ,
                       captionStyle: captionStyle || 'default',  // ADD THIS
                Broll:Broll
        }),
      
      })  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert video');
      }

      setShorts(data);


    } catch (err) {
      setError(err.message);
      console.error('Conversion error:', err);
    } finally {
      setLoading(false);
    }
  };


  const Hero_section = () => {
    return (
      <>
        <div className={styles.Hero_sec_wrapper}>
<div className={styles.Setting_btn_wrapper}>
 <img src={user?.photourl}/>
</div>
         <div className={styles.Hero_sec_content}>
           <h1>Howdy,{user?.displayName}</h1>
          
          <p>
           Transform your ideas into actually engaging videos without mulitple softwares.
          </p>         
          <div className={styles.Hero_sec_input}>
            <input 
              type="text" 
              placeholder="Paste Youtube Link" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={loading}
              onKeyDown={Validate}

            />
           <div className={styles.input_right_content_wrapper}> 
        <div className={styles.right_side_btns}>
<button onClick={() => setSettingsOpen(true)} 
className={styles.setting_btn}><Cog color="#686262" size={20}/></button>
<button className={styles.setting_btn}><Sparkle color="#686262" size={20}/></button>
</div>

           <div className={styles.btn_wrapper}> <button 
              onClick={Validate}
              disabled={loading || !link.trim()}
              className={styles.Query_btn}
            >
              <ArrowUp size={18} />
            </button>
            </div>
            
            </div>
          </div>
<div className={`${shorts ? styles.features_wrapper_hidden : styles.features_wrapper}`}>
            <button><Link strokeWidth={1.25} size={18}/>link to shorts</button>
            <button><ImagePlay strokeWidth={1.25} size={18}/>B-rolls</button>
            <button><File strokeWidth={1.25} size={18}/>downloaded file to shorts</button>
            <button><ScrollText strokeWidth={1.25} size={18}/>AI generated title & description</button>

          </div>
</div>
          
   {settingsOpen && (

 <div className={styles.setting_wrapper}>
<div className={styles.setting_card}>
  <div className={styles.setting_card_header}>
 <h3>Settings</h3> <button onClick={() => setSettingsOpen(false)}>X</button>    </div>

<div className={styles.setting_dropdown_selector}>

 <div className={styles.shorts_selector_setting_wrapper}>

<h4>Shorts background</h4> 
<select 
  value={conversionMode} 
  onChange={(e) => setConversionMode(e.target.value)}
  disabled={loading}
>
  <option value="auto">Auto (Smart)</option>
  <option value="blur">Blur Background</option>
  <option value="zoom">Zoom to Fill</option>
  <option value="fit">Fit All (Letterbox)</option>
</select>

  </div>

 <div className={styles.shorts_selector_setting_wrapper}>

<h4>B-roll</h4> 
<select value={Broll} onChange={(e) => setBroll(e.target.value)}>
  <option value="none">None</option>
  <option value="Auto">Auto</option>                               
</select>
  </div>

 <div className={styles.shorts_selector_setting_wrapper}>

<h4>Number of Shorts</h4> 
 <select 
              value={numShorts} 
  onChange={(e) => setNumShorts(e.target.value)}
              disabled={loading}
            >
              <option value={1}>1 Short</option>
              <option value={2}>2 Shorts</option>
              <option value={3}>3 Shorts</option>
              <option value={4}>4 Shorts</option>
              <option value={5}>5 Shorts</option>
            </select>
  </div>

 <div className={styles.shorts_selector_setting_wrapper}>

<h4>Caption style</h4> 
<select 
value={captionStyle}
onChange={(e) => setCaptionStyle(e.target.value)}>
  <option value="default">Default</option>
<option value="bouncing">Bouncing</option>
<option value="classic">Classic</option>
</select>
  </div>


  </div>
</div>
 </div>


  )}

 







          {/* Loading State */}
          {loading && (
            <div className={styles.loading_container}>
              <div className={styles.spinner}>
              <p>Converting your video to shorts...</p>
              <small>This may take 2-5 minutes depending on video length</small>
            </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={styles.error_container}>
              <p>❌ {error}</p>
              <button 
                onClick={() => setError(null)}
                className={styles.error_dismiss}
              >
                Dismiss
              </button>
            </div>
          )}

        </div>
         <div className={styles.short_display_wrapper}> {shorts && 
        <ShortsDisplay shorts={shorts} />   
    
      }
      </div>
      </>
    );
  };



  return (
    <div className={styles.Container}>
   <aside><Sidebar/></aside>   
      
    <div className={styles.main_content_wrapper}>
      <div className={styles.Account_info}>
        <img src={user?.profileUrl}></img>
      </div>
     
      <main><Hero_section/></main>
    </div>
    </div>
  );
}