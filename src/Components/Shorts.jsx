import React, { useState } from 'react';
import styles from "../Styles/Shorts.module.css"

function ShortsDisplay({ shorts }) {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [selectedShort, setSelectedShort] = useState(null);
  const [videoInfo,setVideoInfo] = useState(null)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your generated shorts</h2>
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{shorts.videoTitle}</h3>
      </div>

      <div className={styles.shortsGrid}>
        {shorts.shorts.map((short, index) => (
          <div key={index} className={styles.shortCard}>
            <div className={styles.shortHeader}>
              <h4 className={styles.shortTitle}>{short.title}</h4>
              <span className={styles.duration}>{short.duration.toFixed(1)}s</span>
            </div>
            <div className={styles.videoWrapper}>
              <video
                className={styles.videoPreview}
                src={`${API_BASE}${short.path}`}
                onClick={() => setSelectedShort(index)}
              >
                Your browser does not support the video tag.
              </video>
              <button 
                className={styles.playOverlay}
                onClick={() => setSelectedShort(index)}
              >
                ▶
              </button>
            </div>

            <div className={styles.actions}>
              <a
                href={`${API_BASE}${short.path}`}
                download
                className={styles.downloadBtn}
              >
                 Download
              </a>
            <button className={styles.viewBtn} onClick={() => setVideoInfo(index)}>video Info</button>
            </div>
          </div>
        ))}
      </div>



      {/* Full Screen Video Modal */}
      {selectedShort !== null && (
        <VideoModal
          short={shorts.shorts[selectedShort]}
          apiBase={API_BASE}
          onClose={() => setSelectedShort(null)}
        />
      )}
    
 {videoInfo !== null && (
        <div className={styles.modalOverlay} onClick={() => setVideoInfo(null)}>
           <div className={styles.Video_info_card} onClick={(e) => e.stopPropagation()}>
             <div className={styles.Video_info_card_head}>  <h4>Video Information</h4> <button onClick={() => setVideoInfo(null)}>✕</button>
            </div>
             <div className={styles.Video_info_card_body}>
            <div className={styles.title_row}>
              <h3>Video title</h3> 
          <span>{shorts.shorts[videoInfo]?.title || 'No title available'}</span>
            </div>
            <div className={styles.title_row}>
          <span>{shorts.shorts[videoInfo]?.description || 'No description available'}</span>
            </div>
              </div>
           </div>
       </div>
     
     )}
    </div>
   
  );
}



function VideoModal({ short, apiBase, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h3 className={styles.modalTitle}>{short.title}</h3>
        <video
          className={styles.modalVideo}
          src={`${apiBase}${short.path}`}
          controls
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
        <a
          href={`${apiBase}${short.path}`}
          download
          className={styles.modalDownloadBtn}
        >
          Download Video
        </a>
      </div>
    </div>

  );

}




export default ShortsDisplay;