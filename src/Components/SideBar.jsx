
import { createContext, useContext, useEffect, useState } from "react";
import styles from "../Styles/SideBar.module.css"
import { PanelRight } from 'lucide-react';
import { History,Rocket,Plus,
 CircleUserRound,Sparkles,Cog,Video,ClosedCaption,Droplet,ImagePlay} from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../Backend/Firebase.js";
import { useNavigate } from 'react-router';
import { useAuth } from "../Components/Auth.jsx";
import { createClient } from '@supabase/supabase-js'

export function Sidebar(){

 const [IsOpen,setIsOpen] = useState(false)
 const AuthContext = createContext();
 const { user } = useAuth();
 const [loading, setLoading] = useState(true);
 const [Account_Open,setAccount_Open] = useState(false)
   const [plan, setPlan] = useState(null)
   const [setting_open,setSetting_Open] = useState(false)
   const [subscription,setSubscription_Open] = useState(false)
   const [credits,setCredits] = useState(50)
   const [tier,setTier] = useState('free')

  const navigate = useNavigate()


  const Handle_Log_out = async () => {

 try{

 await signOut(auth)
 console.log('Success in logging out')
 navigate('/Login')

 } catch(err){
  console.log('Error in logging user out')
 }

  }



 return(
<>
  <div className={`${styles.Toggle_btn_wrapper_mobile} ${IsOpen ? styles.Toggle_open_mobile : styles.Toggle_btn_wrapper_mobile}`}>
    <button onClick={() => {

 if(setIsOpen(!IsOpen)){
  setIsOpen(true)
 }

 else if(IsOpen){
  setIsOpen(false)
 }


    }}
     className={styles.toggle_btn_mobile}> <PanelRight strokeWidth={2} size={20} color='#383434'/></button>
 </div>
<div className={`${styles.Sidebar_wrapper} ${IsOpen ? styles.Sidebar_open : styles.Sidebar_closed}`}>
 <div className={`${styles.Toggle_btn_wrapper} ${IsOpen ? styles.Toggle_open : styles.Toggle_btn_wrapper}`}>
    <button onClick={() => {

 if(setIsOpen(!IsOpen)){
  setIsOpen(true)
 }

 else if(IsOpen){
  setIsOpen(false)
 }


    }} on> <PanelRight strokeWidth={2} size={20} color='#686666'/></button>
 </div>

<div className={`${IsOpen ? styles.Sidebar_open : styles.Sidebar_links_closed}`}>

  <ul  className={`${IsOpen ? styles.Links_open : styles.Links_closed}`}>
 <li><History size={19} strokeWidth={1.8} color='#5f5d5d' />{IsOpen && (<span>History</span>)}</li>
 <li onClick={() => setAccount_Open(true)}><CircleUserRound size={19} strokeWidth={1.8} color='#615e5e'/>{IsOpen && (<span>Account</span>)}</li>
 <li onClick={() => {
  if(!subscription){
    setSubscription_Open(true)
  }

  else{
    setSubscription_Open(false)
  }
 }}><Sparkles size={19} strokeWidth={1.8} color='#5f5d5d'/>{IsOpen && (<span>Upgrade</span>)}</li>
 <li onClick={() => setSetting_Open(true)}><Cog size={19} strokeWidth={1.8} color='#616161'/>{IsOpen && (<span>Setting</span>)}</li>
  </ul>
 </div>

 <div className={styles.user_info_wrapper}>

   <div className={styles.profile_pic_wrapper}>
    <img src={user?.photoURL || ""} className={styles.profile_pic}/>
</div>

 {IsOpen && (
 <div className={styles.details_users}>
  <span>{user?.displayName}</span>
   <span></span>
 </div>
 )}

 </div>
</div>


  {Account_Open && (
   <div className={styles.Account_Wrapper}>
 
 <div className={styles.Account_Content_Card}>

  <div className={styles.Account_Content_Card_head}>
    <h3>Account</h3> <button onClick={() => setAccount_Open(false)}>X</button>
  </div>
 
  <div className={styles.User_Details}>
   <div className={styles.User_row1}>
    <h3>Name</h3> <span>{user?.displayName}</span></div>
   <div className={styles.User_row1}><h3>Email</h3> <span>{user?.email}</span></div>
  </div>
  

 <div className={styles.User_upgrade}>
  <h3>Try Preminium tier</h3> <button onClick={() => setSubscription_Open(true)}>Upgrade</button>
 </div>

 <div className={styles.User_Upgrade_details}>
 
 <h3>Everything in preminium</h3><br/>
 <ul>
  <li><Video size={20}/> Get 50 hours of youtube shorts</li>
  <li><ClosedCaption size={20}/>Get More captions styles to choose</li>
  <li><Droplet size={20}/> No Watermarks on downloaded videos</li>
  <li><ImagePlay size={20}/>More Numbers of shorts per video</li>
 </ul>

 </div>


 <div className={styles.User_log_out}>
  <h3>Want to log out?</h3> <button onClick={Handle_Log_out}>Log out</button>
  </div>
 </div>

 </div>

 
  )}


 {setting_open && (
  <div className={styles.Account_Wrapper}>
     <div className={styles.Setting_Card}>

      <div className={styles.dropdown_options_wrapper}>
        <div className={styles.Video_quality_div}><h3>Quality</h3>
        <select>
          <option>480p</option>
          <option>720p</option>
          <option>1080p</option>
        </select>
        </div>

          <div className={styles.Video_quality_div}><h3>Number of clips</h3>
        <select>
          <option>1</option>
          <option>3</option>
          <option>5</option>
          <option>8</option>
        </select>
        </div>
      </div>

    <div className={styles.template_selector_wrapper}>
 
  <div className={styles.template_selector_card}><button onClick={() => setCaptionStyle('default')}>default</button>
   </div> 
   <button onClick={() => setCaptionStyle('bounce')}>Bouncing</button>
    
    </div>

     </div>
  </div>
 )}


 {subscription && (

 <div className={styles.Account_Wrapper}>

 <div className={styles.subscription_Card}>
  <div className={styles.subscription_Card_head_wrapper}>
    <h2>Choose your plan</h2>
    <span className={styles.span_plan}><Rocket size={18} color={"orange"}/>Credits left</span>
    <span className={styles.span2_plan}>Get the right plan according to your needs and your content needs</span>

  </div>

 <div className={styles.subscription_Cards_Wrapper}>


 <div className={styles.subscription_plan_card}>

<div className={styles.plan_card_content}>
  <span>Free Tier</span>
  <div className={styles.plan_card_pricing}>
     <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0.00</span>
      <span style={{ fontSize: '1rem', color: 'gray' }}>/month</span>
  </div>

  <div className={styles.plan_card_features}>

<ul>
 <li><Plus size={14} color="#ec8346"/>5 long videos to shorts</li>
   <li><Plus size={14} color="#ec8346"/>3 shorts per link</li>
     <li><Plus size={14} color="#ec8346"/>480p quality shorts</li>

</ul>
    </div>

 </div>
 </div>

 <div className={styles.subscription_plan_card}>

<div className={styles.plan_card_content}>
  <span>Advance Tier</span>
  <div className={styles.plan_card_pricing}>
     <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>$4.99</span>
      <span style={{ fontSize: '1rem', color: 'gray' }}>/month</span>
  </div>

  <div className={styles.plan_card_features}>

<ul>
 <li><Plus size={14} color="#ec8346"/>35 long videos to shorts</li>
   <li><Plus size={14} color="#ec8346"/>6 shorts per link</li>
     <li><Plus size={14} color="#ec8346"/>1080p quality shorts</li>
          <li><Plus size={14} color="#ec8346"/>get more caption option</li>
</ul>

 <button className={styles.upgrade_btn}>Upgrade</button>

    </div>
    </div></div>

    <div className={styles.subscription_plan_card}>

<div className={styles.plan_card_content}>
  <span>Preminmum Tier</span>
  <div className={styles.plan_card_pricing}>
     <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>$9.99</span>
      <span style={{ fontSize: '1rem', color: 'gray' }}>/month</span>
  </div>

  <div className={styles.plan_card_features}>

<ul>
 <li><Plus size={14} color="#ec8346"/>unlimited videos to shorts</li>
   <li><Plus size={14} color="#ec8346"/>8 shorts per link</li>
     <li><Plus size={14} color="#ec8346"/>1080p quality shorts</li>
          <li><Plus size={14} color="#ec8346"/>get more caption option</li>
</ul>

 <button className={styles.upgrade_btn_1}>Upgrade</button>

    </div>


 </div>
 </div>
 
</div>
 </div>


</div>

)}



 </>

 )}