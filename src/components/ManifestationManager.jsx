import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Target, Calendar, TrendingUp, CheckCircle, Clock, Edit2, Trash2 } from "lucide-react";

export default function ManifestationManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_date: "",
    progress: 0,
    category: "business",
    status: "active",
    notes: ""
  });

  const queryClient = useQueryClient();

  const { data: manifestations = [], isLoading } = useQuery({
    queryKey: ['manifestations'],
    queryFn: () => base44.entities.Manifestation.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Manifestation.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['manifestations']);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Manifestation.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['manifestations']);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Manifestation.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['manifestations']);
    }
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      target_date: "",
      progress: 0,
      category: "business",
      status: "active",
      notes: ""
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (manifestation) => {
    setFormData(manifestation);
    setEditingId(manifestation.id);
    setIsAdding(true);
  };

  const activeGoals = manifestations.filter(m => m.status === 'active');
  const completedGoals = manifestations.filter(m => m.status === 'completed');

  return (
    <div style={{display:"grid",gap:24}}>
      <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:6,fontWeight:700}}>Your Goals & Manifestations</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6}}>
              Create unlimited goals. Track progress. Manifest success.
            </p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              style={{padding:"10px 16px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",gap:8}}
            >
              <Plus className="w-4 h-4" />
              New Goal
            </button>
          )}
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} style={{marginBottom:24,padding:20,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Goal / Affirmation</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Reach Silver rank by June, Generate $5k monthly income"
                style={{width:"100%",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontSize:14}}
              />
            </div>

            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description and action steps..."
                style={{width:"100%",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontSize:14,minHeight:80,resize:"vertical"}}
              />
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:16}}>
              <div>
                <label style={{display:"block",fontSize:13,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{width:"100%",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontSize:14}}
                >
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                  <option value="financial">Financial</option>
                  <option value="health">Health</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:13,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Target Date</label>
                <input 
                  type="date"
                  required
                  value={formData.target_date}
                  onChange={(e) => setFormData({...formData, target_date: e.target.value})}
                  style={{width:"100%",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontSize:14}}
                />
              </div>
              <div>
                <label style={{display:"block",fontSize:13,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Progress (%)</label>
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                  style={{width:"100%",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontSize:14}}
                />
              </div>
            </div>

            <div style={{display:"flex",gap:12}}>
              <button type="submit" style={{flex:1,padding:14,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:15}}>
                {editingId ? 'Update Goal' : 'Add to Manifestation Box'}
              </button>
              <button type="button" onClick={resetForm} style={{padding:14,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",cursor:"pointer"}}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div>
          <h4 style={{fontSize:16,color:"var(--champagne)",marginBottom:16,fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
            <Target className="w-5 h-5" style={{color:"var(--rosegold)"}} />
            Active Goals ({activeGoals.length})
          </h4>
          <div style={{display:"grid",gap:16}}>
            {activeGoals.map(goal => (
              <div key={goal.id} style={{padding:20,borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                      <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,margin:0}}>{goal.title}</h5>
                      <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:600}}>{goal.category}</span>
                    </div>
                    {goal.description && <p style={{fontSize:13,color:"var(--rosegold)",margin:0,lineHeight:1.6}}>{goal.description}</p>}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={() => handleEdit(goal)} style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.08)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",cursor:"pointer"}}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteMutation.mutate(goal.id)} style={{padding:8,borderRadius:8,background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.2)",color:"#ff6b6b",cursor:"pointer"}}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div style={{marginTop:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:12,color:"var(--rosegold)"}}>Progress</span>
                    <span style={{fontSize:12,color:"var(--champagne)",fontWeight:600}}>{goal.progress}%</span>
                  </div>
                  <div style={{width:"100%",height:6,background:"rgba(245,222,179,0.1)",borderRadius:999,overflow:"hidden"}}>
                    <div style={{width:`${goal.progress}%`,height:"100%",background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",borderRadius:999,transition:"width 0.3s ease"}} />
                  </div>
                </div>

                <div style={{display:"flex",alignItems:"center",gap:12,marginTop:12,fontSize:12,color:"var(--rosegold)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <Calendar className="w-3 h-3" />
                    Target: {new Date(goal.target_date).toLocaleDateString()}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <Clock className="w-3 h-3" />
                    {Math.ceil((new Date(goal.target_date) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h4 style={{fontSize:16,color:"var(--champagne)",marginBottom:16,fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
            <CheckCircle className="w-5 h-5" style={{color:"#4ade80"}} />
            Completed Goals ({completedGoals.length})
          </h4>
          <div style={{display:"grid",gap:12}}>
            {completedGoals.map(goal => (
              <div key={goal.id} style={{padding:16,borderRadius:10,background:"rgba(74,222,128,0.05)",border:"1px solid rgba(74,222,128,0.15)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <CheckCircle className="w-4 h-4" style={{color:"#4ade80"}} />
                  <span style={{fontSize:14,color:"var(--champagne)",fontWeight:600}}>{goal.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {manifestations.length === 0 && !isAdding && (
        <div style={{padding:60,textAlign:"center"}}>
          <Target className="w-12 h-12" style={{color:"var(--rosegold)",opacity:0.3,margin:"0 auto 16px"}} />
          <p style={{fontSize:15,color:"var(--rosegold)"}}>
            No manifestations yet. Create your first goal above.
          </p>
        </div>
      )}
    </div>
  );
}