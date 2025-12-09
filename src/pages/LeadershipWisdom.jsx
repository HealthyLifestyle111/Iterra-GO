import React, { useState } from "react";
import { BookOpen, Video, FileText, Users, TrendingUp, Heart } from "lucide-react";

export default function LeadershipWisdom() {
  const [activeLibrary, setActiveLibrary] = useState('leadership');

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <style>{`
        .library-tab {
          flex: 1;
          padding: 20px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(54,18,14,0.55), rgba(32,12,9,0.45));
          border: 1px solid rgba(218,165,112,.06);
          color: var(--champagne);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .library-tab:hover {
          border-color: rgba(218,165,112,.25);
          transform: translateY(-2px);
        }
        .library-tab.active {
          background: linear-gradient(90deg,var(--bronze),var(--rosegold));
          color: #1b0b06;
          border-color: transparent;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Resource Library</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4" style={{color:'var(--champagne)'}}>
            Wellness Business & Resources
          </h1>
          <p style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:14}}>
            Explore wellness advocacy opportunities and curated educational resources.
          </p>
        </div>

        {/* Library Tabs */}
        <div style={{display:"flex",gap:16,marginBottom:32}}>
          <button
            className={`library-tab ${activeLibrary === 'leadership' ? 'active' : ''}`}
            onClick={() => setActiveLibrary('leadership')}
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-3" style={{color: activeLibrary === 'leadership' ? '#1b0b06' : 'var(--champagne)'}} />
            <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Business Opportunity</div>
            <div style={{fontSize:12,opacity:0.9}}>Learn about wellness advocacy</div>
          </button>
          <button
            className={`library-tab ${activeLibrary === 'wellness' ? 'active' : ''}`}
            onClick={() => setActiveLibrary('wellness')}
          >
            <Heart className="w-8 h-8 mx-auto mb-3" style={{color: activeLibrary === 'wellness' ? '#1b0b06' : 'var(--champagne)'}} />
            <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Wellness Resources</div>
            <div style={{fontSize:12,opacity:0.9}}>Videos, Recipes & Education</div>
          </button>
        </div>

        {/* Content */}
        {activeLibrary === 'leadership' && (
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)",marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <TrendingUp className="w-7 h-7" style={{color:'var(--rosegold)'}} />
                <div>
                  <h2 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:2}}>
                    Wellness Advocacy Business
                  </h2>
                  <p style={{fontSize:14,color:"var(--rosegold)"}}>
                    Discover the perks and benefits of becoming a Wellness Advocate
                  </p>
                </div>
              </div>

              <div style={{marginBottom:20}}>
                <h3 style={{fontSize:18,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Why Become a Wellness Advocate?</h3>
                <ul style={{listStyle:"none",padding:0,margin:0,display:"grid",gap:8}}>
                  <li style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",color:"var(--champagne)",fontSize:14}}>
                    ✦ <strong>25% Wholesale Discount</strong> on all essential oil products
                  </li>
                  <li style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",color:"var(--champagne)",fontSize:14}}>
                    ✦ <strong>Earn Free Products</strong> through loyalty rewards programs
                  </li>
                  <li style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",color:"var(--champagne)",fontSize:14}}>
                    ✦ <strong>Build Your Own Business</strong> with flexible income opportunities
                  </li>
                  <li style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",color:"var(--champagne)",fontSize:14}}>
                    ✦ <strong>Access to Education</strong> and wellness training resources
                  </li>
                  <li style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",color:"var(--champagne)",fontSize:14}}>
                    ✦ <strong>Community & Support</strong> from a global network of wellness advocates
                  </li>
                </ul>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",textAlign:"center"}}>
                <p style={{fontSize:15,color:"var(--champagne)",marginBottom:10,fontWeight:600}}>
                  Interested in the Business Opportunity?
                </p>
                <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                  Contact your wellness associate or sign up through their enrollment page to learn more about starting your wellness journey and building your own business.
                </p>
                <button
                  style={{padding:"12px 24px",borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:15}}
                  onClick={() => alert('Please contact your wellness associate for enrollment information.')}
                >
                  Connect with Your Associate
                </button>
              </div>
            </div>
          </div>
        )}

        {activeLibrary === 'wellness' && (
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)",marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <Heart className="w-7 h-7" style={{color:'var(--rosegold)'}} />
                <div>
                  <h2 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:2}}>
                    Wellness Education Resources
                  </h2>
                  <p style={{fontSize:14,color:"var(--rosegold)"}}>
                    Educational videos, recipes, DIYs, and wellness tips
                  </p>
                </div>
              </div>

              <div style={{display:"grid",gap:16}}>
                {/* Video Resources */}
                <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{padding:10,borderRadius:10,background:"rgba(218,165,112,0.15)"}}>
                      <Video className="w-5 h-5" style={{color:"var(--champagne)"}} />
                    </div>
                    <div>
                      <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>Video Education Library</h3>
                      <p style={{fontSize:12,color:"var(--rosegold)"}}>Essential oil education, DIY tutorials, and wellness guidance</p>
                    </div>
                  </div>
                  <p style={{fontSize:13,color:"var(--rosegold)",padding:10,background:"rgba(245,222,179,0.02)",borderRadius:6,marginTop:10,lineHeight:1.6}}>
                    Contact your wellness associate for access to curated video education resources and training materials.
                  </p>
                </div>

                {/* Recipe & DIY Resources */}
                <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{padding:10,borderRadius:10,background:"rgba(218,165,112,0.15)"}}>
                      <BookOpen className="w-5 h-5" style={{color:"var(--champagne)"}} />
                    </div>
                    <div>
                      <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>Recipes & DIY Projects</h3>
                      <p style={{fontSize:12,color:"var(--rosegold)"}}>Natural wellness recipes, lifestyle tips, and DIY formulations</p>
                    </div>
                  </div>
                  <p style={{fontSize:13,color:"var(--rosegold)",padding:10,background:"rgba(245,222,179,0.02)",borderRadius:6,marginTop:10,lineHeight:1.6}}>
                    Your wellness associate can provide recipe guides, DIY protocols, and lifestyle resources tailored to your wellness goals.
                  </p>
                </div>

                {/* Educational Articles */}
                <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{padding:10,borderRadius:10,background:"rgba(218,165,112,0.15)"}}>
                      <FileText className="w-5 h-5" style={{color:"var(--champagne)"}} />
                    </div>
                    <div>
                      <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>Wellness Articles & Stories</h3>
                      <p style={{fontSize:12,color:"var(--rosegold)"}}>In-depth wellness education, success stories, and holistic living guidance</p>
                    </div>
                  </div>
                  <p style={{fontSize:13,color:"var(--rosegold)",padding:10,background:"rgba(245,222,179,0.02)",borderRadius:6,marginTop:10,lineHeight:1.6}}>
                    Ask your wellness associate for recommended reading materials and wellness education articles.
                  </p>
                </div>
              </div>

              <div style={{marginTop:24,padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",textAlign:"center"}}>
                <p style={{fontSize:13,color:"var(--champagne)",marginBottom:8,fontWeight:600}}>
                  Want Access to More Resources?
                </p>
                <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6}}>
                  Connect with your wellness associate for personalized education materials, product guides, and wellness protocols.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}